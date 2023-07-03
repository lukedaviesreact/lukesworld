import { Box, Heading, theme } from '@chakra-ui/react';
import styled from '@emotion/styled';

export const StyledPageSectionWrap = styled(Box)({
    padding: `${theme.space['16']} 0`,
    borderBottom: `1px solid ${theme.colors.gray[100]}`,
});
export const StyledHeadingWrap = styled(Box)({
    marginBottom: `${theme.space['16']}`,
    maxWidth: theme.space['96'],
});

export const StyledButtonWrap = styled(Heading)({
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.space['16'],
});

export const StyledSubline = styled(Box)({
    color: theme.colors.gray[600],
    display: 'flex',
    justifyContent: 'center',
    position: 'relative',
    bottom: '-3rem',
    [`@media (min-width:${theme.breakpoints.lg})`]: {
        justifyContent: 'end',
    },
});
