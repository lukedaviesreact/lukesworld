import { Badge, Box, Text, theme } from '@chakra-ui/react';
import {
    VerticalTimeline,
    VerticalTimelineElement,
} from 'react-vertical-timeline-component';
import { Curves } from '../curves/curves';
import { StyledHeading } from '../styled-heading/styled-heading';
import { experienceData } from './experience.constants';
import { StyledExperienceWrap } from './experience.styled';

export const ExperienceComponent = () => {
    return (
        <StyledExperienceWrap
            id="experience"
            borderBottom={`1px solid ${theme.colors.gray[100]}`}
        >
            <Curves wavePos="top" />
            <VerticalTimeline>
                {experienceData.map((data) => (
                    <VerticalTimelineElement
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
            <Curves wavePos="bottom" />
        </StyledExperienceWrap>
    );
};
