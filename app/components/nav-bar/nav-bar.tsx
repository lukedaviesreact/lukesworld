import { Box, Button, Stack, theme } from '@chakra-ui/react';
import { Link } from '@remix-run/react';
import styled from '@emotion/styled';

export const NavBar = () => {
    const StyledNav = styled(Box)({
        borderBottom: `2px solid ${theme.colors.gray[100]}`,
        display: 'flex',
        justifyContent: 'space-between',
        padding: `${theme.space[2]} 0`,
        maxWidth: theme.breakpoints.lg,
        margin: '0 auto',
        color: theme.colors.gray['600'],
    });

    return (
        <StyledNav>
            <Link to="/" prefetch="intent">
                <span>lukedavies.dev</span>
            </Link>
            <Stack direction="row" spacing={20}>
                <Link to="/posts" prefetch="intent">
                    <Button variant="solid">
                        <span>Posts</span>
                    </Button>
                </Link>
                <Link to="/" prefetch="intent">
                    <Button variant="solid">
                        <span>Projects</span>
                    </Button>
                </Link>
            </Stack>
        </StyledNav>
    );
};
