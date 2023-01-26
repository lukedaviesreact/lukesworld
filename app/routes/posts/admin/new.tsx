import {
  ActionFunction,
  json,
  LoaderFunction,
  redirect,
} from "@remix-run/node";
import { Form, useActionData, useTransition } from "@remix-run/react";
import invariant from "tiny-invariant";

import { createPost } from "~/models/post.server";
import { requireAdminUser } from "~/session.server";

export const loader: LoaderFunction = async ({ request }) => {
  await requireAdminUser(request);
  return json({});
};

type ActionData =
  | {
      title: null | string;
      slug: null | string;
      markdown: null | string;
    }
  | undefined;

export const action: ActionFunction = async ({ request }) => {
  await requireAdminUser(request);
  const data = await request.formData();
  const title = data.get("title");
  const slug = data.get("slug");
  const markdown = data.get("markdown");

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

  await createPost({ title, slug, markdown });

  return redirect("/posts/admin");
};

export default function NewPostRoute() {
  const transition = useTransition();
  const isCreating = Boolean(transition.submission);
  const inputClassName = "w-full rounded border border-gray-500 px-2 py-2";
  const errors = useActionData() as ActionData;

  return (
    <Form method="post">
      <p>
        <label htmlFor="title">
          Post Title:
          {errors?.title ? (
            <em className="text-red-600">{errors.title}</em>
          ) : null}
        </label>
        <input type="text" name="title" id="" className={inputClassName} />
      </p>
      <p>
        <label htmlFor="slug">
          Post Slug:
          {errors?.slug ? (
            <em className="text-red-600">{errors.slug}</em>
          ) : null}
        </label>
        <input type="text" name="slug" id="" className={inputClassName} />
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
        ></textarea>
      </p>
      <p className="text-right">
        <button
          type="submit"
          disabled={isCreating}
          className="bg-blue-500 py-2 px-4 text-white"
        >
          {isCreating ? "submitting" : "submit"}
        </button>
      </p>
    </Form>
  );
}
