import { theme } from '@chakra-ui/react';
import {
    VerticalTimeline,
    VerticalTimelineElement,
} from 'react-vertical-timeline-component';
import { Curves } from '../curves/curves';
import { TimelineCard } from '../timeline-card/timeline-card';
import { timelineData } from './timeline.constants';
import { StyledTimelineWrap } from './timeline.styled';

export const TimelineComponent = () => {
    return (
        <StyledTimelineWrap
            id="experience"
            borderBottom={`1px solid ${theme.colors.gray[100]}`}
        >
            <VerticalTimeline>
                {timelineData.map((data) => (
                    <VerticalTimelineElement
                        contentArrowStyle={{
                            borderRight: '7px solid  #e1e6ea',
                        }}
                        date={data.date}
                        key={data.id}
                        contentStyle={{
                            boxShadow: '4px 4px #1A202C',
                            border: '1px solid',
                            borderRadius: '0px',
                        }}
                    >
                        <TimelineCard data={data} />
                    </VerticalTimelineElement>
                ))}
            </VerticalTimeline>
        </StyledTimelineWrap>
    );
};
