import { Box, Input } from '@chakra-ui/react';

export const SearchBar = () => {
    return (
        <Box mb={6} mr={2}>
            <Input placeholder="Filter" size="md" />
        </Box>
    );
};
