import { Box, Heading, theme } from '@chakra-ui/react';
import styled from '@emotion/styled';

export const StyledHeadingWrap = styled(Box)({
    borderBottom: `1px solid ${theme.colors.gray[100]}`,
});
export const StyledHeadline = styled(Box)({
    display: 'flex',

    flexDirection: 'column',
    justifyContent: 'center',
    minHeight: '60vh',
    position: 'relative',

    [`@media (min-width:${theme.breakpoints.lg})`]: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        maxWidth: '50%',
    },
});

export const StyledSubline = styled(Box)({
    color: theme.colors.gray[600],
    display: 'flex',
    justifyContent: 'center',
    position: 'relative',
    top: '-1.25rem',
    [`@media (min-width:${theme.breakpoints.lg})`]: {
        justifyContent: 'end',
    },
});

export const Styledhighlight = styled('span')({
    position: 'absolute',
    right: '1.5rem',
    bottom: '-2rem',
    transform: 'scale(1,2)',
    color: '#805ad5',
});
