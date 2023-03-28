import { Box } from '@chakra-ui/react';
import { StyledHeading } from '~/components/styled-heading/styled-heading';

export const ErrorMessage = ({ error }: { error: string }) => {
    console.log('error generating image', error);
    return (
        <Box>
            <StyledHeading
                type="h3"
                size="sm"
                content="Oh no, there was an error generating your image"
                color="dark"
            />
        </Box>
    );
};
