import {
    Box,
    Button,
    Skeleton,
    SkeletonText,
    Text,
    theme,
    VStack,
} from '@chakra-ui/react';
import styled from '@emotion/styled';
import type { Post } from '@prisma/client';
import { Link } from '@remix-run/react';
import { StyledHeading } from '../styled-heading/styled-heading';
import { Taglist } from '../taglist/Taglist';
import { formatDate } from '../utils/formatDate';

export const PostWrap = ({
    post,
    isLoading = false,
}: {
    post: Post;
    isLoading?: boolean;
}) => {
    const StyledHeadingWrap = styled(Box)({
        marginBottom: theme.space[8],
        h1: {
            marginBottom: theme.space[4],
            color: theme.colors.gray[700],
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
        pre: {
            fontSize: '14px',
            margin: `${theme.space['8']} 0`,
        },
        'code:not(.hljs)': {
            color: '#81a1c1',
            padding: '2px',
            background: '#2e3440',
        },
        img: {
            margin: `${theme.space['8']} auto`,
        },
        p: {
            marginBottom: theme.space[4],
        },

        'ol,ul': {
            marginLeft: theme.space[8],
        },

        li: {
            paddingBottom: theme.space[2],
        },
        h3: {
            fontSize: '1.3rem',
            fontWeight: 'bold',
            marginBottom: theme.space[2],
            marginTop: theme.space[8],
        },
        a: {
            display: 'inline-block',
            color: theme.colors.gray['500'],
            transform: 'translateY(0px)',
            transition: 'all .3s ease',
            '&:hover': {
                transform: 'translateY(-3px)',
            },
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
        <Box minH={theme.sizes['2xl']}>
            <StyledHeadingWrap mb={4}>
                <StyledHeading
                    type="h1"
                    size="xl"
                    content={post.title ? post.title : 'no title set'}
                    color="dark"
                />
                <StyledMeta p={'2'}>
                    <Box>
                        <Text fontSize="sm" className="author">
                            {post.author ? post.author : 'No author set'}
                        </Text>
                        <div className="taglist-wrap">
                            <Taglist post={post} />
                        </div>

                        <Text fontSize="sm">{formatDate(post.createdAt)}</Text>
                    </Box>

                    <Box display={['block', 'block', 'none']}>
                        <Link to="/posts" prefetch="intent">
                            <Button variant="outline" colorScheme={'purple'}>
                                <span>Back 👈</span>
                            </Button>
                        </Link>
                    </Box>
                </StyledMeta>
            </StyledHeadingWrap>
            {isLoading ? (
                <VStack spacing={4} alignItems="start">
                    <SkeletonText
                        w={'90%'}
                        isLoaded={!isLoading}
                        opacity={'0.5'}
                        fadeDuration={1}
                    />
                    <Skeleton
                        h={'180'}
                        w={'90%'}
                        isLoaded={!isLoading}
                        opacity={'0.5'}
                        fadeDuration={1}
                    />
                    <SkeletonText
                        w={'90%'}
                        isLoaded={!isLoading}
                        opacity={'0.5'}
                        fadeDuration={1}
                    />
                    <Skeleton
                        h={'180'}
                        w={'90%'}
                        opacity={'0.5'}
                        isLoaded={!isLoading}
                        fadeDuration={1}
                    />
                </VStack>
            ) : (
                <StyledTextWrap
                    dangerouslySetInnerHTML={{ __html: post.html || '' }}
                ></StyledTextWrap>
            )}
        </Box>
    );
};
