import { Box, Heading } from '@chakra-ui/react';
import { StyledHeading } from '~/components/styled-heading/styled-heading';

export const SuccessMessage = ({ name }: { name: string }) => {
    return (
        <Box>
            <StyledHeading
                type="h3"
                size="sm"
                content={
                    <>
                        Thanks {name} I've recieved your message. I'll get back
                        to you shortly.
                    </>
                }
                color="dark"
            />
        </Box>
    );
};
