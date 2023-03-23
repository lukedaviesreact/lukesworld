import { Box, Grid, GridItem } from '@chakra-ui/react';
import type {
    LinksFunction,
    LoaderFunction,
    MetaFunction,
} from '@remix-run/node';
import { json } from '@remix-run/node';
import { Outlet, useLoaderData } from '@remix-run/react';
import { getDbData } from '~/utils/posts';
import { PostList } from '~/components/post-list/post-list';
import { notion } from '~/db.server';
import loadingSpinnerCss from '../components/loading-spinner/loading-spinner.css';
import { LoaderData } from '.';

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

export default function PostsRoute() {
    const { postList } = useLoaderData() as LoaderData;

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
                        <Box>
                            <Outlet />
                        </Box>
                    </GridItem>
                </Grid>
            </Box>
        </main>
    );
}
