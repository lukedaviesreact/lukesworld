import { Link, useLoaderData, useNavigation } from '@remix-run/react';
import type {
    LinksFunction,
    LoaderFunction,
    MetaFunction,
} from '@remix-run/node';
import { json } from '@remix-run/node';
import { Client } from '@notionhq/client';

import { formatTitleForURL, hasExpired } from './posts.utils';
import { getPostBlocks } from '~/utils/posts';
import {
    createPost,
    getLatestPost,
    getPostListings,
} from '~/models/post.server';
import { VStack, StackDivider, Box } from '@chakra-ui/react';

type LoaderData = {
    postList?: { id: string; title: string | undefined }[] | undefined;
};

export const loader: LoaderFunction = async () => {
    const NOTION_CLIENT = new Client({ auth: process.env.NOTION_KEY });
    let responseArr = [];
    const dbPosts = await getPostListings();
    const latestPost = await getLatestPost();

    if (latestPost && !hasExpired(latestPost.expiresAt)) {
        const postList = dbPosts.map((post) => ({
            title: post.title,
            id: post.id,
        }));
        return json<LoaderData>({
            postList,
        });
    } else {
        const { postList } = await getPostBlocks({
            client: NOTION_CLIENT,
            id: ENV.NOTION_POSTLIST_ID,
        });

        if (!postList) {
            return json<LoaderData>({});
        }

        const createPostRequests = postList.map((post) => {
            if (!post.title) {
                return;
            }
            return createPost({
                id: post.id,
                title: post.title,
                slug: formatTitleForURL(post.title),
                expiresAt: new Date(new Date().getTime() + 10 * 60000),
            });
        });

        for await (const request of createPostRequests) {
            responseArr.push(request);
        }

        return json<LoaderData>({
            postList,
        });
    }
};
export const meta: MetaFunction = () => ({
    charset: 'utf-8',
    title: 'Posts | Luke Davies Dev',
    viewport: 'width=device-width,initial-scale=1',
});

export default function PostsRoute() {
    const { postList } = useLoaderData() as LoaderData;
    const navigation = useNavigation();
    const isLoading = Boolean(navigation.state === 'loading');

    return (
        <main>
            <Box pt={2}>
                {!postList && <p>no posts found.</p>}

                <VStack
                    divider={<StackDivider borderColor="gray.200" />}
                    spacing={2}
                    align="stretch"
                >
                    {postList?.map((post) => {
                        if (!post.title || !post.id) {
                            return <li>Invalid Post</li>;
                        }
                        return (
                            <Box key={post.id}>
                                <Link
                                    to={`/posts/${formatTitleForURL(
                                        post.title
                                    )}?id=${post.id}`}
                                    prefetch="intent"
                                >
                                    {post.title}
                                </Link>
                            </Box>
                        );
                    })}
                </VStack>
            </Box>
        </main>
    );
}
