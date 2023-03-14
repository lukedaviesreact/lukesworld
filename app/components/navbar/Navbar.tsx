import { Box, Button, Stack, theme } from '@chakra-ui/react';
import { Link } from '@remix-run/react';
import styled from '@emotion/styled';

export const NavBar = () => {
    const StyledNav = styled(Box)({
        borderBottom: `1px solid ${theme.colors.gray[300]}`,
        display: 'flex',
        justifyContent: 'space-between',
        padding: `${theme.space[2]} 0`,
    });

    return (
        <StyledNav>
            <Link to="/">
                <span>LD.DEV</span>
            </Link>
            <Stack direction="row" spacing={6}>
                <Link to="/posts">
                    <Button variant="solid">
                        <span>Posts</span>
                    </Button>
                </Link>
                <Link to="/">
                    <Button variant="solid">
                        <span>Projects</span>
                    </Button>
                </Link>
            </Stack>
        </StyledNav>
    );
};
