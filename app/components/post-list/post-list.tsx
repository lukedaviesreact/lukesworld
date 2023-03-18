import { VStack, Text } from '@chakra-ui/react';
import { Post } from '@prisma/client';
import { useState } from 'react';
import { filterPosts } from '~/utils/filter-posts';
import { PostCard } from '../post-card/post-card';
import { SearchBar } from '../search-bar/search-bar';
import type { SearchDataProps } from '../search-bar/search-bar.d';

interface PostListProps {
    searchData: SearchDataProps;
    postList: Post[];
}

export const PostList = ({ searchData, postList }: PostListProps) => {
    const [searchRes, setSearchRes] = useState<SearchDataProps>();

    const filteredPosts = filterPosts({
        searchRes: searchRes,
        postList: postList,
    });

    return (
        <>
            <SearchBar searchData={searchData} setSearchRes={setSearchRes} />
            <Text color="gray.600" fontSize={'sm'} pb={2} pl={1}>
                Search by title or category tag
            </Text>
            <VStack align="start" overflowY="scroll" maxH="calc(100vh - 200px)">
                {filteredPosts.map((post) => {
                    if (!post.title || !post.id) {
                        return <li key="invalid-post">Invalid Post</li>;
                    }
                    return <PostCard key={post.id} post={post} />;
                })}
            </VStack>
        </>
    );
};
