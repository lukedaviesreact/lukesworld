import type { Post } from '@prisma/client';
import type { SearchDataProps } from '~/components/search-bar/search-bar';
import { filterByTag } from './filter-by-tag';
import { filterByTitle } from './filter-by-title';

export const filterPosts = ({
    searchRes,
    postList,
}: {
    searchRes?: SearchDataProps;
    postList?: Post[];
}) => {
    if (!searchRes || !postList) return [];

    const postsFilteredBySearchTag = filterByTag({
        searchResTagArr: searchRes.tags,
        postList,
    });

    const postsFilteredBySearchTitle = filterByTitle({
        searchResTitleArr: searchRes.titles,
        postList,
    });
    const res = [...postsFilteredBySearchTag, ...postsFilteredBySearchTitle];
    const resSet = new Set(res);

    return Array.from(resSet);
};
