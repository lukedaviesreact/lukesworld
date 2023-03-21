import { Input, theme } from '@chakra-ui/react';
import styled from '@emotion/styled';

export const StyledInput = styled(Input)(({ hasvalue }) => ({
    '+ label': {
        transform:
            hasvalue === 'true' ? 'translateY(-22px)' : 'translateY(0px)',
        fontSize: hasvalue === 'true' ? theme.fontSizes.sm : theme.fontSizes.xs,
    },
    '&:focus ~ label': {
        transform: 'translateY(-22px)',
        fontSize: theme.fontSizes.sm,
    },
}));
