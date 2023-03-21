import { Box, Heading } from '@chakra-ui/react';

export const SuccessMessage = ({ name }: { name: string }) => {
    return (
        <Box>
            <Heading as="h3" size={'sm'} color={'gray.700'} display="flex">
                Thanks {name} I've recieved your message. I'll get back to you
                shortly.
            </Heading>
        </Box>
    );
};
