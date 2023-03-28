import { Stack, Text, theme } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { Link } from '@remix-run/react';

export const NavLinks = () => {
    const StyledStack = styled(Stack)({
        flexDirection: 'column',
        [`@media screen and (min-width: ${theme.breakpoints.md})`]: {
            flexDirection: 'row',
        },
        '> a:not(last-child)': {
            marginRight: 0,
            [`@media screen and (min-width: ${theme.breakpoints.md})`]: {
                marginRight: '16px',
            },
        },
    });

    return (
        <StyledStack fontSize={'small'} alignItems={'end'}>
            <Link to="/posts" prefetch="intent">
                <Text>Posts</Text>
            </Link>

            <Link to="/image-generation" prefetch="intent">
                <Text>Generate AI Images</Text>
            </Link>

            <Link to="/#contact" prefetch="intent">
                <Text>Contact</Text>
            </Link>
        </StyledStack>
    );
};
