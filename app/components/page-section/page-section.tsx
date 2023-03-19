import { Text, Button } from '@chakra-ui/react';
import { Link } from '@remix-run/react';

import {
    StyledButtonWrap,
    StyledHeading,
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
                <StyledHeading as="h2" size="lg" color="gray.700">
                    {heading}
                </StyledHeading>
                {subheading ? (
                    <Text fontSize={'sm'} color="gray.600">
                        {subheading}
                    </Text>
                ) : null}
            </StyledHeadingWrap>

            {child}

            {buttonLink && buttonLabel && (
                <StyledButtonWrap>
                    <Link to={buttonLink} prefetch="intent">
                        <Button colorScheme={'purple'}>There's more</Button>
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
