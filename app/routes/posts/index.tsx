import { Badge, Box, Heading, HStack, VStack } from '@chakra-ui/react';
import { Client } from '@notionhq/client';
import { json, LoaderFunction, MetaFunction } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { formatTitleForURL, getDbData } from '~/utils/posts';

type LoaderData = {
    postList: any;
};
export const loader: LoaderFunction = async () => {
    const NOTION_CLIENT = new Client({ auth: process.env.NOTION_KEY });

    const data = await getDbData({
        client: NOTION_CLIENT,
        dbId: ENV.NOTION_DATABASE_ID,
    });

    return json<LoaderData>({ postList: data.posts });
};
export const meta: MetaFunction = () => ({
    charset: 'utf-8',
    title: 'Dev Posts | Luke Davies Dev',
    viewport: 'width=device-width,initial-scale=1',
});

export default function PostsRoute() {
    const { postList } = useLoaderData() as LoaderData;
    return (
        <main>
            <Box pt={2}>
                <Heading as="h1" size="lg" mb="8">
                    Dev Posts 💻🗒
                </Heading>
                <VStack align="start">
                    {postList?.map((post) => {
                        if (!post.title || !post.id) {
                            return <li>Invalid Post</li>;
                        }
                        return (
                            <Box
                                key={post.id}
                                shadow="md"
                                borderBottom={`2px solid gray.200`}
                                p="2"
                            >
                                <Link
                                    to={`/posts/${formatTitleForURL(
                                        post.title
                                    )}`}
                                    prefetch="intent"
                                >
                                    {post.title}
                                </Link>
                                <HStack>
                                    {JSON.parse(post.tags).map(
                                        (tag: {
                                            id: string;
                                            name: string;
                                            color: string;
                                        }) => (
                                            <Badge
                                                key={tag.id}
                                                colorScheme={tag.color}
                                            >
                                                {tag.name}
                                            </Badge>
                                        )
                                    )}
                                </HStack>
                            </Box>
                        );
                    })}
                </VStack>
            </Box>
        </main>
    );
}
