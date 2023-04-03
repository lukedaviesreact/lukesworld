import { Badge, Box, Text, theme } from '@chakra-ui/react';
import styled from '@emotion/styled';
import {
    VerticalTimeline,
    VerticalTimelineElement,
} from 'react-vertical-timeline-component';
import { StyledHeading } from '../styled-heading/styled-heading';

export const ExperienceComponent = () => {
    const experience = [
        {
            id: 1,
            employer: 'WISR',
            position: 'Software Engineer (React)',
            date: '2022 - present',
            description:
                'My role is highly focused on improving customer retention and conversion, our team ownes the customer facing applications and used data to drive our quarterly OCRs. Working closely with our stakeholders, designers and data team we using Typescript React in combination with a 100% test coverage approach to ensure a consistent user experience.',
            technologies: [
                'React',
                'Typscript',
                'Gatsby',
                'Redux',
                'Mocha',
                'Azure',
                'Amplitude',
            ],
        },
        {
            id: 2,
            employer: 'Seven West Media',
            position: 'Front End Developer',
            startDate: new Date('03-01-2021'),
            date: '2021 - 2022',
            description:
                'Working with a modern tech stack that services up to 1.45 million unique users a day delivering news to Australians (including The West, PerthNow, 7NEWS, The Game, Community News including 18 regional sites) and associated internal tools and products all written in TypeScript and deployed to numerous AWS services including API Gateway, Lambda, DynamoDB, SQS/SNS, ECS using infrastructure as code (Pulumi)',
            technologies: [
                'React',
                'Typscript',
                'Emotion.js',
                'nx monorepo',
                'React Query',
                'Jest',
                'Docker',
                'Node',
                'Pulumi',
                'AWS',
            ],
        },
        {
            id: 3,
            employer: 'Juicebox Creative',
            position: 'Web Developer',
            date: '2019 - 2021',
            description:
                " While working at Juicebox my soft and technical skills improved tremendously. With an award winning team we developed some beautiful websites which I'm proud of.",
            technologies: [
                'wordpress',
                'javascript',

                'webpack',
                'PHP',
                'twig',
                'composer',
                'greensock',
                'circleCI',
            ],
        },
        {
            id: 4,
            employer: 'OKMG',
            position: 'Web Developer',
            date: '2018 - 2019',
            description:
                'My first real industry job at OKMG was a great experience, thrown into the deep end I had to quickly improve my front end skills while working with a variety of nation and international clients. My main responsibilities included sitting in on client meetings as a technical spokesperson, collaborating with designers on UI and UX problems, coding and testing custom wordpress themes, maintaining and improving clients websites',
            technologies: ['css', 'wordpress', 'javascript', 'PHP', 'Gulp'],
        },
        {
            id: 5,
            employer: 'Freelance',
            position: 'Web Developer',
            date: '2017 - 2018',
            description:
                'For a year and a half after completeing Codemasters Fullstack Bootcamp I worked as a freelance web developer on anything I could. This mostly included building custom Wordpress themes and sorting out the clients domain, email, hosting and SSL certs ',
            technologies: ['HTML', 'CSS', 'vanilla js', 'Wordpress', 'PHP'],
        },
    ];

    const StyledExperienceWrap = styled(Box)({
        '--line-color': '#E2E8F0',
        p: {
            fontSize: theme.fontSizes.sm,
        },
        '.vertical-timeline': {
            width: '100%',
            padding: '3rem 0',
        },
        '.vertical-timeline-element': {
            '@media (min-width: 1170px)': {
                margin: `${theme.space[8]} 0`,
            },
        },

        '.vertical-timeline-element-content p': {
            fontWeight: 'unset',
        },

        '.vertical-timeline--two-columns .vertical-timeline-element-content .vertical-timeline-element-date':
            {
                '@media (min-width: 1170px)': {
                    fontSize: theme.fontSizes.lg,
                    color: theme.colors.gray[700],
                    opacity: 1,
                },
            },
        '.vertical-timeline-element-icon': {
            marginLeft: '15px',
            top: '18px',
            background: '#805AD5',
            color: '#805AD5',
            height: '10px',
            width: '10px',
            '@media (min-width: 1170px)': {
                marginLeft: '-5px',
                top: '25px',
            },
        },
    });
    return (
        <StyledExperienceWrap
            borderBottom={`1px solid ${theme.colors.gray[100]}`}
        >
            {/* <StyledHeading>Experience</StyledHeading> */}
            <VerticalTimeline>
                {experience.map((data) => (
                    <VerticalTimelineElement
                        className="vertical-timeline-element--work"
                        contentArrowStyle={{
                            borderRight: '7px solid  #e1e6ea',
                        }}
                        date={data.date}
                        key={data.id}
                        contentStyle={{
                            boxShadow:
                                '0 1px 3px 0 rgba(0, 0, 0, 0.1),0 1px 2px 0 rgba(0, 0, 0, 0.06)',
                            borderRadius: '0.375rem',
                        }}
                    >
                        <Box>
                            <StyledHeading
                                type="h3"
                                size="sm"
                                content={data.position}
                                color="dark"
                            />
                            <StyledHeading
                                type="h6"
                                size="xs"
                                content={data.employer}
                                color="light"
                            />

                            <Text fontSize="sm" color="gray.600">
                                {data?.description}
                            </Text>
                            <Box mt={2}>
                                {data.technologies?.map((data, i) => (
                                    <Badge
                                        colorScheme="gray"
                                        variant="subtle"
                                        mr={2}
                                        key={i}
                                    >
                                        {data}
                                    </Badge>
                                ))}
                            </Box>
                        </Box>
                    </VerticalTimelineElement>
                ))}
            </VerticalTimeline>
        </StyledExperienceWrap>
    );
};
