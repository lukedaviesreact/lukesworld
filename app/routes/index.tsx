import { Box, Heading, Text } from '@chakra-ui/react';

export default function Index() {
    return (
        <main>
            <Box>
                <Text>Hi, my name is</Text>
                <Box mt={2} mb={4}>
                    <Heading size="2xl" as="h2">
                        Luke Davies
                    </Heading>
                    <Heading as="h1" size="md" fontWeight={400}>
                        Front-end developer, specialising in React
                    </Heading>
                </Box>

                <Text>Website coming soon</Text>
            </Box>
        </main>
    );
}
