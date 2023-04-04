import { Box, Input } from '@chakra-ui/react';
import { useEffect } from 'react';
import type { SearchBarProps } from './search-bar.d';

export const SearchBar = ({ searchData, setSearchRes }: SearchBarProps) => {
    const initialData = {
        authors: searchData.authors,
        tags: searchData.tags,
        titles: searchData.titles,
    };
    useEffect(() => {
        setSearchRes(initialData);
    }, []);

    const handleInputChange = (e: any) => {
        const value = e.target.value.toLowerCase();
        const key = e.code;

        if (key === 'Backspace' && value.length <= 0) {
            setSearchRes(initialData);
        } else if (value.length >= 2) {
            const filteredAuthors = searchData.authors.filter((item) =>
                item.name.toLowerCase().includes(value)
            );
            const filteredTags = searchData.tags.filter((item) =>
                item.name.toLowerCase().includes(value)
            );
            const filteredTitles = searchData.titles.filter((item) =>
                item.name.toLowerCase().includes(value)
            );

            setSearchRes({
                authors: filteredAuthors,
                tags: filteredTags,
                titles: filteredTitles,
            });
        }
    };

    return (
        <Box mb={2} mr={[0, 0, 2]}>
            <Input
                placeholder="Filter"
                size="md"
                onKeyUp={(e) => handleInputChange(e)}
            />
        </Box>
    );
};
