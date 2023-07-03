import {
    Box,
    Flex,
    GridItem,
    Heading,
    SimpleGrid,
    Text,
} from '@chakra-ui/react';
import type {
    ActionFunction,
    LoaderFunction,
    MetaFunction,
} from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { json } from '@remix-run/node';
import { SocialLinks } from '../components/social-links/social-links';
import {
    StyledHeadingWrap,
    StyledHeadline,
    StyledSubline,
} from './home.styled';

import { PageSection } from '../components/page-section/page-section';
import { AccordionComponent } from '../components/accordion/accordion';
import { HomePageContactForm } from '../components/forms/homepage-contact/homepage-contact';
import { ReviewCard } from '../components/review-card/review-card';
import { useServicesData } from '../hooks/useServicesData';
import { motion } from 'framer-motion';
import { container, item } from '../style/animation';
import { Link } from '@remix-run/react';
import { HighlightSection } from '../components/highlight-section/highlight-section';

export type LoaderData = {
    formSuccess: boolean;
};

export const loader: LoaderFunction = async ({ request }) => {
    const url = new URL(request.url);
    const success = url.searchParams.get('success');

    return json<LoaderData>({
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
        <h1>You got business mail!</h1>

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
        return redirect(`/services?success=true#contact`);
    } catch (error) {
        console.error(error);
        return json({
            error: 'Something went wrong sending that email, please try again',
        });
    }
};

export const meta: MetaFunction<typeof loader> = () => ({
    charset: 'utf-8',
    title: 'Services | Luke Davies Dev',
    description:
        'Empowering Businesses through Software Development. Responsive Web Design | E-commerce Development | Custom Web Application Development | Mobile App Development | UI/UX Design | API Development and Inegration | SEO | Performance Optimisation | Security and Data Protection ',
    viewport: 'width=device-width,initial-scale=1',
});

export default function ServicesRoute() {
    const { reviews, services, highlightedServices } = useServicesData();

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
                            Powering Your Digital Journey
                        </Heading>
                    </Box>

                    <SocialLinks isHeader={true} />
                </StyledHeadline>

                <StyledSubline>
                    <Text fontSize={'xs'}>
                        Empowering Businesses through Software Development
                    </Text>
                </StyledSubline>
            </StyledHeadingWrap>
            <PageSection
                heading="Exceptional digital solutions"
                child={
                    <p>
                        As a{' '}
                        <b>
                            passionate and experienced web and software
                            developer{' '}
                        </b>
                        with five years in the field, I offer a range of
                        in-demand services{' '}
                        <b>tailored to meet your unique needs.</b>
                        Having worked across multiple industries, I bring a
                        <b> fresh perspective and a deep understanding</b> of
                        diverse business requirements. Whether you're a startup,
                        a small business, or an established enterprise, I have
                        the expertise to{' '}
                        <b>
                            transform your ideas into exceptional digital
                            solutions.
                        </b>
                    </p>
                }
                subtext=""
            />

            <Box mt={16}>
                <HighlightSection highlightedService={highlightedServices[0]} />
                <HighlightSection highlightedService={highlightedServices[1]} />
            </Box>

            <PageSection
                heading="All Services"
                subheading=""
                child={<AccordionComponent content={services} />}
                subtext="Let's work together "
            />

            <PageSection
                heading="Reviews"
                subheading=""
                child={
                    <SimpleGrid
                        as={motion.div}
                        gridTemplateColumns="repeat(6, 1fr)"
                        gridRowGap={4}
                        gridColumnGap={4}
                        variants={container}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {reviews.map((review) => {
                            return (
                                <GridItem
                                    as={motion.div}
                                    colSpan={{
                                        base: 6,
                                        md: 3,
                                        lg: 2,
                                        xl: 2,
                                    }}
                                    key={review.id}
                                    h="100%"
                                    variants={item}
                                >
                                    <ReviewCard
                                        key={review.id}
                                        review={review}
                                    />
                                </GridItem>
                            );
                        })}
                    </SimpleGrid>
                }
                subtext=""
            />

            <PageSection
                id="contact"
                heading="Contact me directly"
                subheading="  Ready to embark on a transformative journey?
                Contact me today to discuss your project
                requirements and let's create something
                exceptional together!"
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
