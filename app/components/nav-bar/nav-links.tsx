import { Stack, Text } from '@chakra-ui/react';
import { Link } from '@remix-run/react';

export const NavLinks = ({ size }: { size?: 'sm' }) => {
    return (
        <Stack
            direction="row"
            spacing={20}
            fontSize={size ? 'small' : 'md'}
            alignSelf={['end']}
        >
            <Link to="/posts" prefetch="intent">
                <Text>Posts</Text>
            </Link>
            {/* <Link to="/image-generation" prefetch="intent">
                <Text>Generate AI Images</Text>
            </Link> */}
            <Link to="/#contact" prefetch="intent">
                <Text>Contact</Text>
            </Link>
        </Stack>
    );
};
