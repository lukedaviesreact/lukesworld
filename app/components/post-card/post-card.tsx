import {
    Box,
    CardBody,
    Stack,
    theme,
    Text,
    HStack,
    VStack,
    Card,
} from '@chakra-ui/react';
import styled from '@emotion/styled';
import type { Post } from '@prisma/client';
import { Link, useNavigation } from '@remix-run/react';
import { motion } from 'framer-motion';
import { formatTitleForURL } from '~/utils/posts';

import { LoadingSpinner } from '../loading-spinner/loading-spinner';
import { StyledCard } from '../styled-card/styled-card.styled';
import { StyledHeading } from '../styled-heading/styled-heading';
import { Taglist } from '../taglist/Taglist';
import { formatDate } from '../utils/formatDate';

export const PostCard = ({
    post,
    variation,
}: {
    post: Post;
    variation: 'sm' | 'lg';
}) => {
    const StyledLink = styled(Link)({
        width: '100%',
        color: theme.colors.gray[700],
        transition: 'all .05s ease',
        '&:hover': {
            color: theme.colors.gray[900],
        },
    });

    const navigation = useNavigation();

    const isPostLoading = (post: Post) => {
        return (
            navigation.state === 'loading' &&
            navigation.location.pathname.includes(
                post.title.toLowerCase().replace(/ /g, '-')
            )
        );
    };

    return (
        <StyledLink
            key={post.id}
            to={`/posts/${formatTitleForURL(post.title)}`}
            prefetch="intent"
            state={{
                post: {
                    title: post.title,
                    author: post.author,
                    createdAt: post.createdAt,
                    tags: post.tags,
                },
            }}
        >
            <StyledCard minH={variation === 'lg' ? '188px' : 'unset'}>
                <CardBody>
                    <Stack spacing="3">
                        <Box
                            minH={variation === 'lg' ? '40px' : 'unset'}
                            display={'flex'}
                            alignItems={'center'}
                        >
                            <StyledHeading
                                type="h3"
                                size="sm"
                                content={post.title}
                                color="dark"
                                noOfLines={2}
                            />
                        </Box>

                        {variation === 'lg' ? (
                            <HStack mt="2" justifyContent={'space-between'}>
                                <Taglist post={post} />
                                <Text fontSize="sm" color="gray.600">
                                    {formatDate(post.createdAt)}
                                </Text>
                            </HStack>
                        ) : (
                            <VStack mt="2" alignItems={'start'}>
                                <Taglist post={post} />
                                <Text fontSize="sm" color="gray.600">
                                    {formatDate(post.createdAt)}
                                </Text>
                            </VStack>
                        )}
                        {variation === 'lg' ? (
                            <Text
                                fontSize="sm"
                                color="gray.600"
                                noOfLines={[2, 2, 3]}
                            >
                                {post.excerpt}
                            </Text>
                        ) : null}

                        {isPostLoading(post) && variation === 'sm' && (
                            <LoadingSpinner />
                        )}
                    </Stack>
                </CardBody>
            </StyledCard>
        </StyledLink>
    );
};
