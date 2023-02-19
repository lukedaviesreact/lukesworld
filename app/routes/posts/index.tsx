import { Link, useLoaderData } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useOptionalAdminUser } from "~/utils";
import { Client } from "@notionhq/client";
import { PostProps, useLukesWorldBlocks } from "./hooks";
import { formatTitleForURL } from "./posts.utils";

type LoaderData = {
  postList: { id: string; title: string | undefined }[] | undefined;
};

export const loader: LoaderFunction = async () => {
  const { postList } = await useLukesWorldBlocks({
    client: ENV.NOTION_CLIENT,
    id: ENV.NOTION_PUBLIC_ID,
  });

  return json<LoaderData>({
    postList,
  });
};

export default function PostsRoute() {
  const { postList } = useLoaderData() as LoaderData;
  const adminUser = useOptionalAdminUser();
  console.log("post list", postList);

  return (
    <main>
      <h1>Posts</h1>
      {adminUser ? (
        <Link to="admin" className="text-red-600 underline">
          Admin
        </Link>
      ) : null}
      {!postList && <p>no posts found.</p>}
      <ul>
        {postList?.map((post) => {
          if (!post.title || !post.id) {
            return <li>Invalid Post</li>;
          }
          return (
            <li key={post.id}>
              <Link
                to={`/posts/${formatTitleForURL(post.title)}?id=${post.id}`}
                prefetch="intent"
                className="text-blue-600 underline"
              >
                {post.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
