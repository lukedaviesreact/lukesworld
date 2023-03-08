import { Box, Heading, Text } from '@chakra-ui/react';
import { json, LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { getDbPost } from '~/utils/posts';

type LoaderData = any;

export const loader: LoaderFunction = async ({ request }) => {
    const url = new URL(request.url);
    const slug = url.pathname.split('/posts/')[1];

    const post = await getDbPost({ slug });

    return json({ ...post });
};

export default function PostRoute() {
    const { post } = useLoaderData() as LoaderData;

    return (
        <main>
            <Box pt={2}>
                <Box mb={4}>
                    <Heading as="h1">{post.title}</Heading>
                    <Text fontSize="sm" pl={2}>
                        {post.author ? post.author : 'No author set'}
                    </Text>
                    <Text fontSize="sm" pl={2}>
                        Created{' '}
                        {new Date('2023-03-08T01:36:00.000Z').toDateString()}
                    </Text>
                </Box>
                <Box dangerouslySetInnerHTML={{ __html: post.html }}></Box>
            </Box>
        </main>
    );
}
