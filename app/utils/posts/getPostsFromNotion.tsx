import { APIErrorCode, Client, isNotionClientError } from '@notionhq/client';
import { formatTitleForURL } from './';

export const getPostsFromNotion = async ({
    client,
    dbId,
}: {
    client: Client;
    dbId: string;
}) => {
    let result = [];

    try {
        const notionDb = await client.databases.query({
            database_id: dbId,
        });

        if (!notionDb) return null;
        console.log('notion data', notionDb.results[0]);
        const data = notionDb.results.map((entry) => {
            const id = entry.id;
            const createdAt = entry.properties.Created.created_time;
            const title = entry.properties.Name.title[0].plain_text;
            const authorId = entry.created_by.id;
            const url = entry.url;

            let cover: string = '';
            if (entry.cover && entry.cover.type === 'external') {
                cover = entry.cover.external.url;
            }

            let icon: string = '';
            if (entry.icon && entry.icon.type === 'emoji') {
                icon = entry.icon.emoji;
            }
            let tags: [] = [];

            if (entry.properties.Tags.type === 'multi_select') {
                tags = JSON.stringify(entry.properties.Tags.multi_select);
            }

            return {
                id,
                title,
                authorId,
                createdAt,
                tags,
                icon,
                cover,
                url,
                html: '',
                slug: formatTitleForURL(title),
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

    return result;
};
