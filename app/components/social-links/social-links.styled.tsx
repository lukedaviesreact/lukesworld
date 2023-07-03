import { Box, theme } from '@chakra-ui/react';
import styled from '@emotion/styled';

export const SocialLinkWrap = styled(Box)(({ isheader }) => ({
    position: 'relative',
    left: '0',
    bottom: '0',
    zIndex: '1',
    marginTop: '.5rem',
    [`@media (min-width:${theme.breakpoints.lg})`]: {
        position: isheader === 'true' ? 'absolute' : 'relative',
        marginTop: '0',
    },
}));
