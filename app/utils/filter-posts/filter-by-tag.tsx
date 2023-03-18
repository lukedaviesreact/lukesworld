import type { Post } from '@prisma/client';
import type { SearchData } from '~/components/search-bar/search-bar';

interface Tag {
    name: string;
    color: string;
}

export const filterByTag = ({
    searchResTagArr,
    postList,
}: {
    searchResTagArr: SearchData[];
    postList: Post[];
}) => {
    const searchResTags = searchResTagArr.map((tag) => tag.name);

    const postTagArr = postList.map((post) => {
        const postTags = JSON.parse(post.tags).map(
            (tagObj: Tag) => tagObj.name
        );
        return {
            [post.slug]: postTags,
        };
    });

    const searchResTagsSet = new Set(searchResTags);

    const filteredPostTagArr = postTagArr.filter((post) => {
        const postTagSet = new Set(Object.values(post)[0]);
        const common = [...searchResTagsSet].filter((x) => postTagSet.has(x));
        return common.length;
    });

    const filteredPostTagTitlesArr = filteredPostTagArr.map(
        (post) => Object.keys(post)[0]
    );

    return postList.filter((post) => {
        return filteredPostTagTitlesArr.indexOf(post.slug) !== -1;
    });
};
