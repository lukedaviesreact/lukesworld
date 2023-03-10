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
} from '@remix-run/react';
import { cssBundleHref } from '@remix-run/css-bundle';

import { getEnv } from './env.server';
import { withEmotionCache } from '@emotion/react';
import { useContext, useEffect } from 'react';
import { ClientStyleContext, ServerStyleContext } from './context';
import { Box, ChakraProvider, theme } from '@chakra-ui/react';
import { NavBar } from './components/navbar/Navbar';

export const meta: MetaFunction = () => ({
    charset: 'utf-8',
    title: 'Lukes Davies Dev',
    viewport: 'width=device-width,initial-scale=1',
});

export const links: LinksFunction = () => {
    return [
        ...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : []),
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
        {
            rel: 'stylesheet',
            href: 'https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap',
        },
    ];
};

type LoaderData = {
    ENV: ReturnType<typeof getEnv>;
};

export const loader: LoaderFunction = async ({ request }) => {
    return json<LoaderData>({
        ENV: getEnv(),
    });
};

interface DocumentProps {
    children: React.ReactNode;
}

const Document = withEmotionCache(
    ({ children }: DocumentProps, emotionCache) => {
        const serverStyleData = useContext(ServerStyleContext);
        const clientStyleData = useContext(ClientStyleContext);

        // Only executed on client
        useEffect(() => {
            // re-link sheet container
            emotionCache.sheet.container = document.head;
            // re-inject tags
            const tags = emotionCache.sheet.tags;
            emotionCache.sheet.flush();
            tags.forEach((tag) => {
                (emotionCache.sheet as any)._insertTag(tag);
            });
            // reset cache to reapply global styles
            clientStyleData?.reset();
        }, []);

        return (
            <html lang="en">
                <head>
                    <Meta />
                    <Links />
                    {serverStyleData?.map(({ key, ids, css }) => (
                        <style
                            key={key}
                            data-emotion={`${key} ${ids.join(' ')}`}
                            dangerouslySetInnerHTML={{ __html: css }}
                        />
                    ))}
                </head>
                <body>
                    <Box
                        margin="0 auto"
                        paddingLeft={theme.space[4]}
                        paddingRight={theme.space[4]}
                    >
                        <NavBar />

                        <Box maxW={theme.breakpoints.lg} margin="0 auto" pt="4">
                            {children}
                        </Box>
                    </Box>

                    <ScrollRestoration />
                    <Scripts />
                    <LiveReload />
                </body>
            </html>
        );
    }
);

export default function App() {
    return (
        <Document>
            <ChakraProvider theme={theme}>
                <Outlet />
            </ChakraProvider>
        </Document>
    );
}
