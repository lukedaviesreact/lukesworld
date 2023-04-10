import { Stack, Text, theme } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { Link } from '@remix-run/react';
import { NAV_LINKS } from './nav-bar.constants';

export const NavLinks = () => {
    const StyledStack = styled(Stack)({
        flexDirection: 'column',
    });

    return (
        <StyledStack fontSize={'small'} alignItems={'end'}>
            {NAV_LINKS.map((link, i) => (
                <Link to={link.url} prefetch="intent" key={i}>
                    <Text>{link.label}</Text>
                </Link>
            ))}
        </StyledStack>
    );
};
