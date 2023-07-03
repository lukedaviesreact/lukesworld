import { Box, Heading, theme } from '@chakra-ui/react';
import styled from '@emotion/styled';

export const StyledHeadingWrap = styled(Box)({
    borderBottom: `1px solid ${theme.colors.gray[100]}`,
});
export const StyledHeadline = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: '60vh',
    position: 'relative',
});

export const StyledSubline = styled(Box)({
    color: theme.colors.gray[600],
    display: 'flex',
    justifyContent: 'end',
    position: 'relative',
    top: '-1.25rem',
});

export const Styledhighlight = styled('span')({
    position: 'absolute',
    right: '1.5rem',
    bottom: '-2rem',
    transform: 'scale(1,2)',
    color: '#805ad5',
});
