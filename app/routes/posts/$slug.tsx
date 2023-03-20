import { Box } from '@chakra-ui/react';
import type { Post } from '@prisma/client';
import type { LoaderFunction, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { PostWrap } from '~/components/post-wrap/post-wrap';
import { getDbPost } from '~/utils/posts';

type LoaderData = any;

export const loader: LoaderFunction = async ({ request }) => {
    const url = new URL(request.url);
    const slug = url.pathname.split('/posts/')[1];
    const post = await getDbPost({ slug });

    return json({ ...post });
};

export const meta: MetaFunction = ({ data }) => ({
    charset: 'utf-8',
    title: data.post.seoTitle || data.post.title,
    description: data.post.description || 'tech blog post by lukedavies.dev',
    viewport: 'width=device-width,initial-scale=1',
});

export default function PostRoute() {
    const {
        post,
    }: {
        post: Post;
    } = useLoaderData() as LoaderData;

    return (
        <Box>
            <PostWrap post={post} />
        </Box>
    );
}
