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

import { getEnv } from './env.server';
import { withEmotionCache } from '@emotion/react';
import { useContext, useEffect } from 'react';
import { ClientStyleContext, ServerStyleContext } from './context';
import { Box, ChakraProvider, theme } from '@chakra-ui/react';
import { NavBar } from './components/nav-bar/nav-bar';

import '@fontsource/nunito-sans/200.css';
import '@fontsource/nunito-sans/300.css';
import '@fontsource/nunito-sans/400.css';
import '@fontsource/nunito-sans/600.css';
import '@fontsource/nunito-sans/700.css';
import '@fontsource/nunito-sans/800.css';
import { Footer } from './components/footer/footer';

export const meta: MetaFunction = () => ({
    charset: 'utf-8',
    title: 'Lukes Davies Dev',
    viewport: 'width=device-width,initial-scale=1',
});

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

                        <Footer />
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
