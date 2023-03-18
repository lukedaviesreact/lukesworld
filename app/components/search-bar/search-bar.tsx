import { Box, Input } from '@chakra-ui/react';
import { useEffect } from 'react';

export interface SearchData {
    name: string;
    color?: string;
}
export interface SearchDataProps {
    authors: SearchData[];
    tags: SearchData[];
    titles: SearchData[];
}

export interface SearchBarProps {
    searchData: SearchDataProps;
    setSearchRes: (searchRes: SearchDataProps) => void;
}

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
        const value = e.target.value;
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
        <Box mb={2} mr={2}>
            <Input
                placeholder="Filter"
                size="md"
                onKeyUp={(e) => handleInputChange(e)}
            />
            <Box>
                {/* <div>
                    <Text>Authors</Text>
                    {searchData.authors.map((author: any, i: number) => (
                        <Badge
                            key={`${author}-${i}`}
                            colorScheme={'gray'}
                            onClick={() =>
                                handleTagClick({
                                    type: 'author',
                                    id: `${author}-${i}`,
                                    name: author,
                                })
                            }
                        >
                            {author}
                        </Badge>
                    ))}
                </div> */}

                {/* <div>
                    <Text>Tags</Text>
                    {searchData.tags.map((tag: any, i: number) => (
                        <Badge
                            key={`${tag}-${i}`}
                            colorScheme={'gray'}
                            onClick={() =>
                                handleTagClick({
                                    type: 'tag',
                                    id: `${tag}-${i}`,
                                    name: tag,
                                })
                            }
                        >
                            {tag}
                        </Badge>
                    ))}
                </div> */}
            </Box>
        </Box>
    );
};
