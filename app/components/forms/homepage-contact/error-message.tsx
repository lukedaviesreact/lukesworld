import { Box, Heading } from '@chakra-ui/react';

export const ErrorMessage = ({ error }: { error: string }) => {
    return (
        <Box>
            <Heading as="h3" size={'sm'} color={'gray.700'} display="flex">
                Oh no, {error}
            </Heading>
        </Box>
    );
};
