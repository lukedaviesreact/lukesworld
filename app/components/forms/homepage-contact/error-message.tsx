import { Box } from '@chakra-ui/react';
import { StyledHeading } from '~/components/styled-heading/styled-heading';

export const ErrorMessage = ({ error }: { error: string }) => {
    console.log('error sending message', error);
    return (
        <Box>
            <StyledHeading
                type="h3"
                size="sm"
                content="Oh no, there was an error sending your message please try again"
                color="dark"
            />
        </Box>
    );
};
