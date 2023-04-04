import { Box, HStack, Text, theme } from '@chakra-ui/react';

import { Link, useTransition } from '@remix-run/react';
import { motion } from 'framer-motion';
import { StyledNav, StyledNavInner } from './nav-bar.styled';
import { NavLogo } from './nav-logo';

export const NavBar = () => {
    const transition = useTransition();

    console.log('transition from nav', transition);

    const isLoadingPage = transition.state === 'loading';

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
            {isLoadingPage && (
                <Box
                    position={'absolute'}
                    width={'100%'}
                    height={'5px'}
                    role="progressbar"
                >
                    <Box
                        as={motion.div}
                        w={'20%'}
                        h={'100%'}
                        background={theme.colors.purple[200]}
                        initial={{ opacity: 0, width: '20%' }}
                        animate={{
                            opacity: 1,
                            width: '100%',
                            transition: { duration: 2 },
                        }}
                    ></Box>
                </Box>
            )}
        </StyledNav>
    );
};
