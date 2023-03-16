import type { Client } from '@notionhq/client';
import { createPost } from '~/models/post.server';
import { getPostsFromNotion } from './getPostsFromNotion';

export interface NotionPost {
    slug: string;
    title: string;
    id: string;
    author: string;
    tags: string;
    url: string;
    html: string | null;
    icon: string | null;
    cover: string | null;
    createdAt: string;
    expiresAt?: string | null;
}

export type NotionData = NotionPost[];

const getNotionPosts = async ({
    client,
    dbId,
}: {
    client: Client;
    dbId: string;
}) => {
    try {
        console.log('getting posts from notion');
        const notionData = await getPostsFromNotion({ client, dbId });
        return notionData;
    } catch (err) {
        return new Error(
            `error getting posts from notion. addToDb/getPostsFromNotion(). Error: ${err}`
        );
    }
};

const addPostsToDb = async (notionData: NotionData) => {
    if (!notionData) {
        return;
    }
    const EXPIRE_MINS = 2;
    const responseArr = [];
    const createPostPromises = notionData.map((entry) =>
        createPost({
            ...entry,
            expiresAt: new Date(
                new Date().getTime() + EXPIRE_MINS * 60000
            ).toISOString(),
        })
    );

    try {
        console.log('adding to database');
        for await (const post of createPostPromises) {
            responseArr.push(post);
        }
        return responseArr;
    } catch (error) {
        throw new Error(`couldnt add posts to db. Error: ${error}`);
    }
};

export const addToDb = async ({
    client,
    dbId,
}: {
    client: Client;
    dbId: string;
}) => {
    const notionData = await getNotionPosts({ client, dbId });
    if (notionData instanceof Error) {
        return {
            status: 'failed',
            msg: 'posts not added',
            data: [],
        };
    }

    const responseFromDb = notionData && (await addPostsToDb(notionData));

    if (responseFromDb && responseFromDb.length >= 1) {
        console.log('response from db', responseFromDb);

        return {
            status: 'success',
            msg: 'posts added.',
            data: responseFromDb,
        };
    }

    return {
        status: 'failed',
        msg: 'posts not added',
        data: [],
    };
};
