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
            <Curves wavePos="top" />
            <VerticalTimeline>
                {timelineData.map((data) => (
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
                        <TimelineCard data={data} />
                    </VerticalTimelineElement>
                ))}
            </VerticalTimeline>
            <Curves wavePos="bottom" />
        </StyledTimelineWrap>
    );
};
