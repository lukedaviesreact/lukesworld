import { Box, Grid, GridItem, Heading, VStack } from '@chakra-ui/react';
import { Client } from '@notionhq/client';
import type { Post } from '@prisma/client';
import type { LoaderFunction, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Outlet, useLoaderData } from '@remix-run/react';
import type { SearchDataProps } from '~/components/search-bar/search-bar';
import { SearchBar } from '~/components/search-bar/search-bar';
import { getDbData } from '~/utils/posts';
import { useNavigation } from '@remix-run/react';
import { useState } from 'react';
import { PostCard } from '~/components/post-card/post-card';

type LoaderData = {
    postList?: Post[];
    searchData: any;
};

export const loader: LoaderFunction = async () => {
    const NOTION_CLIENT = new Client({ auth: process.env.NOTION_KEY });

    const data = await getDbData({
        client: NOTION_CLIENT,
        dbId: ENV.NOTION_DATABASE_ID,
    });

    return json<LoaderData>({
        postList: data.posts,
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
    const [searchRes, setSearchRes] = useState<SearchDataProps>();

    const navigation = useNavigation();

    return (
        <main>
            <Box pt={2}>
                <Heading as="h1" size="lg" mb="8">
                    Dev Posts 💻🗒
                </Heading>

                <Grid templateColumns="30% 70%" gap={6}>
                    <GridItem pt={2}>
                        {postList && (
                            <SearchBar
                                searchData={searchData}
                                setSearchRes={setSearchRes}
                            />
                        )}
                        {/* {navigation.state === 'loading' && (
                            <PostListSkeleton tagCount={5} />
                        )} */}

                        <VStack
                            align="start"
                            overflowY="scroll"
                            maxH="calc(100vh - 200px)"
                        >
                            {postList?.map((post) => {
                                if (!post.title || !post.id) {
                                    return <li>Invalid Post</li>;
                                }
                                return <PostCard key={post.id} post={post} />;
                            })}
                        </VStack>
                    </GridItem>
                    <GridItem>
                        <Box>
                            {navigation.state === 'idle' ? (
                                <Outlet />
                            ) : (
                                <div>
                                    <p>
                                        oop looks like your the first person to
                                        click that this week, im going to have
                                        to actually hit the Notion API
                                    </p>
                                    <p>in the meantime, check this out</p>
                                </div>
                            )}
                        </Box>
                    </GridItem>
                </Grid>
            </Box>
        </main>
    );
}
