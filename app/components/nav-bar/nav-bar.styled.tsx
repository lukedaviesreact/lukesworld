import { Box, Stack, theme } from '@chakra-ui/react';
import styled from '@emotion/styled';

export const StyledNav = styled(Box)({
    color: theme.colors.gray['600'],
    position: 'sticky',
    top: 0,
    zIndex: '9',
    backgroundColor: theme.colors.white,
});

export const StyledNavInner = styled(Stack)({
    maxWidth: `${theme.breakpoints.lg}`,
    padding: `${theme.space[2]} ${theme.space[4]}`,
    borderBottom: `2px solid ${theme.colors.gray[100]}`,
    margin: '0 auto',

    [`@media (min-width:${theme.breakpoints.lg})`]: {
        padding: `${theme.space[2]} 0`,
    },
});
