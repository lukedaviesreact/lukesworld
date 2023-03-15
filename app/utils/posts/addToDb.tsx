import type { Client } from '@notionhq/client';
import { createPost } from '~/models/post.server';
import { getPostsFromNotion } from './getPostsFromNotion';

export const addToDb = async ({
    client,
    dbId,
}: {
    client: Client;
    dbId: string;
}) => {
    const responseArr = [];
    const notionData = await getPostsFromNotion({ client, dbId });
    const EXPIRE_MINS = 60 * 60;
    if (!notionData)
        return {
            status: 'failed',
            msg: 'posts not added',
            data: [],
        };

    const createPostPromises = notionData.map((entry) =>
        createPost({
            ...entry,
            expiresAt: new Date(
                new Date().getTime() + EXPIRE_MINS * 60000
            ).toISOString(),
        })
    );
    try {
        for await (const post of createPostPromises) {
            responseArr.push(post);
        }
    } catch (error) {
        throw new Error(`couldnt add posts to db. Error: ${error}`);
    }
    if (responseArr.length >= 1) {
        return {
            status: 'success',
            msg: 'posts added.',
            data: responseArr,
        };
    }

    return {
        status: 'failed',
        msg: 'posts not added',
        data: [],
    };
};
