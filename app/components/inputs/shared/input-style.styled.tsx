import { FormControl, theme } from '@chakra-ui/react';
import styled from '@emotion/styled';

export const StyledFormControl = styled(FormControl)(({ hasvalue }) => ({
    display: 'flex',
    flexDirection: 'column',
    marginTop: hasvalue === 'true' ? theme.space[8] : theme.space[4],
    transition: 'margin .2s ease',
    ':not(first-child):has(input:focus)': {
        marginTop: theme.space[8],
    },
    ':has(textarea:focus)': {
        marginTop: theme.space[8],
    },
}));
