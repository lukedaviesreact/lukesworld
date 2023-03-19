import { Box, Button, Heading, Text, theme } from '@chakra-ui/react';
import styled from '@emotion/styled';
import type { Post } from '@prisma/client';
import { Link } from '@remix-run/react';
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

    const StyledMeta = styled(Box)({
        backgroundColor: '#edf2f74f',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
    });

    return (
        <Box>
            <StyledHeading mb={4}>
                <Heading as="h1" fontSize={'4xl'}>
                    {post?.icon !== '' && post.icon} {post.title}
                </Heading>
                <StyledMeta p={'2'}>
                    <Box>
                        <Text fontSize="sm" className="author">
                            {post.author ? post.author : 'No author set'}
                        </Text>
                        <div className="taglist-wrap">
                            <Taglist post={post} />
                        </div>

                        <Text fontSize="sm">
                            {new Date(
                                '2023-03-08T01:36:00.000Z'
                            ).toDateString()}
                        </Text>
                    </Box>

                    <Box display={['block', 'block', 'none']}>
                        <Link to="/posts" prefetch="intent">
                            <Button variant="outline" colorScheme={'purple'}>
                                <span>Back 👈</span>
                            </Button>
                        </Link>
                    </Box>
                </StyledMeta>
            </StyledHeading>
            <StyledTextWrap
                dangerouslySetInnerHTML={{ __html: post.html || '' }}
            ></StyledTextWrap>
        </Box>
    );
};
