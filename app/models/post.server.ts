import { Post } from "@prisma/client";
import { prisma } from "~/db.server";

export type { Post };

export async function getPostListings() {
  return prisma.post.findMany({
    select: {
      slug: true,
      title: true,
    },
  });
}

export async function getPosts() {
  return prisma.post.findMany();
}

export async function getPost(slug: string) {
  return prisma.post.findUnique({
    where: { slug },
  });
}

export async function getClosestPost(slug: string) {
  const searchQueryLength =
    slug.length > 15 ? slug.length / 3 : slug.length / 2;

  const beginsWith = prisma.post.findMany({
    where: {
      slug: {
        startsWith: slug.slice(0, searchQueryLength),
      },
    },
  });

  const contains = prisma.post.findMany({
    where: {
      slug: {
        contains: slug.slice(0, searchQueryLength),
      },
    },
  });

  const endsWith = prisma.post.findMany({
    where: {
      slug: {
        contains: slug.slice(searchQueryLength, slug.length),
      },
    },
  });

  return [beginsWith, contains, endsWith];
}

export async function createPost(
  post: Pick<Post, "slug" | "title" | "markdown">
) {
  return prisma.post.create({ data: post });
}

export async function updatePost(
  slug: string,
  post: Pick<Post, "slug" | "title" | "markdown">
) {
  return prisma.post.update({ data: post, where: { slug } });
}

export async function deletePost(slug: string) {
  return prisma.post.delete({ where: { slug } });
}
