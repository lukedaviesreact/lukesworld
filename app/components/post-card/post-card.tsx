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
import { Link } from '@remix-run/react';
import { formatTitleForURL } from '~/utils/posts';
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

    return (
        <StyledLink
            key={post.id}
            to={`/posts/${formatTitleForURL(post.title)}`}
            prefetch="intent"
        >
            <Card minH={variation === 'lg' ? '188px' : 'unset'}>
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
                    </Stack>
                </CardBody>
            </Card>
        </StyledLink>
    );
};
