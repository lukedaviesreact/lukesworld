import styled from '@emotion/styled';

const height = '53px';

interface StyledCurvesProps {
    wavePos: string;
}

export const StyledCurves = styled('div')<StyledCurvesProps>(({ wavePos }) => ({
    position: 'absolute',
    bottom: wavePos === 'bottom' ? `0` : 'unset',
    transform: wavePos === 'bottom' ? 'rotate(180deg)' : 'unset',
    left: 0,
    width: '100%',
    overflow: 'hidden',
    lineHeight: 0,
    '> svg': {
        position: 'relative',
        display: 'block',
        width: 'calc(100% + 1.3px)',
        height: height,
    },
}));
