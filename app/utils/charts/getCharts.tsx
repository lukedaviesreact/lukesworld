import { Token } from '../../routes/charts';

interface GetCharts {
    tokens: Token[];
}

export const getCharts = async ({ tokens }: GetCharts) => {
    if (!tokens) {
        return null;
    }

    const addresses = tokens.map((token) => token.address).join(',');

    try {
        const repos = await fetch(
            `https://api.dexscreener.com/latest/dex/pairs/ethereum/${addresses}`
        ).then((res) => res.json());

        return repos;
    } catch (err) {
        console.log('Error getting charts');
    }
};
