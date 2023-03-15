import { Box, theme } from '@chakra-ui/react';
import styled from '@emotion/styled';
import type { Post } from '@prisma/client';
import { Link } from '@remix-run/react';
import { formatTitleForURL } from '~/utils/posts';
import { Taglist } from '../taglist/Taglist';

export const PostCard = ({ post }: { post: Post }) => {
    const StyledLink = styled(Link)({
        width: '100%',
        color: theme.colors.gray[700],
        transition: 'all .05s ease',
        '&:hover': {
            color: theme.colors.gray[900],
        },
    });

    return (
        <StyledLink
            key={post.id}
            to={`/posts/${formatTitleForURL(post.title)}`}
            prefetch="intent"
        >
            <Box
                key={post.id}
                shadow="md"
                borderBottom={`2px solid gray.200`}
                pt="4"
                pb="4"
                pl="2"
                mr="2"
            >
                {post.icon !== '' && post.icon}
                {post.title}

                <Box mt="2">
                    <Taglist post={post} />
                </Box>
            </Box>
        </StyledLink>
    );
};
