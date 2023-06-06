export interface TimelineData {
    id: number;
    employer: string;
    position: string;
    date: string;
    description: string;
    technologies: string[];
}

export const timelineData: TimelineData[] = [
    {
        id: 1,
        employer: 'WISR',
        position: 'Software Engineer (React)',
        date: '2022 - present',
        description: `As lead front end developer on the ATTRACT squad our objective is to improve customer conversion.
            During my time here, we utilise a modern stack of Typescript React, Redux and integrated CI/CD we increased user conversion by 25% on one of our main funnels. Adding to and updating the custom design system, utilising Story Book and a private distributed NPM package.`,
        technologies: [
            'React',
            'Typscript',
            'Gatsby',
            'Redux',
            'Mocha',
            'Enzyme',
            'Sinon',
            'Azure',
            'Amplitude',
        ],
    },
    {
        id: 2,
        employer: 'Seven West Media',
        position: 'Front End Developer',
        date: '2021 - 2022',
        description: `Utilising modern tools like react-query and chakraUI I led projects such as the Covid tracker which integrated into a 3rd party API. Part of this project including creating a backend service to pull and cache this data. We could then query our own endpoint keeping The West & Perth Now fast and responsive.`,
        technologies: [
            'React',
            'Typscript',
            'Emotion',
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
        description: `Working with a variety of clients, small and large, national and international I built a range of completely custom wordpress sites to suit the clients needs. Each design was custom built by our team of designers and passed on to the devs where nothing less than pixel perfect replication of the designs was accepted. Fast paced high intensity environment.`,
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
            'OKMG gave me the opportunity to work with a variety of nation and international clients. My main responsibilities included sitting in on client meetings as a technical spokesperson, collaborating with designers on UI and UX problems, coding and testing custom wordpress themes, maintaining and improving clients websites',
        technologies: ['css', 'wordpress', 'javascript', 'PHP', 'Gulp'],
    },
];
