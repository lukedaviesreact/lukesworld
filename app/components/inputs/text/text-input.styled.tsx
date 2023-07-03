import { Input, theme } from '@chakra-ui/react';
import styled from '@emotion/styled';

export const StyledInput = styled(Input)(({ hasvalue }) => ({
    border: '2px solid',
    borderRadius: '0px',
    ':hover': {
        borderColor: theme.colors.gray[900],
    },
    '+ label': {
        color: theme.colors.gray[700],
        transform:
            hasvalue === 'true' ? 'translateY(-22px)' : 'translateY(1px)',
        fontSize: hasvalue === 'true' ? theme.fontSizes.sm : theme.fontSizes.xs,
    },
    '&:focus ~ label': {
        transform: 'translateY(-22px)',
        fontSize: theme.fontSizes.sm,
    },
}));
