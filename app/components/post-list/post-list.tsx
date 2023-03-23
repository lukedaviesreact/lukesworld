import { VStack, Text, theme, Box } from '@chakra-ui/react';
import type { Post } from '@prisma/client';
import { useLoaderData } from '@remix-run/react';
import { useState } from 'react';
import { filterPosts } from '~/utils/filter-posts';
import { PostCard } from '../post-card/post-card';
import { SearchBar } from '../search-bar/search-bar';
import type { SearchDataProps } from '../search-bar/search-bar.d';
import { isBrowser } from '../utils/isBrowser';

type LoaderData = {
    postList?: Post[];
    searchData: SearchDataProps;
    totalTags: number;
    totalTitles: number;
};

export const PostList = () => {
    const { postList, searchData } = useLoaderData() as LoaderData;
    const [searchRes, setSearchRes] = useState<SearchDataProps>();

    const filteredPosts = filterPosts({
        searchRes: searchRes,
        postList: postList,
    });

    return (
        <Box>
            <SearchBar searchData={searchData} setSearchRes={setSearchRes} />
            <Text color="gray.600" fontSize={'sm'} pb={2} pl={1}>
                Search by title or category tag
            </Text>
            <VStack
                align="start"
                overflowY="scroll"
                maxHeight={'calc(100vh - 158px)'}
                gap={2}
                pb={4}
                pt={4}
                pl={2}
                pr={2}
            >
                {filteredPosts.map((post) => {
                    if (!post.title || !post.id) {
                        return <li key="invalid-post">Invalid Post</li>;
                    }
                    return (
                        <PostCard key={post.id} post={post} variation="sm" />
                    );
                })}
            </VStack>
        </Box>
    );
};
