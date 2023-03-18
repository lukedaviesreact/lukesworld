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
