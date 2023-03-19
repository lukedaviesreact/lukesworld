import { Link } from '@remix-run/react';

export const NavLogo = () => {
    return (
        <Link to="/" prefetch="intent">
            <span>lukedavies.dev</span>
        </Link>
    );
};
