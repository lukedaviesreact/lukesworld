import { Client } from '@notionhq/client';
import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;
let notion: Client;

declare global {
    var __db__: PrismaClient;
    var __notion__: Client;
}

// this is needed because in development we don't want to restart
// the server with every change, but we want to make sure we don't
// create a new connection to the DB with every change either.
// in production we'll have a single connection to the DB.
if (process.env.NODE_ENV === 'production') {
    prisma = new PrismaClient();
    notion = new Client({ auth: process.env.NOTION_KEY });
} else {
    if (!global.__db__) {
        global.__db__ = new PrismaClient();
        global.__notion__ = new Client({ auth: process.env.NOTION_KEY });
    }
    prisma = global.__db__;
    notion = global.__notion__;
    prisma.$connect();
}

export { prisma, notion };
