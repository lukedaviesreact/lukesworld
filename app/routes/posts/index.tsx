import { Link, useLoaderData, useNavigation } from "@remix-run/react";
import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useOptionalAdminUser } from "~/utils";
import { Client } from "@notionhq/client";

import { formatTitleForURL, hasExpired } from "./posts.utils";
import { usePostBlocks } from "~/hooks/posts/hooks";
import {
  createPost,
  getLatestPost,
  getPostListings,
  getPosts,
} from "~/models/post.server";

type LoaderData = {
  postList?: { id: string; title: string | undefined }[] | undefined;
};

export const loader: LoaderFunction = async () => {
  const NOTION_CLIENT = new Client({ auth: process.env.NOTION_KEY });
  let responseArr = [];
  const dbPosts = await getPostListings();
  const latestPost = await getLatestPost();

  if (latestPost && !hasExpired(latestPost.expiresAt)) {
    const postList = dbPosts.map((post) => ({
      title: post.title,
      id: post.id,
    }));
    return json<LoaderData>({
      postList,
    });
  } else {
    const { postList } = await usePostBlocks({
      client: NOTION_CLIENT,
      id: ENV.NOTION_POSTLIST_ID,
    });

    if (!postList) {
      return json<LoaderData>({});
    }

    const createPostRequests = postList.map((post) => {
      if (!post.title) {
        return;
      }
      return createPost({
        id: post.id,
        title: post.title,
        slug: formatTitleForURL(post.title),
        expiresAt: new Date(new Date().getTime() + 10 * 60000),
      });
    });

    for await (const request of createPostRequests) {
      responseArr.push(request);
    }

    console.log("responseArr:", responseArr);

    return json<LoaderData>({
      postList,
    });
  }
};
export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Lukes World - Posts",
  viewport: "width=device-width,initial-scale=1",
});

export default function PostsRoute() {
  const { postList } = useLoaderData() as LoaderData;
  const navigation = useNavigation();
  const isLoading = Boolean(navigation.state === "loading");

  return (
    <main>
      <h1>Posts</h1>
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
              >
                {post.title}
              </Link>
              {isLoading && <p>loading...</p>}
            </li>
          );
        })}
      </ul>
    </main>
  );
}
