export const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-UK');
};
