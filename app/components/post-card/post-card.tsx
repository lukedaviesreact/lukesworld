import {
    Box,
    Card,
    CardBody,
    Heading,
    Stack,
    theme,
    Text,
    HStack,
    VStack,
} from '@chakra-ui/react';
import styled from '@emotion/styled';
import type { Post } from '@prisma/client';
import { Link, useNavigation } from '@remix-run/react';
import { formatTitleForURL } from '~/utils/posts';
import { LoadingSpinner } from '../loading-spinner/loading-spinner';
import { Taglist } from '../taglist/Taglist';
import { formatDate } from '../utils/formatDate';
import { isBrowser } from '../utils/isBrowser';

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

    const StyledCard = styled(Card)({
        transition: 'all .3s ease',
        '&:hover': {
            transform: `translateX(${theme.space[4]})`,
        },
    });
    const navigation = useNavigation();

    const isPostLoading = (post: Post) => {
        return (
            navigation.state === 'loading' &&
            navigation.location.pathname.includes(
                post.title.toLowerCase().replace(/\ /g, '-')
            )
        );
    };
    const activeSlug = isBrowser()
        ? window.location.pathname.split('/posts/')[1]
        : '';
    const isActive =
        post.title.replace(/\s+/g, '-').toLowerCase() === activeSlug;
    return (
        <StyledLink
            key={post.id}
            to={`/posts/${formatTitleForURL(post.title)}`}
            prefetch="intent"
        >
            <StyledCard
                minH={variation === 'lg' ? '188px' : 'unset'}
                transform={`translateX(${isActive ? theme.space[4] : 0})`}
            >
                <CardBody>
                    <Stack spacing="3">
                        <Box
                            minH={variation === 'lg' ? '40px' : 'unset'}
                            display={'flex'}
                            alignItems={'center'}
                        >
                            <Heading size={'sm'} noOfLines={2}>
                                {post?.icon !== '' && post?.icon} {post.title}
                            </Heading>
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
