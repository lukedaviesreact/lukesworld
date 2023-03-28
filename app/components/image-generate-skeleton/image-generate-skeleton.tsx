import { Skeleton, SkeletonText, VStack } from '@chakra-ui/react';

export const ImageGenerateSkeleton = () => {
    return (
        <VStack
            mt={8}
            display={'flex'}
            justifyContent={'center'}
            flexDir={'column'}
            alignItems={'center'}
            spacing={4}
            maxWidth={'516px'}
            margin={'0 auto'}
        >
            <SkeletonText
                alignSelf={'stretch'}
                opacity={'0.5'}
                fadeDuration={1}
                height={'20px'}
                mb={4}
            />
            <Skeleton
                alignSelf={'stretch'}
                height={'500px'}
                margin={'0 auto'}
                borderRadius={8}
            />
        </VStack>
    );
};
