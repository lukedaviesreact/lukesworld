import { Box, Img, Text } from '@chakra-ui/react';
import { ImageResult } from '../forms/open-ai/open-ai';

interface ImageGenerateResultProps {
    selectedImage?: ImageResult;
    prompt: string | null;
    resultImage?: string;
}

export const ImageGenerateResult = ({
    selectedImage,
    resultImage,
    prompt,
}: ImageGenerateResultProps) => {
    return (
        <Box
            mt={8}
            display={'flex'}
            justifyContent={'center'}
            flexDir={'column'}
            alignItems={'center'}
        >
            <Text
                fontSize={'sm'}
                color="gray.600"
                maxW={['100%', '100%', '90%']}
                fontStyle="italic"
                mb={2}
            >
                <>
                    {selectedImage && selectedImage.prompt}
                    {!selectedImage && prompt}
                </>
            </Text>
            {selectedImage ? (
                <Img
                    src={selectedImage.image}
                    alt="image-generation-result"
                    width={['auto', 'auto', '516px']}
                    height={['auto', 'auto', '516px']}
                    margin={'0 auto'}
                    shadow={'md'}
                    borderRadius={8}
                />
            ) : resultImage ? (
                <Img
                    src={resultImage}
                    alt="image-generation-result"
                    width={['auto', 'auto', '516px']}
                    height={['auto', 'auto', '516px']}
                    margin={'0 auto'}
                    shadow={'md'}
                    borderRadius={8}
                />
            ) : null}
        </Box>
    );
};
