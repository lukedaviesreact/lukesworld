import { Text, Button } from '@chakra-ui/react';

import {
    StyledButtonWrap,
    StyledHeading,
    StyledHeadingWrap,
    StyledLatestPostsWrap,
    StyledSubline,
} from './page-section.styled';

interface PageSectionProps {
    heading: string;
    subheading: string;
    child: JSX.Element;
    subtext: string;
    buttonLink?: string;
    buttonLabel?: string;
}

export const PageSection = ({
    heading,
    subheading,
    child,
    subtext,
    buttonLink,
    buttonLabel,
}: PageSectionProps) => {
    return (
        <StyledLatestPostsWrap>
            <StyledHeadingWrap>
                <StyledHeading as="h2" size="lg" color="gray.700">
                    {heading}
                </StyledHeading>
                <Text fontSize={'sm'} color="gray.600">
                    {subheading}
                </Text>
            </StyledHeadingWrap>

            {child}

            {buttonLink && buttonLabel && (
                <StyledButtonWrap>
                    <Button colorScheme={'gray'}>There's more</Button>
                </StyledButtonWrap>
            )}
            <StyledSubline>
                <Text fontSize={'xs'}>{subtext}</Text>
            </StyledSubline>
        </StyledLatestPostsWrap>
    );
};
