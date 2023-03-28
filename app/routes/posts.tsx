import { Box, Grid, GridItem } from '@chakra-ui/react';
import type {
    LinksFunction,
    LoaderFunction,
    MetaFunction,
} from '@remix-run/node';
import { json } from '@remix-run/node';
import { Outlet, useLoaderData, useTransition } from '@remix-run/react';
import { getDbData } from '~/utils/posts';
import { PostList } from '~/components/post-list/post-list';
import { notion } from '~/db.server';
import loadingSpinnerCss from '../components/loading-spinner/loading-spinner.css';
import { LoaderData } from '.';
import { useMemo } from 'react';
import { PostWrap } from '~/components/post-wrap/post-wrap';

export const links: LinksFunction = () => [
    { rel: 'stylesheet', href: loadingSpinnerCss },
    { page: '/posts' },
];

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

export const meta: MetaFunction<typeof loader> = () => ({
    charset: 'utf-8',
    title: 'Posts | Luke Davies Dev',
    description: 'Tech posts',
    viewport: 'width=device-width,initial-scale=1',
});

export type TransitionLocationState = {
    post: {
        title: string;
        author: string;
        createdAt: string;
        tags: string;
    };
};

export default function PostsRoute() {
    const { postList } = useLoaderData() as LoaderData;
    const transition = useTransition();
    const transitioningToSinglePost =
        transition.location &&
        transition.location.pathname.split('/').length > 2;

    const OptimisticUI = useMemo(() => {
        const { post } =
            (transition.location?.state as TransitionLocationState) || {};

        return (
            <PostWrap
                isLoading={true}
                post={{
                    title: post ? post.title : 'string',
                    slug: 'string',
                    id: 'string',
                    author: post ? post.author : 'string',
                    tags: post ? post.tags : '[{}]',
                    url: 'string',
                    seoTitle: 'string',
                    seoDescription: 'string',
                    excerpt: 'string',
                    html: 'string',
                    icon: 'string',
                    cover: 'string',
                    createdAt: post ? post.createdAt : 'string',
                    expiresAt: 'string',
                }}
            />
        );
    }, [transition.location?.state]);

    return (
        <main>
            <Box pt={2}>
                <Grid
                    templateColumns={['0% 100%', '0% 100%', '30% 70%']}
                    gap={[0, 0, 6]}
                >
                    <GridItem pt={2}>
                        <Box
                            display={['none', 'none', 'block']}
                            position={'sticky'}
                            top={'62px'}
                        >
                            {postList && <PostList />}
                        </Box>
                    </GridItem>
                    <GridItem>
                        <Box padding="0 1rem 0 0 ">
                            {transition.state === 'loading' &&
                            transitioningToSinglePost ? (
                                OptimisticUI
                            ) : (
                                <Outlet />
                            )}
                        </Box>
                    </GridItem>
                </Grid>
            </Box>
        </main>
    );
}
