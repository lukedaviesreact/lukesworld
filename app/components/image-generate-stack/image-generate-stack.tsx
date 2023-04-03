import { VStack, Wrap, Image } from '@chakra-ui/react';

import { useMemo } from 'react';
import placeholderImg from '../../assets/images/placeholder.png';
import type { ImageResult, ImageResults } from '../forms/open-ai/open-ai';

export type SetSelectedImage = (
    value: React.SetStateAction<ImageResult | undefined>
) => void;

export interface ImageGenerateStackProps {
    imageResults: ImageResults;
    setSelectedImage: SetSelectedImage;
}

export const ImageGenerateStack = ({
    imageResults,
    setSelectedImage,
}: ImageGenerateStackProps) => {
    const images = useMemo(() => imageResults.reverse(), [imageResults]);
    return (
        <>
            <Wrap
                spacing={[2, 4, 4]}
                justify={'start'}
                shouldWrapChildren={true}
                maxHeight={['132px', '182px', '332px']}
                overflowY={images.length > 6 ? 'scroll' : 'hidden'}
            >
                {images.map((res, i) => {
                    return (
                        <VStack
                            maxW={['58px', '75px', '150px']}
                            key={`${res.prompt}-${i}`}
                            onClick={() => {
                                setSelectedImage({
                                    image: res.image,
                                    prompt: res.prompt,
                                });
                            }}
                        >
                            <Image
                                src={res.image}
                                alt="search-history"
                                height={'auto'}
                                shadow={'md'}
                                borderRadius={8}
                                fallbackSrc={placeholderImg}
                                pointerEvents="none"
                            />
                        </VStack>
                    );
                })}
            </Wrap>
        </>
    );
};
