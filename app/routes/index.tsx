import { Box, Heading, Img, Stack, Text } from '@chakra-ui/react';
import cssLogo from '../assets/logos/css.png';
import reactLogo from '../assets/logos/react.png';
import typescriptLogo from '../assets/logos/typescript.png';
import remixLogo from '../assets/logos/remix.png';
import nodeLogo from '../assets/logos/node.png';
import type { Post } from '@prisma/client';
import type { LoaderFunction, MetaFunction } from '@remix-run/node';
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
import { HomePageContactForm } from '~/components/forms/homepage-contact';

type LoaderData = {
    postList: Post[];
};

export const loader: LoaderFunction = async () => {
    const data = await getDbData({
        client: notion,
        dbId: process.env.NOTION_DATABASE_ID || '',
    });

    return json<LoaderData>({
        postList: data.posts,
    });
};

// export const action: ActionFunction = async ({ request }) => {
//     const formData = await request.formData();
//     const name = formData.get('name');
//     const number = formData.get('phone');
//     const message = formData.get('message');

//     // const sgMail = require('@sendgrid/mail');
//     // sgMail.setApiKey(process.env.SENDGRID_API_KEY);
//     // const msg = {
//     //     to: 'lukedaviesweb@gmail.com', // Change to your recipient
//     //     from: 'luke@lukedavies.dev', // Change to your verified sender
//     //     subject: 'Sending with SendGrid is Fun',
//     //     text: 'and easy to do anywhere, even with Node.js',
//     //     html: '<strong>and easy to do anywhere, even with Node.js</strong>',
//     // };
//     // sgMail
//     //     .send(msg)
//     //     .then(() => {
//     //         console.log('Email sent');
//     //     })
//     //     .catch((error: any) => {
//     //         console.error(error);
//     //     });

//     console.log({ name, number, message });

//     return json({});
// };

export const meta: MetaFunction = () => ({
    charset: 'utf-8',
    title: 'Luke Davies Dev 👋',
    description:
        'Javascript software engineer specialising in React Typescript',
    viewport: 'width=device-width,initial-scale=1',
});

export default function Index() {
    const { postList } = useLoaderData() as LoaderData;
    const logoArr = [cssLogo, reactLogo, typescriptLogo, remixLogo, nodeLogo];

    return (
        <main>
            <StyledHeadingWrap>
                <StyledHeadline>
                    <Box>
                        <Heading size="xl" as="h2" color="gray.700">
                            Hi, my name's Luke <span>👋</span>
                        </Heading>
                        <Heading
                            as="h1"
                            size="sm"
                            fontWeight={400}
                            color="gray.600"
                        >
                            I'm a software engineer, specialising in Javascript.
                        </Heading>
                        <SocialLinks />
                    </Box>
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
                subtext="Simple doesnt mean dumb"
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
                subtext="Clean. yeah, not simple. Clean"
            />
            {/* 
            <PageSection
                heading="Contact me directly"
                subheading="If you're not into the whole social media thing"
                child={<HomePageContactForm />}
                id="contact"
            /> */}
        </main>
    );
}
