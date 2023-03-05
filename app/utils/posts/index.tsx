import { Client } from '@notionhq/client';
import { getBlockData } from '../../routes/posts/posts.utils';

interface PostBlocks {
    client: Client;
    id: string;
}

export interface Post {
    id: string;
    child_page?: { title: string };
}

export const getPostBlocks = async ({ client, id }: PostBlocks) => {
    let posts;
    let postList;

    try {
        posts = await getBlockData(client, id);
    } catch (error) {
        throw Error('couldnt get post blocks');
    }
    if (posts) {
        postList = posts.map((post: Post) => ({
            id: post.id,
            title: post?.child_page?.title,
        }));
    }

    return { postList };
};
