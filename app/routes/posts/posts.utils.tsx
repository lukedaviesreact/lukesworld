import {
    APIErrorCode,
    Client,
    isFullPage,
    isNotionClientError,
} from '@notionhq/client';
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { Post } from '@prisma/client';
import NotionPageToHtml from 'notion-page-to-html';

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

export async function getBlockData(client: Client, publicId: string) {
    let response;

    try {
        response = await client.blocks.children.list({
            block_id: publicId,
        });
    } catch (error: unknown) {
        if (isNotionClientError(error)) {
            if (error.code === APIErrorCode.ObjectNotFound) {
                throw Error('Directory not found, check ID');
            }
            if (error.code === APIErrorCode.Unauthorized) {
                throw Error('Not Authorised to view');
            }
        }
    }

    return response?.results;
}

export async function getPageData(client: Client, pageId: string) {
    const page = await client.pages.retrieve({
        page_id: pageId,
    });

    if (!isFullPage(page)) {
        throw new Error(`Page not found id:${pageId}`);
    }
    // The page variable has been narrowed from PageObjectResponse | PartialPageObjectResponse to PageObjectResponse.
    console.log('Created at:', page.created_time);

    return page;
}

export const convertBlocksToHTML = async ({ url }: { url: string }) => {
    return await NotionPageToHtml.convert(url, {
        excludeCSS: true,
        excludeMetadata: true,
        excludeScripts: true,
        excludeHeaderFromBody: true,
        bodyContentOnly: true,
    });
};
