import { Text, Button, Box } from '@chakra-ui/react';
import { Link } from '@remix-run/react';
import { motion } from 'framer-motion';
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
}

export const PageSection = ({
    heading,
    subheading,
    child,
    subtext,
    id,
    buttonLink,
    buttonLabel,
}: PageSectionProps) => {
    return (
        <StyledPageSectionWrap id={id ? id : ''}>
            <StyledHeadingWrap>
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

            {child}

            {buttonLink && buttonLabel && (
                <StyledButtonWrap>
                    <Link to={buttonLink} prefetch="intent">
                        <Button
                            as={motion.button}
                            whileTap={{ scale: 0.95 }}
                            colorScheme={'purple'}
                        >
                            There's more
                        </Button>
                    </Link>
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
