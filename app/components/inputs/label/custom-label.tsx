import { FormLabel } from '@chakra-ui/react';
import styled from '@emotion/styled';

export const CustomLabel = ({ label }: { label: string }) => {
    const StyledFormLabel = styled(FormLabel)({
        position: 'absolute',
        left: '5px',
        transform: 'translateY(4px)',
        transition: 'all .2s ease',
        order: '-1',
    });

    return (
        <StyledFormLabel fontSize={'xs'} mb={1} color={'gray.400'}>
            {label}
        </StyledFormLabel>
    );
};
