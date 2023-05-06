import {
    Button,
    Card,
    CardBody,
    Text,
    CardFooter,
    CardHeader,
    Heading,
    SimpleGrid,
    Box,
} from '@chakra-ui/react';
import type { LoaderFunction, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { useState } from 'react';
import type { Chart } from '../utils/charts/charts';
import { getCharts } from '../utils/charts/getCharts';

export type LoaderData = {
    charts: Chart;
};

export interface Token {
    symbol: string;
    address: string;
}

export const meta: MetaFunction<typeof loader> = () => ({
    charset: 'utf-8',
    title: 'Charts | Luke Davies Dev',
    description: 'Crypto Charts',
    viewport: 'width=device-width,initial-scale=1',
});

export const loader: LoaderFunction = async () => {
    const tokens: Token[] = [
        {
            symbol: 'ROGAN',
            address: '0xa09b37b3815e703160a961cb7c01ead5a63ebb78',
        },
        {
            symbol: 'IC',
            address: '0xeAabB2eE89221455302D9FFB5325689fF8f0C37B',
        },
    ];
    const charts = await getCharts({ tokens });
    return json<LoaderData>({
        charts,
    });
};

export default function ChartsRoute() {
    const { charts } = useLoaderData() as LoaderData;
    const [isOpen, setIsOpen] = useState<boolean>(false);

    console.log('charts res', charts);

    return (
        <main>
            <SimpleGrid
                spacing={4}
                templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
            >
                {charts.pairs.map((pair) => (
                    <Card key={pair.baseToken.symbol}>
                        <CardHeader>
                            <Heading size="md">
                                {pair.baseToken.symbol}/{pair.quoteToken.symbol}
                            </Heading>
                        </CardHeader>
                        <CardBody>
                            <ul>
                                <li>
                                    <Text>
                                        Liquidity - {pair.liquidity.usd}
                                    </Text>
                                </li>
                            </ul>
                        </CardBody>
                        <CardFooter>
                            <Button onClick={() => setIsOpen(true)}>
                                View here
                            </Button>
                        </CardFooter>

                        <div>
                            <button onClick={() => setIsOpen(false)}>
                                Close
                            </button>

                            <Box
                                id="dexscreener-embed"
                                opacity={isOpen ? 1 : 0}
                            >
                                <iframe
                                    title={`${pair.baseToken.symbol}-Chart`}
                                    src={`https://dexscreener.com/ethereum/${pair.pairAddress}?embed=1&trades=0&theme=light`}
                                ></iframe>
                            </Box>
                        </div>
                    </Card>
                ))}
            </SimpleGrid>
        </main>
    );
}
