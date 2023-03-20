import type { Client } from '@notionhq/client';
import {
    APIErrorCode,
    isFullPage,
    isNotionClientError,
} from '@notionhq/client';
import { formatTitleForURL } from './';

export const getPostsFromNotion = async ({
    client,
    dbId,
}: {
    client: Client;
    dbId: string;
}) => {
    try {
        const notionDb = await client.databases.query({
            database_id: dbId,
        });

        if (!notionDb) return null;

        const data = notionDb.results.map((entry) => {
            if (!isFullPage(entry)) {
                return {
                    id: '',
                    title: '',
                    author: '',
                    createdAt: '',
                    tags: '',
                    icon: '',
                    cover: '',
                    url: '',
                    html: '',
                    excerpt: '',
                    slug: '',
                    seoTitle: '',
                    seoDescription: '',
                };
            }

            const id = entry.id;
            // @ts-ignore
            const createdAt = entry.properties.Created.created_time;
            // @ts-ignore
            const title = entry.properties.Name.title[0].plain_text;
            const author = 'Luke Davies';
            const url = entry.url;

            const seoDescription = // @ts-ignore
                entry.properties['SEO Description'].rich_text[0]?.plain_text
                    ? // @ts-ignore
                      entry.properties['SEO Title'].rich_text[0].plain_text
                    : '';
            // @ts-ignore
            const seoTitle = entry.properties['SEO Title'].rich_text[0]
                ?.plain_text
                ? // @ts-ignore
                  entry.properties['SEO Title'].rich_text[0].plain_text
                : '';
            // @ts-ignore
            const excerpt = entry.properties['Excerpt'].rich_text[0]?.plain_text
                ? // @ts-ignore
                  entry.properties['Excerpt'].rich_text[0].plain_text
                : '';

            let cover: string = '';
            if (entry.cover && entry.cover.type === 'external') {
                cover = entry.cover.external.url;
            }

            let icon: string = '';
            if (entry.icon && entry.icon.type === 'emoji') {
                icon = entry.icon.emoji;
            }
            let tags = '';

            if (entry.properties.Tags.type === 'multi_select') {
                tags =
                    '[' +
                    entry.properties.Tags.multi_select
                        .map((el) => JSON.stringify(el))
                        .join(',') +
                    ']';
            }

            return {
                id,
                title,
                author,
                createdAt,
                tags,
                icon,
                cover,
                url,
                html: '',
                seoTitle,
                seoDescription,
                excerpt,
                slug: formatTitleForURL(title) || '',
            };
        });
        return data;
    } catch (error: unknown) {
        if (isNotionClientError(error)) {
            if (error.code === APIErrorCode.ObjectNotFound) {
                throw Error(`Db:${dbId} not found, check ID`);
            } else {
                console.error(error);
            }
        }
    }
};
