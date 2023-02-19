import { Client } from "@notionhq/client";
import invariant from "tiny-invariant";

export function getEnv() {
  invariant(process.env.ADMIN_EMAIL, "ADMIN_EMAIL should be defined");
  invariant(process.env.NOTION_KEY, "NOTION_KEY should be defined");
  invariant(process.env.NOTION_PUBLIC_ID, "NOTION_PUBLIC_ID should be defined");

  const NOTION_CLIENT = new Client({ auth: process.env.NOTION_KEY });

  return {
    ADMIN_EMAIL: process.env.ADMIN_EMAIL,
    NOTION_KEY: process.env.NOTION_KEY,
    NOTION_PUBLIC_ID: process.env.NOTION_PUBLIC_ID,
    NOTION_CLIENT: NOTION_CLIENT,
  };
}

type ENV = ReturnType<typeof getEnv>;

declare global {
  var ENV: ENV;
  interface Window {
    ENV: ENV;
  }
}
