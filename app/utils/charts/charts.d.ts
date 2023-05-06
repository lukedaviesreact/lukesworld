interface Pair {
    chainId: string;
    dexId: string;
    url: string;
    pairAddress: string;
    labels: [string];
    baseToken: {
        address: string;
        name: string;
        symbol: string;
    };
    quoteToken: {
        address: string;
        name: string;
        symbol: string;
    };
    priceNative: string;
    priceUsd: string;
    txns: {
        h24: {
            buys: number;
            sells: number;
        };
        h6: {
            buys: number;
            sells: number;
        };
        h1: {
            buys: number;
            sells: number;
        };
        m5: {
            buys: number;
            sells: number;
        };
    };
    volume: {
        h24: number;
        h6: number;
        h1: number;
        m5: number;
    };
    priceChange: {
        h24: number;
        h6: number;
        h1: number;
        m5: number;
    };
    liquidity: {
        usd: number;
        base: number;
        quote: number;
    };
    fdv: number;
    pairCreatedAt: number;
}

export interface Chart {
    schemaVersion: string;
    pairs: Pair[];
    pair: Pair;
}
