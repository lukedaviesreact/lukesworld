import {
    Badge,
    Box,
    Grid,
    GridItem,
    Heading,
    HStack,
    space,
    theme,
    VStack,
} from '@chakra-ui/react';
import styled from '@emotion/styled';
import { Client } from '@notionhq/client';
import { Post } from '@prisma/client';
import { json, LoaderFunction, MetaFunction } from '@remix-run/node';
import { Link, Outlet, useLoaderData } from '@remix-run/react';
import { SearchBar } from '~/components/searchBar/searchBar';
import { Taglist } from '~/components/taglist/Taglist';
import { formatTitleForURL, getDbData } from '~/utils/posts';

type LoaderData = {
    postList?: Post[];
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
    console.log('POSTLIST:', postList);

    const StyledLink = styled(Link)({
        width: '100%',
        color: theme.colors.gray[700],
        transition: 'all .05s ease',
        '&:hover': {
            color: theme.colors.gray[900],
        },
    });

    return (
        <main>
            <Box pt={2}>
                <Heading as="h1" size="lg" mb="8">
                    Dev Posts 💻🗒
                </Heading>

                <Grid templateColumns="30% 70%" gap={6}>
                    <GridItem pt={2}>
                        <SearchBar />
                        <VStack
                            align="start"
                            overflowY="scroll"
                            maxH="calc(100vh - 200px)"
                        >
                            {postList?.map((post) => {
                                if (!post.title || !post.id) {
                                    return <li>Invalid Post</li>;
                                }
                                return (
                                    <StyledLink
                                        to={`/posts/${formatTitleForURL(
                                            post.title
                                        )}`}
                                        prefetch="intent"
                                    >
                                        <Box
                                            key={post.id}
                                            shadow="md"
                                            borderBottom={`2px solid gray.200`}
                                            pt="4"
                                            pb="4"
                                            pl="2"
                                            mr="2"
                                        >
                                            {post.icon !== '' && post.icon}
                                            {post.title}

                                            <Box mt="2">
                                                <Taglist post={post} />
                                            </Box>
                                        </Box>
                                    </StyledLink>
                                );
                            })}
                        </VStack>
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
