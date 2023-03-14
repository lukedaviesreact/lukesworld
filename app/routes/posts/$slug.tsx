import { Box, Heading, Text } from '@chakra-ui/react';
import { Post } from '@prisma/client';
import { json, LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { PostWrap } from '~/components/post-wrap/post-wrap';
import { Taglist } from '~/components/taglist/Taglist';
import { getDbPost } from '~/utils/posts';

type LoaderData = any;

export const loader: LoaderFunction = async ({ request }) => {
    const url = new URL(request.url);
    const slug = url.pathname.split('/posts/')[1];
    const post = await getDbPost({ slug });

    return json({ ...post });
};

export default function PostRoute() {
    const {
        post,
    }: {
        post: Post;
    } = useLoaderData() as LoaderData;

    return (
        <main>
            <PostWrap post={post} />
        </main>
    );
}
