import { Link, useLoaderData } from "@remix-run/react";
import { json, LoaderFunction } from "@remix-run/node";
import { getPostListings } from "~/models/post.server";
import { useOptionalUser } from "~/utils";

type LoaderData = {
  posts: Awaited<ReturnType<typeof getPostListings>>;
};

export const loader: LoaderFunction = async () => {
  const posts = await getPostListings();

  return json<LoaderData>({ posts });
};

export default function PostsRoute() {
  const { posts } = useLoaderData() as unknown as LoaderData;
  const user = useOptionalUser();

  console.log({ user });
  return (
    <main>
      <h1 className="mb-16">Posts</h1>
      <Link to="/posts/admin" className="text-red-600 underline">
        Admin
      </Link>
      <ul>
        {posts.map((post) => (
          <li key={post.slug} className="mb-8">
            <Link
              to={post.slug}
              className="text-blue-600 underline"
              prefetch="intent"
            >
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
