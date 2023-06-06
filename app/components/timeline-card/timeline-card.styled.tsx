import { Box, theme } from '@chakra-ui/react';
import styled from '@emotion/styled';

export const StyledTimelineCard = styled(Box)(({ isopen }) => ({
    display: 'grid',
    gridTemplateRows: `${
        isopen === 'true' ? '50px 270px 1fr' : '50px 0px 1fr'
    }`,
    '> div': {
        overflow: 'hidden',
    },
    transition: 'grid-template-rows .3s ease',
    cursor: 'pointer',

    [`@media (min-width:${theme.breakpoints.md})`]: {
        gridTemplateRows: `${
            isopen === 'true' ? '50px 120px 1fr' : '50px 0px 1fr'
        }`,
    },

    [`@media (min-width:${theme.breakpoints.lg})`]: {
        gridTemplateRows: `${
            isopen === 'true' ? '50px 200px 1fr' : '50px 0px 1fr'
        }`,
    },

    '&:hover svg': {
        fill: theme.colors.purple[500],
    },

    '&:hover svg path': {
        stroke: theme.colors.purple[500],
    },
}));

export const StyledIconWrap = styled(Box)({
    position: 'absolute',
    right: '15px',
    opacity: '0.4',
    transform: 'rotate(90deg)',
    bottom: '15px',
});
