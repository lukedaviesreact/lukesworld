import type { Post } from '@prisma/client';
import type { LoaderFunction } from '@remix-run/node';
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

export default function PostRoute() {
    const {
        post,
    }: {
        post: Post;
    } = useLoaderData() as LoaderData;

    return (
        <main>
            <PostWrap post={post} />
        </main>
    );
}
