import { Client } from "@notionhq/client";
import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useCatch, useLoaderData, useParams } from "@remix-run/react";
import invariant from "tiny-invariant";
import { createPost, getPost, updatePost } from "~/models/post.server";
import { convertBlocksToHTML, getPageData } from "./posts.utils";

type LoaderData = any;

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");

  const NOTION_CLIENT = new Client({ auth: process.env.NOTION_KEY });
  invariant(id, "id is required");

  const dbPost = await getPost(id);

  if (dbPost?.html) {
    return json<LoaderData>({
      post: dbPost,
    });
  } else {
    const postPageData = await getPageData(NOTION_CLIENT, id);

    if (!postPageData) {
      throw new Response("Not Found", { status: 404 });
    }

    const postPageContent = await convertBlocksToHTML({
      url: postPageData.url,
    });

    const post = {
      url: `${postPageData.url}`,
      html: postPageContent.html,
    };

    await updatePost(id, post);

    return json<LoaderData>({ post });
  }
};

export const meta: MetaFunction = ({ data }) => {
  console.log("data from meta", data);
  return {
    title: `${data.post.title}`,
  };
};

export default function PostRoute() {
  const { post } = useLoaderData() as LoaderData;

  return (
    <main>
      <h1>
        {post.icon} {post.title}
      </h1>
      <div className="" dangerouslySetInnerHTML={{ __html: post.html }} />
    </main>
  );
}

export function CatchBoundary() {
  const caught = useCatch();
  const params = useParams();
  if (caught.status === 404) {
    return (
      <div>Uh oh! The post with the slug "{params.slug}" does not exist!</div>
    );
  }
  throw new Error(`Unsupported thrown response status code: ${caught.status}`);
}
