import { Box, Heading, Tag, Text, theme } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { Post } from '@prisma/client';
import { Taglist } from '../taglist/Taglist';

export const PostWrap = ({ post }: { post: Post }) => {
    const StyledHeading = styled(Box)({
        marginBottom: theme.space[4],
        h1: {
            marginBottom: theme.space[4],
        },
        '.author': {
            marginBottom: theme.space[1],
        },
        '.taglist-wrap': {
            marginBottom: theme.space[1],
            display: 'flex',
        },
    });
    const StyledTextWrap = styled(Box)({
        p: {
            marginBottom: theme.space[2],
        },
    });

    return (
        <Box>
            <StyledHeading mb={4}>
                <Heading as="h1" fontSize={'4xl'}>
                    {post.icon !== '' && post.icon} {post.title}
                </Heading>
                <Box bg="#edf2f74f" pt="2" pb="2" pl="2">
                    <Text fontSize="sm" className="author">
                        {post.author ? post.author : 'No author set'}
                    </Text>
                    <div className="taglist-wrap">
                        <Taglist post={post} />
                    </div>

                    <Text fontSize="sm">
                        {new Date('2023-03-08T01:36:00.000Z').toDateString()}
                    </Text>
                </Box>
            </StyledHeading>
            <StyledTextWrap
                dangerouslySetInnerHTML={{ __html: post.html || '' }}
            ></StyledTextWrap>
        </Box>
    );
};
