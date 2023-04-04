export const getProjects = async () => {
    try {
        const repos = await fetch(
            'https://api.github.com/users/lukedxvxes/repos',
            {
                headers: {
                    Authorization: `Bearer ${process.env.GITHUB_PROJECTS_LUKEDXVXES}`,
                },
            }
        ).then((res) => res.json());

        return repos;
    } catch (err) {
        console.log('Error getting github repos');
    }
};
