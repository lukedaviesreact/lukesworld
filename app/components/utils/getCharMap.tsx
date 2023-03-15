import type { SearchData } from '../search-bar/search-bar';

export const getCharMap = (arr: SearchData[]) => {
    const charMap: { [key: string]: number } = {};
    for (let item of arr) {
        charMap[item.name] = charMap[item.name] + 1 || 1;
    }
    return charMap;
};
