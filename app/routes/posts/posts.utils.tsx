import { APIErrorCode, Client, isNotionClientError } from "@notionhq/client";
import NotionPageToHtml from "notion-page-to-html";

export const formatTitleForURL = (title: string) => {
  return title.toLowerCase().replace(/ /g, "-");
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
        throw Error("Directory not found, check ID");
      }
      if (error.code === APIErrorCode.Unauthorized) {
        throw Error("Not Authorised to view");
      }
    }
  }

  return response?.results;
}

export async function getPageData(client: Client, pageId: string) {
  let response;

  try {
    response = await client.pages.retrieve({
      page_id: pageId,
    });
  } catch (error: unknown) {
    if (isNotionClientError(error)) {
      if (error.code === APIErrorCode.ObjectNotFound) {
        throw Error("Page not found, check ID");
      }
      if (error.code === APIErrorCode.Unauthorized) {
        throw Error("Not Authorised to view");
      }
    }
  }

  return response;
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
