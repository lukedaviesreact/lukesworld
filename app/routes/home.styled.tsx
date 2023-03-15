import { Box, theme } from '@chakra-ui/react';
import styled from '@emotion/styled';

export const StyledHeadingWrap = styled(Box)({
    borderBottom: `1px solid ${theme.colors.gray[100]}`,
});
export const StyledHeadline = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    minHeight: '60vh',
});

export const StyledSubline = styled(Box)({
    color: theme.colors.gray[500],
    display: 'flex',
    justifyContent: 'center',
    position: 'relative',
    top: '-1.25rem',
});
