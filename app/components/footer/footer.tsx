import { Box, theme, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { NavLinks } from '../nav-bar/nav-links';
import { SocialLinks } from '../social-links/social-links';

export const Footer = () => {
    const StyledFooter = styled(Box)({
        borderBottom: `2px solid ${theme.colors.gray[100]}`,
        display: 'flex',
        justifyContent: 'space-between',
        padding: `${theme.space[4]}`,
        maxWidth: theme.breakpoints.lg,
        margin: '0 auto',
        color: theme.colors.gray['600'],
        marginBottom: `${theme.space[4]}`,
        width: '100%',
        alignItems: 'center',
        '>*': {
            flex: 1,
        },
        '.chakra-stack p': {
            textAlign: 'end',
        },

        '.social-links .chakra-stack': {
            justifyContent: 'center',
        },

        '.nav-links .chakra-stack': {
            justifyContent: 'flex-end',
        },
    });

    return (
        <StyledFooter>
            <Text fontSize={'small'}>lukedavies.dev 2023</Text>
            <div className="social-links">
                <SocialLinks />
            </div>

            <div className="nav-links">
                <NavLinks />
            </div>
        </StyledFooter>
    );
};
