export function getEnv() {
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
