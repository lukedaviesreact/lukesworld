import type { Post } from '@prisma/client';

export const getPostSearchData = (data: { posts: Post[] }) => {
    return {
        titles: data.posts
            .map((post) => ({ name: post.title }))
            .filter(
                (value, index, self) =>
                    index === self.findIndex((t) => t.name === value.name)
            ),
        authors: data.posts
            .map((post) => ({
                name: post.author,
            }))
            .filter(
                (value, index, self) =>
                    index === self.findIndex((t) => t.name === value.name)
            ),
        tags: data.posts
            .map((post) => JSON.parse(post.tags))
            .flat()
            .map((item) => ({ name: item.name, color: item.color }))
            .filter(
                (value, index, self) =>
                    index === self.findIndex((t) => t.name === value.name)
            ),
    };
};
