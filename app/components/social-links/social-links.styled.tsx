import { Box } from '@chakra-ui/react';
import styled from '@emotion/styled';

export const SocialLinkWrap = styled(Box)(({ isheader }) => ({
    position: isheader === 'true' ? 'absolute' : 'relative',
    left: '0',
    bottom: '0',
    zIndex: '1',
}));
