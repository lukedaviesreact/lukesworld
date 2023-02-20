import { Client } from "@notionhq/client";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useCatch, useLoaderData, useParams } from "@remix-run/react";
import invariant from "tiny-invariant";
import { convertBlocksToHTML, getPageData } from "./posts.utils";

type LoaderData = any;

export const headers = () => {
  return {
    "Cache-Control": "public, s-maxage=60",
  };
};

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");

  const NOTION_CLIENT = new Client({ auth: process.env.NOTION_KEY });
  invariant(id, "id is required");

  const postPageData = await getPageData(NOTION_CLIENT, id);

  if (!postPageData) {
    throw new Response("Not Found", { status: 404 });
  }

  const postPageContent = await convertBlocksToHTML({ url: postPageData.url });

  return json<LoaderData>({ postPageContent, postPageData });
};

export default function PostRoute() {
  const { postPageContent, postPageData } = useLoaderData() as LoaderData;
  console.log("postPageData", postPageData);
  return (
    <main className="mx-auto max-w-4xl">
      <h1 className="my-6 border-b-2 text-center text-3xl">
        {postPageContent.icon} {postPageContent.title}
      </h1>
      <div
        className=""
        dangerouslySetInnerHTML={{ __html: postPageContent.html }}
      />
    </main>
  );
}

export function CatchBoundary() {
  const caught = useCatch();
  const params = useParams();
  if (caught.status === 404) {
    return (
      <div className="text-red-500">
        Uh oh! The post with the slug "{params.slug}" does not exist!
      </div>
    );
  }
  throw new Error(`Unsupported thrown response status code: ${caught.status}`);
}
