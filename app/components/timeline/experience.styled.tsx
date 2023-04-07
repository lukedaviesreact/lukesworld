import { Box, theme } from '@chakra-ui/react';
import styled from '@emotion/styled';

export const StyledExperienceWrap = styled(Box)({
    '--line-color': '#E2E8F0',
    position: 'relative',
    padding: '0  3rem 0 0',
    '@media (min-width: 1170px)': {
        padding: '0  3rem',
    },
    p: {
        fontSize: theme.fontSizes.sm,
    },
    '.vertical-timeline': {
        width: '100%',
    },

    '.vertical-timeline.vertical-timeline--two-columns': {
        '@media (min-width: 1170px)': {
            width: '100%',
        },
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
        marginLeft: '15px !important',
        top: '18px !important',
        background: '#805AD5',
        color: '#805AD5',
        height: '10px !important',
        width: '10px !important',
        '@media (min-width: 1170px)': {
            marginLeft: '-5px !important',
            top: '25px !important',
            height: '10px !important',
            width: '10px !important',
        },
    },

    '.vertical-timeline--animate .vertical-timeline-element-content.bounce-in':
        {
            animation: 'none',

            '@media (min-width: 1170px)': {
                animation: 'cd-bounce-2 .6s',
            },
        },
});
