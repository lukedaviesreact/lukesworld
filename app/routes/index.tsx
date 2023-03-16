import { Box, Heading, HStack, Img, Text, VStack } from '@chakra-ui/react';
import cssLogo from '../assets/logos/css.png';
import reactLogo from '../assets/logos/react.png';
import typescriptLogo from '../assets/logos/typescript.png';
import remixLogo from '../assets/logos/remix.png';
import nodeLogo from '../assets/logos/node.png';
import { Client } from '@notionhq/client';
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

type LoaderData = {
    postList: Post[];
};

export const loader: LoaderFunction = async () => {
    const NOTION_CLIENT = new Client({ auth: process.env.NOTION_KEY });

    const data = await getDbData({
        client: NOTION_CLIENT,
        dbId: process.env.NOTION_DATABASE_ID || '',
    });

    return json<LoaderData>({
        postList: data.posts,
    });
};

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
                    <HStack align="start">
                        {postList?.slice(0, 3).map((post) => {
                            if (!post.title || !post.id) {
                                return <li>Invalid Post</li>;
                            }
                            return <PostCard key={post.id} post={post} />;
                        })}
                    </HStack>
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
                    <HStack align="start" gap={2} justifyContent="space-around">
                        {logoArr.map((logo, i) => (
                            <Img key={i} src={logo} width={'120px'} />
                        ))}
                    </HStack>
                }
                subtext="Clean. yeah, not simple. Clean"
            />

            <PageSection
                heading="Links and socials"
                subheading="Not really sure what to put here. Add me on LinkedIn?
                Like and Subscribe? 🤷‍♂️"
                child={
                    <VStack align="start">
                        <Box>Socials </Box>
                    </VStack>
                }
                subtext="I like to keep things clean"
            />
        </main>
    );
}
