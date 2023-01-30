import {
  ActionFunction,
  json,
  LoaderFunction,
  redirect,
} from "@remix-run/node";
import {
  Form,
  useActionData,
  useCatch,
  useLoaderData,
  useParams,
  useTransition,
} from "@remix-run/react";
import invariant from "tiny-invariant";

import {
  createPost,
  deletePost,
  getClosestPost,
  getPost,
  Post,
  updatePost,
} from "~/models/post.server";
import { requireAdminUser } from "~/session.server";

type LoaderData = {
  post?: Post;
};

export const loader: LoaderFunction = async ({ request, params }) => {
  await requireAdminUser(request);
  invariant(params.slug, "slug is required");
  if (params.slug === "new") {
    return json<LoaderData>({});
  }
  const post = await getPost(params.slug);
  if (!post) {
    throw new Response("not found", { status: 404 });
  }
  return json<LoaderData>({ post: post });
};

type ActionData =
  | {
      title: null | string;
      slug: null | string;
      markdown: null | string;
    }
  | undefined;

export const action: ActionFunction = async ({ request, params }) => {
  await requireAdminUser(request);
  const data = await request.formData();
  //

  const title = data.get("title");
  const slug = data.get("slug");
  const markdown = data.get("markdown");
  const intent = data.get("intent");

  const errors: ActionData = {
    title: title ? null : "Title is required",
    slug: slug ? null : "Slug is required",
    markdown: markdown ? null : "Markdown is required",
  };

  const hasErrors = Object.values(errors).some((errorMessage) => errorMessage);

  if (hasErrors) {
    return json<ActionData>(errors);
  }

  invariant(typeof title === "string", "title must be a string");
  invariant(typeof slug === "string", "slug must be a string");
  invariant(typeof markdown === "string", "markdown must be a string");
  invariant(params.slug, "slug is required");

  if (params.slug === "new") {
    await createPost({ title, slug, markdown });
  }
  switch (intent) {
    case "update":
      await updatePost(params.slug, { title, slug, markdown });
      break;
    case "delete":
      await deletePost(params.slug);
      break;
  }

  return redirect("/posts/admin");
};

export default function NewPostRoute() {
  const data = useLoaderData() as LoaderData;
  const transition = useTransition();
  const isCreating = transition.submission?.formData.get("intent") === "create";
  const isUpdating = transition.submission?.formData.get("intent") === "update";
  const isDeleting = transition.submission?.formData.get("intent") === "delete";
  const inputClassName = "w-full rounded border border-gray-500 px-2 py-2";
  const errors = useActionData() as ActionData;
  const isNewPost = !data.post;

  return (
    <Form method="post" key={data.post?.slug ?? "new"}>
      <p>
        <label htmlFor="title">
          Post Title:
          {errors?.title ? (
            <em className="text-red-600">{errors.title}</em>
          ) : null}
        </label>
        <input
          type="text"
          name="title"
          id=""
          className={inputClassName}
          defaultValue={data.post?.title}
        />
      </p>
      <p>
        <label htmlFor="slug">
          Post Slug:
          {errors?.slug ? (
            <em className="text-red-600">{errors.slug}</em>
          ) : null}
        </label>
        <input
          type="text"
          name="slug"
          id=""
          className={inputClassName}
          defaultValue={data.post?.slug}
        />
      </p>
      <p>
        <label htmlFor="markdown">
          Markdown:{" "}
          {errors?.markdown ? (
            <em className="text-red-600">{errors.markdown}</em>
          ) : null}
        </label>
        <textarea
          name="markdown"
          id="markdown"
          rows={20}
          className={`${inputClassName} font-mono`}
          defaultValue={data.post?.markdown}
        ></textarea>
      </p>
      <div className="flex justify-end gap-4">
        {isNewPost ? null : (
          <button
            type="submit"
            name="intent"
            value={"delete"}
            disabled={isDeleting}
            className="bg-red-500 py-2 px-4 text-white"
          >
            {isDeleting ? "deleting..." : "delete"}
          </button>
        )}
        <button
          type="submit"
          name="intent"
          value={isNewPost ? "create" : "update"}
          disabled={isCreating || isUpdating}
          className="bg-blue-500 py-2 px-4 text-white"
        >
          {isNewPost ? (isCreating ? "Creating..." : "Create") : null}
          {isNewPost ? null : isUpdating ? "Updating..." : "Update"}
        </button>
      </div>
    </Form>
  );
}

export function CatchBoundary() {
  const error = useCatch();
  const params = useParams();
  if (error.status === 404) {
    invariant(params.slug, "slug is required");

    return (
      <div>
        Uh Oh! The post <b>{params.slug}</b> does not exist
      </div>
    );
  }
  throw new Error(`Unsupported thrown response status code: ${error.status}`);
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <div className="text-red-500">
      Oh No! Something went wrong
      <pre>{error.message}</pre>
    </div>
  );
}
