import { MobileMenu } from '../mobile-menu/mobile-menu';
import { LoadingBar } from '../search-bar/loading-bar';
import { StyledNav, StyledNavInner } from './nav-bar.styled';
import { NavLogo } from './nav-logo';

export const NavBar = () => {
    return (
        <StyledNav>
            <StyledNavInner
                direction={'row'}
                justifyContent={'space-between'}
                align={'center'}
            >
                <NavLogo />
                <MobileMenu />
            </StyledNavInner>
            <LoadingBar />
        </StyledNav>
    );
};
