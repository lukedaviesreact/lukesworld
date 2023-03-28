import { HStack, Stack, theme, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { Link } from '@remix-run/react';
import { useState } from 'react';
import { NavLogo } from './nav-logo';

export const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const StyledNav = styled(Stack)({
        borderBottom: `2px solid ${theme.colors.gray[100]}`,
        padding: `${theme.space[2]} 0`,
        maxWidth: theme.breakpoints.lg,
        margin: '0 auto',
        color: theme.colors.gray['600'],
        position: 'sticky',
        top: 0,
        zIndex: '9',
        backgroundColor: theme.colors.white,
    });

    return (
        <StyledNav direction={'row'} justifyContent={'space-between'}>
            <NavLogo />
            <HStack alignItems={'end'} spacing={24}>
                <Link to="/posts" prefetch="intent">
                    <Text>Posts</Text>
                </Link>

                <Link to="/#contact" prefetch="intent">
                    <Text>Contact</Text>
                </Link>
            </HStack>
            {/* <Button onClick={() => setIsOpen((isOpen) => !isOpen)}>
                {isOpen ? 'CLOSE' : 'OPEN'} MENU
            </Button> */}

            {/* <AnimatePresence>
                <StyledMenu
                    key={'menu'}
                    initial={{ opacity: 0, x: '400px' }}
                    transition={spring}
                    animate={
                        isOpen
                            ? { opacity: 1, x: '0px' }
                            : { opacity: 0, x: '400px' }
                    }
                    exit={{ opacity: 0 }}
                />
            </AnimatePresence> */}
        </StyledNav>
    );
};
