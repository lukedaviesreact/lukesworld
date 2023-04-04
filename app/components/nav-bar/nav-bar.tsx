import { HStack, Text } from '@chakra-ui/react';

import { Link } from '@remix-run/react';
import { LoadingBar } from '../search-bar/loading-bar';
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
            </StyledNavInner>
            <LoadingBar />
        </StyledNav>
    );
};
