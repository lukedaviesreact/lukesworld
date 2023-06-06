import { Badge, Box, Text, VisuallyHidden } from '@chakra-ui/react';
import { useState } from 'react';
import { StyledHeading } from '../styled-heading/styled-heading';
import type { TimelineData } from '../timeline/timeline.constants';
import { StyledIconWrap, StyledTimelineCard } from './timeline-card.styled';
import { GrExpand } from 'react-icons/gr';
import { MdCloseFullscreen } from 'react-icons/md';

export const TimelineCard = ({ data }: { data: TimelineData }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <StyledTimelineCard
            onClick={() => setIsOpen((prev) => !prev)}
            isopen={isOpen ? 'true' : 'false'}
        >
            <VisuallyHidden>Work experience, click to expand</VisuallyHidden>
            <StyledIconWrap>
                {isOpen ? <MdCloseFullscreen /> : <GrExpand />}
            </StyledIconWrap>

            <div>
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
            </div>

            <div>
                <Text fontSize="sm" color="gray.600">
                    {data?.description}
                </Text>
            </div>

            <div>
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
            </div>
        </StyledTimelineCard>
    );
};
