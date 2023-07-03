import { Card, theme } from '@chakra-ui/react';
import styled from '@emotion/styled';

export const StyledCard = styled(Card)({
    height: '100%',
    boxShadow: `4px 4px ${theme.colors.gray[700]}`,
    borderRadius: '0px',
    border: `1px solid ${theme.colors.gray[700]}`,
    transform: 'translateX(-2px) translateY(-2px)',
    transition: 'all .2s ease',
    '&:hover': {
        boxShadow: `0px 0px ${theme.colors.gray[700]}`,
        transform: 'translateX(0px) translateY(0px)',
    },
});
