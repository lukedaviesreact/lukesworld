import { Box, Img, Stack, theme } from '@chakra-ui/react';

interface ImageStackArgs {
    images: string[];
}

export const ImageStack = ({ images }: ImageStackArgs) => {
    return (
        <Stack direction={'row'} spacing={4}>
            {images.map((image, i) => (
                <Box
                    key={`aiImg-${i}`}
                    display={[
                        `${i >= 1 ? 'none' : 'inline-block'}`,
                        `${i >= 1 ? 'none' : 'inline-block'}`,
                        'inline-block',
                    ]}
                >
                    <Img
                        key={i}
                        src={image}
                        loading="lazy"
                        alt={'Ai generated images'}
                        borderRadius={0}
                        boxShadow={`6px 6px ${theme.colors.gray[900]}`}
                        filter="hue-rotate(45deg)"
                    />
                </Box>
            ))}
        </Stack>
    );
};
