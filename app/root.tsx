import type {
    LinksFunction,
    LoaderFunction,
    MetaFunction,
} from '@remix-run/node';
import { json } from '@remix-run/node';
import {
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    useLoaderData,
} from '@remix-run/react';
import { cssBundleHref } from '@remix-run/css-bundle';

import styles from '~/styles/base.css';
import resetStyles from '~/styles/reset.css';
import variablesStyles from '~/styles/variables.css';

import { getUser } from './session.server';
import { getEnv } from './env.server';
import { NavBar } from './components/navbar/Navbar';
import NavBarStyle from './components/navbar/navbar.css';

export const meta: MetaFunction = () => ({
    charset: 'utf-8',
    title: 'Lukes World',
    viewport: 'width=device-width,initial-scale=1',
});

export const links: LinksFunction = () => {
    return [
        ...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : []),
        { rel: 'stylesheet', href: resetStyles },
        { rel: 'stylesheet', href: variablesStyles },
        { rel: 'stylesheet', href: styles },
        { rel: 'stylesheet', href: NavBarStyle },
    ];
};

type LoaderData = {
    user: Awaited<ReturnType<typeof getUser>>;
    ENV: ReturnType<typeof getEnv>;
};

export const loader: LoaderFunction = async ({ request }) => {
    return json<LoaderData>({
        user: await getUser(request),
        ENV: getEnv(),
    });
};

export default function App() {
    return (
        <html lang="en" className="h-full">
            <head>
                <Meta />
                <Links />
            </head>
            <body className="h-full">
                <NavBar />

                <Outlet />
                <ScrollRestoration />
                <Scripts />

                <LiveReload />
            </body>
        </html>
    );
}
