import type { Post } from "@prisma/client";
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

export async function getLatestPost() {
  return prisma.post.findFirst({
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getPost(slug: string) {
  return prisma.post.findUnique({
    where: { slug },
  });
}

export async function createPost(
  post: Pick<Post, "slug" | "title" | "id" | "expiresAt">
) {
  return prisma.post.upsert({
    where: {
      id: post.id,
    },
    update: { ...post },
    create: { ...post },
  });
}

export async function updatePost(
  slug: string,
  post: Pick<Post, "slug" | "title" | "id">
) {
  return prisma.post.update({ data: post, where: { slug } });
}

export async function deletePost(slug: string) {
  return prisma.post.delete({ where: { slug } });
}
