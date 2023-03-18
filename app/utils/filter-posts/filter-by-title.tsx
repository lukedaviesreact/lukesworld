import type { Post } from '@prisma/client';
import type { SearchData } from '~/components/search-bar/search-bar';

export const filterByTitle = ({
    searchResTitleArr,
    postList,
}: {
    searchResTitleArr: SearchData[];
    postList: Post[];
}) => {
    const searchResTitles = searchResTitleArr.map((tag) => tag.name);

    const postTitleArr = postList.map((post) => {
        return {
            [post.slug]: post.title,
        };
    });

    const searchResTitleSet = new Set(searchResTitles);

    const filteredPostTitleArr = postTitleArr.filter((post) => {
        const postTitleSet = new Set(Object.values(post));
        const common = [...searchResTitleSet].filter((x) =>
            postTitleSet.has(x)
        );
        return common.length;
    });

    const filteredPostTitlesArr = filteredPostTitleArr.map(
        (post) => Object.keys(post)[0]
    );

    return postList.filter((post) => {
        return filteredPostTitlesArr.indexOf(post.slug) !== -1;
    });
};
