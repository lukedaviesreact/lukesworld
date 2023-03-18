import invariant from 'tiny-invariant';

export function getEnv() {
    invariant(process.env.ADMIN_EMAIL, 'ADMIN_EMAIL should be defined');
    invariant(process.env.NOTION_KEY, 'NOTION_KEY should be defined');
    invariant(
        process.env.NOTION_LUKESWORLD_ID,
        'NOTION_LUKESWORLD_ID should be defined'
    );

    invariant(
        process.env.NOTION_POSTLIST_ID,
        'NOTION_POSTLIST_ID should be defined'
    );

    return {
        ADMIN_EMAIL: process.env.ADMIN_EMAIL,
        NOTION_KEY: process.env.NOTION_KEY,
        NOTION_LUKESWORLD_ID: process.env.NOTION_LUKESWORLD_ID,
        NOTION_POSTLIST_ID: process.env.NOTION_POSTLIST_ID,
        NOTION_DATABASE_ID: process.env.NOTION_DATABASE_ID,
    };
}

type ENV = ReturnType<typeof getEnv>;

declare global {
    var ENV: ENV;
    interface Window {
        ENV: ENV;
    }
}
