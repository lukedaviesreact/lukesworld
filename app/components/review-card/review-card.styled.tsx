import { Box, theme } from '@chakra-ui/react';
import styled from '@emotion/styled';

export const StyledReviewCard = styled(Box)({
    h4: {
        fontWeight: 'bold',
    },
    '.business-name': {
        fontStyle: 'italic',
        fontSize: theme.fontSizes.xs,
    },
});
