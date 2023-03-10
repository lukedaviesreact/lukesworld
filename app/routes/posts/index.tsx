import { Box, Text } from '@chakra-ui/react';
import { json, LoaderFunction } from '@remix-run/node';

export const loader: LoaderFunction = async () => {
    return json({});
};

export default function PostIndexRoute() {
    return (
        <main>
            <Box pt={2}>
                <Text>Select a post</Text>
            </Box>
        </main>
    );
}
