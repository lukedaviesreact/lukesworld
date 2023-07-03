import { Box, theme } from '@chakra-ui/react';
import styled from '@emotion/styled';

export const StyledAccordionWrap = styled(Box)({
    margin: '0 auto',

    [`@media (min-width:${theme.breakpoints.lg})`]: {
        maxWidth: '75%',
    },
    'h2 > span': {
        fontWeight: 'bold',
    },
});
