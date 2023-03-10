import {
    APIErrorCode,
    Client,
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
                    slug: '',
                };
            }

            const id = entry.id;
            const createdAt = entry.properties.Created.created_time;
            const title = entry.properties.Name.title[0].plain_text;
            const author = 'Luke Davies';
            const url = entry.url;

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
