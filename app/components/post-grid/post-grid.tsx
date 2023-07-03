import { GridItem, SimpleGrid } from '@chakra-ui/react';
import type { Post } from '@prisma/client';
import { motion } from 'framer-motion';
import { container, item } from '../../style/animation';
import { PostCard } from '../post-card/post-card';

interface PostGridArgs {
    postList: Post[];
}
export const PostGrid = ({ postList }: PostGridArgs) => {
    return (
        <SimpleGrid
            as={motion.div}
            gridTemplateColumns="repeat(6, 1fr)"
            gridRowGap={4}
            gridColumnGap={4}
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
        >
            {postList?.slice(0, 3).map((post) => {
                if (!post.title || !post.id) {
                    return <li key="invalid-post">Invalid Post</li>;
                }
                return (
                    <GridItem
                        as={motion.div}
                        colSpan={{
                            base: 6,
                            md: 3,
                            lg: 2,
                            xl: 2,
                        }}
                        key={post.id}
                        h="100%"
                        variants={item}
                    >
                        <PostCard key={post.id} post={post} variation="lg" />
                    </GridItem>
                );
            })}
        </SimpleGrid>
    );
};
