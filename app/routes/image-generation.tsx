import { Box, Divider, Text } from '@chakra-ui/react';
import { ActionFunction, json, MetaFunction, redirect } from '@remix-run/node';
import { useLoaderData, useTransition } from '@remix-run/react';
import { Configuration, OpenAIApi } from 'openai';
import { useEffect, useState } from 'react';
import type { LoaderFunction } from 'react-router';
import {
    ImageResult,
    ImageResults,
    OpenAIForm,
} from '~/components/forms/open-ai/open-ai';
import { ImageGenerateResult } from '~/components/image-generate-result/image-generate-result';
import { ImageGenerateSkeleton } from '~/components/image-generate-skeleton/image-generate-skeleton';
import { ImageGenerateStack } from '~/components/image-generate-stack/image-generate-stack';
import { StyledHeading } from '~/components/styled-heading/styled-heading';

export type LoaderData = ImageResult;

export const loader: LoaderFunction = async ({ request }) => {
    const url = new URL(request.url);
    const prompt = url.searchParams.get('prompt');
    if (!prompt)
        return json<LoaderData>({
            prompt: '',
            image: '',
        });

    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);
    let response;

    try {
        response = await openai.createImage({
            prompt: prompt,
            n: 1,
            size: '512x512',
        });
    } catch (error: any) {
        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
        } else {
            console.log(error.message);
        }
    }
    return json<LoaderData>({
        prompt: prompt,
        image: (response && response.data.data[0].url) || '',
    });
};

export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
    const prompt = formData.get('prompt');

    const formErrors = {
        prompt: prompt ? null : 'Prompt is required',
    };

    const hasFormErrors = Object.values(formErrors).some(
        (errorMessage) => errorMessage
    );

    if (hasFormErrors) {
        return json({ error: 'Form was not filled out correctly' });
    }

    return redirect(`/image-generation?prompt=${prompt}`);
};

export const meta: MetaFunction = () => ({
    charset: 'utf-8',
    title: 'Image Generation with OpenAI | Luke Davies Dev',
    description: 'OpenAI image generation on lukedavies.dev',
    viewport: 'width=device-width,initial-scale=1',
});

export default function ImageGenerationRoute() {
    const { image, prompt } = useLoaderData() as LoaderData;
    const transition = useTransition();
    const [imageResults, setImageResults] = useState<ImageResults>([]);
    const [selectedImage, setSelectedImage] = useState<ImageResult>();

    useEffect(() => {
        const storedImageResults =
            window.sessionStorage.getItem('image-results');

        if (storedImageResults) {
            const parsedStoredResults = JSON.parse(storedImageResults);
            const imageSet = new Set(parsedStoredResults);
            if (image) {
                imageSet.add({
                    prompt,
                    image,
                });
            }

            const imageArr = Array.from(imageSet);
            sessionStorage.setItem('image-results', JSON.stringify(imageArr));
            //@ts-ignore
            setImageResults(imageArr);
            if (image && prompt) {
                setSelectedImage({
                    image,
                    prompt,
                });
            }
        } else {
            if (image) {
                window.sessionStorage.setItem(
                    'image-results',
                    JSON.stringify([
                        {
                            prompt,
                            image,
                        },
                    ])
                );

                setSelectedImage({
                    image,
                    prompt,
                });
            }
        }
    }, [image, prompt]);

    const maxAttemptsReached = imageResults.length >= 12;
    const moreThanOneSearch = imageResults.length > 1;
    const inTransitionState =
        transition.state === 'submitting' || transition.state === 'loading';

    const transitioningToImage =
        transition.location &&
        transition.location.pathname === '/image-generation';

    return (
        <main>
            <Box minH={'calc(100vh - 230px)'}>
                <Box mb={2} mt={4}>
                    <StyledHeading
                        type="h1"
                        size="xl"
                        color="dark"
                        content="Open AI Image Generation"
                    />
                </Box>

                <Text
                    fontSize={'sm'}
                    color="gray.600"
                    maxW={['100%', '100%', '90%']}
                >
                    {maxAttemptsReached
                        ? "Ok, you've had your fun, save some for everyone else this api aint free!"
                        : 'Type in a prompt and get a 512x512 image generated by OpenAI, because why not.'}
                </Text>

                {!maxAttemptsReached && (
                    <OpenAIForm
                        setImageResults={setImageResults}
                        imageResults={imageResults}
                    />
                )}

                {moreThanOneSearch && (
                    <>
                        <Divider mt={6} mb={4} />
                        <Box>
                            <Box mb={4}>
                                <StyledHeading
                                    type="h3"
                                    size="md"
                                    color="dark"
                                    content="Previous results"
                                />
                            </Box>

                            <ImageGenerateStack
                                imageResults={imageResults}
                                setSelectedImage={setSelectedImage}
                            />
                        </Box>
                        <Divider mt={4} mb={4} />
                    </>
                )}

                {inTransitionState && transitioningToImage ? (
                    <ImageGenerateSkeleton />
                ) : (
                    <ImageGenerateResult
                        selectedImage={selectedImage}
                        prompt={prompt}
                    />
                )}
            </Box>
        </main>
    );
}
