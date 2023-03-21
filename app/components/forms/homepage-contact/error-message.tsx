import { Box, Heading } from '@chakra-ui/react';

export const ErrorMessage = ({ error }: { error: string }) => {
    console.log('error sending message', ErrorEvent);
    return (
        <Box>
            <Heading as="h3" size={'sm'} color={'gray.700'} display="flex">
                Oh no, there was an error sending your message please try again
            </Heading>
        </Box>
    );
};
