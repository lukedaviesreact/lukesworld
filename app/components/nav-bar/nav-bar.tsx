import { HStack, Text } from '@chakra-ui/react';

import { Link } from '@remix-run/react';
import { StyledNav, StyledNavInner } from './nav-bar.styled';
import { NavLogo } from './nav-logo';

export const NavBar = () => {
    return (
        <StyledNav>
            <StyledNavInner direction={'row'} justifyContent={'space-between'}>
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
            </StyledNavInner>
        </StyledNav>
    );
};
