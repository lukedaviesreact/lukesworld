import { Box, Flex, Img, Stack, Text } from '@chakra-ui/react';
import cssLogo from '../assets/logos/css.png';
import reactLogo from '../assets/logos/react.png';
import typescriptLogo from '../assets/logos/typescript.png';
import remixLogo from '../assets/logos/remix.png';
import nodeLogo from '../assets/logos/node.png';
import type { Post } from '@prisma/client';
import {
    ActionFunction,
    LoaderFunction,
    MetaFunction,
    redirect,
} from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { PageSection } from '~/components/page-section/page-section';
import { PostCard } from '~/components/post-card/post-card';
import { getDbData } from '~/utils/posts';
import {
    StyledHeadingWrap,
    StyledHeadline,
    StyledSubline,
} from './home.styled';
import { SocialLinks } from '~/components/social-links/social-links';
import { notion } from '~/db.server';
import { HomePageContactForm } from '~/components/forms/homepage-contact/homepage-contact';
import { StyledHeading } from '~/components/styled-heading/styled-heading';

import AIimage from '../assets/images/AI-space.png';
import AIimage_two from '../assets/images/AI-space-2.png';
import AIimage_three from '../assets/images/AI-space-3.png';

export type LoaderData = {
    postList: Post[];
    formSuccess: boolean;
};

export const loader: LoaderFunction = async ({ request }) => {
    const url = new URL(request.url);
    const success = url.searchParams.get('success');

    const data = await getDbData({
        client: notion,
        dbId: process.env.NOTION_DATABASE_ID || '',
    });

    return json<LoaderData>({
        postList: data.posts,
        formSuccess: success === 'true',
    });
};

export const action: ActionFunction = async ({ request }) => {
    const sgMail = require('@sendgrid/mail');

    const formData = await request.formData();
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const message = formData.get('message');

    const formErrors = {
        name: name ? null : 'Name is required',
        email: name ? null : 'Email is required',
        phone: name ? null : 'Phone number is required',
        message: name ? null : 'Message is required',
    };

    const hasFormErrors = Object.values(formErrors).some(
        (errorMessage) => errorMessage
    );

    if (hasFormErrors) {
        return json({ error: 'Form was not filled out correctly' });
    }

    const msg = {
        to: 'lukedaviesweb@gmail.com', // Change to your recipient
        from: 'luke@lukedavies.dev', // Change to your verified sender
        subject: "lukedavies.dev - somebody's sent you a message",
        text: `
            Name: ${name}
            Email: ${email}
            Number: ${phone},
            Message: ${message}
        `,
        html: `
        <h1>You got mail!</h1>

        <span>Name: <b>${name}</b></span></br>
        <span>Email: <b>${email}</b></span></br>
        <span>Number: <b>${phone}</b></span></br>
        <span>Message: <b>${message}</b></span></br>

        <p>Remember to reply!</p>
    `,
    };

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    try {
        await sgMail.send(msg);
        return redirect(`/?index&success=true#contact`);
    } catch (error) {
        console.error(error);
        return json({
            error: 'Something went wrong sending that email, please try again',
        });
    }
};

export const meta: MetaFunction = () => ({
    charset: 'utf-8',
    title: 'Luke Davies Dev 👋',
    description:
        'Javascript software engineer specialising in React Typescript.',
    viewport: 'width=device-width,initial-scale=1',
});

export default function Index() {
    const { postList } = useLoaderData() as LoaderData;
    const logoArr = [reactLogo, typescriptLogo, remixLogo, cssLogo, nodeLogo];
    const aiImgArr = [AIimage, AIimage_two, AIimage_three];

    return (
        <main>
            <StyledHeadingWrap>
                <StyledHeadline>
                    <Box flex={'1'}>
                        <StyledHeading
                            type="h2"
                            size="xl"
                            content={
                                <>
                                    Hi, my name's Luke <span>👋</span>
                                </>
                            }
                            color="dark"
                        />
                        <StyledHeading
                            type="h1"
                            size="sm"
                            weight={400}
                            content="I'm a software engineer, specialising in Javascript."
                            color="light"
                        />
                        <SocialLinks />
                    </Box>
                    {/* <Box flex={'1'}>
                        <Circles />
                    </Box> */}
                </StyledHeadline>

                <StyledSubline>
                    <Text fontSize={'xs'}>I like to keep things simple</Text>
                </StyledSubline>
            </StyledHeadingWrap>

            <PageSection
                heading="Latest Posts"
                subheading="It's mostly a tech blog. I like to document about new
                things I've learnt so I've got reference later, you can
                check it out too"
                child={
                    <Stack direction={['column', 'row']} spacing={4}>
                        {postList?.slice(0, 3).map((post) => {
                            if (!post.title || !post.id) {
                                return <li key="invalid-post">Invalid Post</li>;
                            }
                            return (
                                <PostCard
                                    key={post.id}
                                    post={post}
                                    variation="lg"
                                />
                            );
                        })}
                    </Stack>
                }
                buttonLabel="There's more"
                buttonLink="/posts"
                subtext="I should've started writing stuff down ages ago"
            />

            <PageSection
                heading="OpenAI's image generation"
                subheading="Honestly, i needed a quick way to generate pictures of a spaceman cowboy riding an elephant. I also wanted to play with the API. So here we are."
                child={
                    <Stack direction={['column', 'row']} spacing={4}>
                        {aiImgArr.map((aiImg, i) => (
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
                                    src={aiImg}
                                    loading="lazy"
                                    alt={'Ai generated images'}
                                    borderRadius={8}
                                    boxShadow={'md'}
                                />
                            </Box>
                        ))}
                    </Stack>
                }
                buttonLabel="Have a go"
                buttonLink="/image-generation"
                subtext="it's 2023"
            />

            <PageSection
                heading="Tech tools 🔨"
                subheading="Everything front end, if you can see it on a website i
                can do it or figure it out. Right now I'm usually
                building with React TypeScript."
                child={
                    <Stack
                        direction={['row']}
                        flexWrap="wrap"
                        justifyContent="space-around"
                        align="start"
                        spacing={4}
                    >
                        {logoArr.map((logo, i) => (
                            <Box
                                width={['120px', '90px', '90px']}
                                height={['120px', '90px', '90px']}
                                key={`logo-${i}`}
                            >
                                <Img
                                    key={i}
                                    src={logo}
                                    htmlWidth={'90px'}
                                    mb={['1rem', '0', '0']}
                                    htmlHeight={'90px'}
                                    loading="lazy"
                                    alt={'logos of technologies i use'}
                                />
                            </Box>
                        ))}
                    </Stack>
                }
                subtext="✨"
                buttonLabel="Download Resume"
                buttonLink="/luke-davies-front-end-engineer-resume.pdf"
                buttonDownload={true}
            />

            <PageSection
                heading="Contact me directly"
                subheading="Im always down to hear about exiting new projects, hit me up"
                child={
                    <Flex>
                        <Box flex={1}>
                            <HomePageContactForm />
                        </Box>
                        <Box
                            flex={1}
                            display={['none', 'none', 'flex']}
                            justifyContent={'center'}
                            alignItems={'center'}
                        >
                            <Text fontSize={'sm'} color={'gray.600'} mb={10}>
                                ~ Insert AI generated image here ~
                            </Text>
                        </Box>
                    </Flex>
                }
                id="contact"
            />
        </main>
    );
}
