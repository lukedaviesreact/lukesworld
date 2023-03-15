import { Box, theme, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';

export const Footer = () => {
    const StyledFooter = styled(Box)({
        borderBottom: `2px solid ${theme.colors.gray[100]}`,
        display: 'flex',
        justifyContent: 'space-between',
        padding: `${theme.space[16]} 0`,
        maxWidth: theme.breakpoints.lg,
        margin: '0 auto',
        color: theme.colors.gray['600'],
        marginBottom: `${theme.space[4]}`,
    });

    return (
        <StyledFooter>
            <Text fontSize={'small'}>lukedavies.dev 2023</Text>
        </StyledFooter>
    );
};
