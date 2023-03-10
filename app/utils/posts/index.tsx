import { Client, isFullPage } from '@notionhq/client';
import NotionPageToHtml from 'notion-page-to-html';

export interface Post {
    id: string;
    child_page?: { title: string };
}

import {
    createPost,
    getLatestPost,
    getPost,
    getPosts,
} from '~/models/post.server';
import { addToDb } from './addToDb';

export const getDbData = async ({
    client,
    dbId,
}: {
    client: Client;
    dbId: string;
}) => {
    const checkDb = async () => {
        const latestPost = await getLatestPost();

        if (!latestPost) return false;

        return true;
    };

    const existsInDb = await checkDb();
    if (existsInDb) {
        const posts = await getPosts();

        return { posts };
    }

    const { data } = await addToDb({
        client,
        dbId,
    });
    if (data) {
        return { posts: data };
    }
    return { posts: [] };
};

export const getDbPost = async ({ slug }: { slug: string }) => {
    try {
        const post = await getPost(slug);
        if (!post) throw Error;

        if (post.html !== '' || post.html === null) {
            return { post: post };
        } else {
            const content = await NotionPageToHtml.convert(post.url, {
                excludeCSS: true,
                excludeMetadata: true,
                excludeScripts: true,
                excludeHeaderFromBody: true,
                bodyContentOnly: true,
            });

            const updatedPost = await createPost({
                ...post,
                html: content.html,
            });
            return { post: updatedPost };
        }
    } catch (error) {
        throw new Error(`No post with that slug: ${slug} ${error}`);
    }
};

export const formatTitleForURL = (title: string) => {
    return title.toLowerCase().replace(/ /g, '-');
};

export const hasExpired = (date: Date) => {
    const postDate = date.getTime();
    const now = new Date().getTime();

    if (now > postDate) {
        return true;
    }

    return false;
};
