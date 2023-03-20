import { Box, Grid, GridItem } from '@chakra-ui/react';
import { Client } from '@notionhq/client';
import type { Post } from '@prisma/client';
import type { LoaderFunction, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Outlet, useLoaderData } from '@remix-run/react';
import { getDbData } from '~/utils/posts';
import { PostList } from '~/components/post-list/post-list';
import type { SearchDataProps } from '~/components/search-bar/search-bar.d';
import { notion } from '~/db.server';

type LoaderData = {
    postList?: Post[];
    searchData: SearchDataProps;
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

export const meta: MetaFunction = () => ({
    charset: 'utf-8',
    title: 'Dev Posts | Luke Davies Dev',
    viewport: 'width=device-width,initial-scale=1',
});

export default function PostsRoute() {
    const { postList, searchData } = useLoaderData() as LoaderData;

    return (
        <main>
            <Box pt={2}>
                <Grid
                    templateColumns={['0% 100%', '0% 100%', '30% 70%']}
                    gap={[0, 0, 6]}
                >
                    <GridItem pt={2}>
                        <Box display={['none', 'none', 'block']}>
                            {postList && (
                                <PostList
                                    postList={postList}
                                    searchData={searchData}
                                />
                            )}
                        </Box>
                    </GridItem>
                    <GridItem>
                        <Box>
                            <Outlet />
                        </Box>
                    </GridItem>
                </Grid>
            </Box>
        </main>
    );
}
