import { Box, Flex, Heading, Text, theme } from '@chakra-ui/react';

import type { Post } from '@prisma/client';
import type {
    ActionFunction,
    LoaderFunction,
    MetaFunction,
} from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { PageSection } from '~/components/page-section/page-section';
import { getDbData } from '~/utils/posts';
import {
    StyledHeadingWrap,
    StyledHeadline,
    StyledSubline,
} from './home.styled';
import { SocialLinks } from '~/components/social-links/social-links';
import { notion } from '~/db.server';
import { HomePageContactForm } from '~/components/forms/homepage-contact/homepage-contact';

import AIimage from '../assets/images/AI-space.png';
import AIimage_two from '../assets/images/AI-space-2.png';
import AIimage_three from '../assets/images/AI-space-3.png';

import timelineStyles from 'react-vertical-timeline-component/style.min.css';
import { getProjects } from '../utils/projects/getProjects';
import { GithubProjects } from '../components/github-projects/github-projects';
import type { GithubProjectsData } from '../components/github-projects/github-projects.d';
import { useState } from 'react';
import { TimelineComponent } from '../components/timeline/timeline';
import { PostGrid } from '../components/post-grid/post-grid';
import { ImageStack } from '../components/image-stack/image-stack';
import styled from '@emotion/styled';

export function links() {
    return [{ rel: 'stylesheet', href: timelineStyles }];
}

export type LoaderData = {
    postList: Post[];
    projects: GithubProjectsData[];
    formSuccess: boolean;
};

export const loader: LoaderFunction = async ({ request }) => {
    const url = new URL(request.url);
    const success = url.searchParams.get('success');

    const postData = getDbData({
        client: notion,
        dbId: process.env.NOTION_DATABASE_ID || '',
    });

    const githubProjects = getProjects();

    const allData = await Promise.all([postData, githubProjects]);

    return json<LoaderData>({
        postList: allData[0].posts,
        projects: allData[1],
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
        'Javascript software engineer specialising in React Typescript',
    viewport: 'width=device-width,initial-scale=1',
});

export default function Index() {
    const { postList, projects } = useLoaderData() as LoaderData;
    const aiImgArr = [AIimage, AIimage_two, AIimage_three];
    const [showMoreProjects, setshowMoreProjects] = useState(false);

    return (
        <main>
            <StyledHeadingWrap>
                <StyledHeadline>
                    <Box>
                        <Heading
                            as="h1"
                            color={'gray.700'}
                            fontSize={['4xl', '6xl']}
                            lineHeight={['2.5rem', '4rem']}
                        >
                            Driving Digital <span>Transformation</span>
                        </Heading>
                    </Box>
                    <SocialLinks isHeader={true} />
                </StyledHeadline>

                <StyledSubline>
                    <Text fontSize={'xs'}>
                        Building technical solutions to business problems
                    </Text>
                </StyledSubline>
            </StyledHeadingWrap>

            <PageSection
                heading="Latest Posts"
                subheading="It's mostly a tech blog. I like to document about new
                things I've learnt so I've got reference later, you can
                check it out too"
                child={<PostGrid postList={postList} />}
                buttonLabel="There's more"
                buttonLink="/posts"
                subtext="Check out my experience below"
            />

            <TimelineComponent />

            {/* <PageSection
                heading="OpenAI's image generation"
                subheading="Honestly, I needed a quick way to generate pictures of a spaceman cowboy riding an elephant. I also wanted to play with the API. So here we are."
                child={<ImageStack images={aiImgArr} />}
                buttonLabel="Have a go"
                buttonLink="/image-generation"
                subtext="it's 2023"
            /> */}

            {/* <PageSection/>
                heading="Github"
                subheading="Quick view of my github repos - needs a clean up"
                child={
                    <GithubProjects
                        projects={projects}
                        showMoreProjects={showMoreProjects}
                    />
                }
                buttonLabel={showMoreProjects ? 'Hide some' : 'Show more'}
                buttonCallback={() => setshowMoreProjects(!showMoreProjects)}
                subtext="Let's build something together 🥳"
            /> */}

            {/* <PageSection
                heading="Tech tools 🔨"
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
            /> */}

            <PageSection
                id="contact"
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
                        ></Box>
                    </Flex>
                }
            />
        </main>
    );
}
