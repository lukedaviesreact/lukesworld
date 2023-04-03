import { Box, theme } from '@chakra-ui/react';
import styled from '@emotion/styled';

export const StyledExperienceWrap = styled(Box)({
    '--line-color': '#E2E8F0',
    p: {
        fontSize: theme.fontSizes.sm,
    },
    '.vertical-timeline': {
        width: '100%',
        padding: '3rem 0',
    },
    '.vertical-timeline-element': {
        '@media (min-width: 1170px)': {
            margin: `${theme.space[8]} 0`,
        },
    },

    '.vertical-timeline-element-content p': {
        fontWeight: 'unset',
    },

    '.vertical-timeline--two-columns .vertical-timeline-element-content .vertical-timeline-element-date':
        {
            '@media (min-width: 1170px)': {
                fontSize: theme.fontSizes.lg,
                color: theme.colors.gray[700],
                opacity: 1,
            },
        },
    '.vertical-timeline-element-icon': {
        marginLeft: '15px',
        top: '18px',
        background: '#805AD5',
        color: '#805AD5',
        height: '10px',
        width: '10px',
        '@media (min-width: 1170px)': {
            marginLeft: '-5px',
            top: '25px',
        },
    },
});