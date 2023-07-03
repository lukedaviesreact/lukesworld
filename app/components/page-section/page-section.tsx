import { Text, Button, Box } from '@chakra-ui/react';
import { Link } from '@remix-run/react';
import { motion } from 'framer-motion';
import { item } from '../../style/animation';
import { StyledHeading } from '../styled-heading/styled-heading';

import {
    StyledButtonWrap,
    StyledHeadingWrap,
    StyledPageSectionWrap,
    StyledSubline,
} from './page-section.styled';

interface PageSectionProps {
    heading: string;
    subheading?: string;
    child: JSX.Element;
    subtext?: string;
    id?: string;
    buttonLink?: string;
    buttonLabel?: string;
    buttonCallback?: () => void;
}

export const PageSection = ({
    heading,
    subheading,
    child,
    subtext,
    id,
    buttonLink,
    buttonLabel,
    buttonCallback,
}: PageSectionProps) => {
    const container = {
        hidden: { opacity: 0, y: '15px' },
        visible: {
            opacity: 1,
            y: '0px',
        },
    };

    return (
        <StyledPageSectionWrap id={id ? id : ''}>
            <StyledHeadingWrap
                as={motion.div}
                variants={container}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                <Box mb={2}>
                    <StyledHeading
                        type="h2"
                        size="lg"
                        content={heading}
                        color="dark"
                    />
                </Box>

                {subheading ? (
                    <Text
                        fontSize={'sm'}
                        color="gray.600"
                        maxW={['100%', '100%', '90%']}
                    >
                        {subheading}
                    </Text>
                ) : null}
            </StyledHeadingWrap>
            <Box
                as={motion.div}
                variants={container}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                {child}
            </Box>

            {buttonLink && buttonLabel && !buttonCallback && (
                <StyledButtonWrap>
                    <Link to={buttonLink} prefetch="intent">
                        <Button
                            as={motion.button}
                            whileTap={{ scale: 0.95 }}
                            colorScheme={'purple'}
                        >
                            {buttonLabel}
                        </Button>
                    </Link>
                </StyledButtonWrap>
            )}

            {buttonCallback && (
                <StyledButtonWrap>
                    <Button
                        as={motion.button}
                        whileTap={{ scale: 0.9 }}
                        colorScheme={'purple'}
                        onClick={buttonCallback}
                    >
                        {buttonLabel}
                    </Button>
                </StyledButtonWrap>
            )}

            {subtext && (
                <StyledSubline>
                    <Text fontSize={'xs'}>{subtext}</Text>
                </StyledSubline>
            )}
        </StyledPageSectionWrap>
    );
};
