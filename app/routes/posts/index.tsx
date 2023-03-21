import { Box, Heading, Text } from '@chakra-ui/react';
import type { Post } from '@prisma/client';
import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { PostList } from '~/components/post-list/post-list';
import type { SearchDataProps } from '~/components/search-bar/search-bar.d';
import { notion } from '~/db.server';
import { getDbData } from '~/utils/posts';

type LoaderData = {
    postList?: Post[];
    searchData: SearchDataProps;
    totalTags: number;
    totalTitles: number;
};

export const loader: LoaderFunction = async () => {
    const data = await getDbData({
        client: notion,
        dbId: process.env.NOTION_DATABASE_ID || '',
    });

    return json<LoaderData>({
        postList: data.posts,
        // @ts-ignore
        searchData: data.searchData,
    });
};

export default function PostIndexRoute() {
    const { postList } = useLoaderData() as LoaderData;

    return (
        <main>
            <Box display={['block', 'block', 'none']}>
                {postList && <PostList />}
            </Box>
            <Box pt={2} display={['none', 'none', 'block']}>
                <Heading as="h1" size={'xl'}>
                    Dev Posts 💻
                </Heading>
                <Text color="gray.600">
                    I've written down some of the stuff I've learnt along the
                    way.
                </Text>
            </Box>
        </main>
    );
}
