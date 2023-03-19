import { Box, Text } from '@chakra-ui/react';
import { Client } from '@notionhq/client';
import { Post } from '@prisma/client';
import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { PostList } from '~/components/post-list/post-list';
import type { SearchDataProps } from '~/components/search-bar/search-bar.d';
import { getDbData } from '~/utils/posts';

type LoaderData = {
    postList?: Post[];
    searchData: SearchDataProps;
};

export const loader: LoaderFunction = async () => {
    const NOTION_CLIENT = new Client({ auth: process.env.NOTION_KEY });

    const data = await getDbData({
        client: NOTION_CLIENT,
        dbId: process.env.NOTION_DATABASE_ID || '',
    });

    return json<LoaderData>({
        postList: data.posts,
        // @ts-ignore
        searchData: data.searchData,
    });
};

export default function PostIndexRoute() {
    const { postList, searchData } = useLoaderData() as LoaderData;
    console.log('postlist', postList);
    return (
        <main>
            <Box display={['block', 'block', 'none']}>
                {postList && (
                    <PostList postList={postList} searchData={searchData} />
                )}
            </Box>
            <Box pt={2} display={['none', 'none', 'block']}>
                <Text>TODO: desktop post landing page</Text>
            </Box>
        </main>
    );
}
