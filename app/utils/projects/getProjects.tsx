export const getProjects = async () => {
    try {
        const repos = await fetch(
            'https://api.github.com/users/lukedxvxes/repos'
        ).then((res) => res.json());

        return repos;
    } catch (err) {
        console.log('Error getting github repos');
    }
};
