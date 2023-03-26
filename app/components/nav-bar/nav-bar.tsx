import { Box, theme } from '@chakra-ui/react';

import styled from '@emotion/styled';
import { NavLinks } from './nav-links';
import { NavLogo } from './nav-logo';

export const NavBar = () => {
    const StyledNav = styled(Box)({
        borderBottom: `2px solid ${theme.colors.gray[100]}`,
        display: 'flex',
        justifyContent: 'space-between',
        padding: `${theme.space[2]} 0`,
        maxWidth: theme.breakpoints.lg,
        margin: '0 auto',
        color: theme.colors.gray['600'],
        position: 'sticky',
        top: 0,
        backgroundColor: theme.colors.white,
        zIndex: 1,
    });

    return (
        <StyledNav display={'flex'}>
            <NavLogo />
            <NavLinks />
        </StyledNav>
    );
};
