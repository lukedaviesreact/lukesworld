import { useLoaderData } from "@remix-run/react";
import { json, LoaderFunction } from "@remix-run/node";
import { getPost } from "~/models/post.server";

import invariant from "tiny-invariant";
import { marked } from "marked";

type LoaderData = {
  title: string;
  html: string;
};

export const loader: LoaderFunction = async ({ params }) => {
  const { slug } = params;
  invariant(slug, "slug is required");

  const post = await getPost(slug);
  invariant(post, `post not found for: ${slug}`);

  const html =
    post &&
    marked(
      post.markdown.replace(/^[\u200B\u200C\u200D\u200E\u200F\uFEFF]/, "")
    );
  return json<LoaderData>({ title: post.title, html });
};

export default function PostRoute() {
  const { title, html } = useLoaderData<typeof loader>();

  return (
    <main className="mx-auto max-w-4xl">
      <h1 className="my-6 border-b-2 text-center text-3xl">{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </main>
  );
}
