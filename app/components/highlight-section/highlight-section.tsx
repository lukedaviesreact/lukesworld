import { Box, Button, Heading, theme, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { Link } from '@remix-run/react';
import { motion } from 'framer-motion';

interface HighlightSectionArgs {
    highlightedService: {
        service: string;
        description: string;
        emoji: string;
    };
}

export const StyledHightlightedSection = styled(Box)({
    position: 'relative',
    border: `2px solid ${theme.colors.gray[700]}`,
    boxShadow: `4px 4px ${theme.colors.gray[700]}`,
    padding: `${theme.space['8']}`,

    '.styled-emoji': {
        position: 'absolute',
        left: '-16rem',
        fontSize: '10rem',
        top: '0',
        filter: 'hue-rotate(45deg)',
        display: 'none',
    },
    '&:nth-child(2n + 1)': {
        marginLeft: 'auto',
    },
    '&:not(:last-child)': {
        marginBottom: `${theme.space['16']}`,
    },
    '&:nth-child(2n)': {
        '.styled-emoji': {
            left: 'unset',
            right: '-16rem',
        },
    },

    [`@media (min-width:${theme.breakpoints.lg})`]: {
        maxWidth: '60%',
        display: 'block',
    },
});

export const HighlightSection = ({
    highlightedService,
}: HighlightSectionArgs) => {
    return (
        <StyledHightlightedSection>
            <Box></Box>
            <Heading as="h2" size={'lg'} color={theme.colors.gray[700]} mb={2}>
                {highlightedService.service}
            </Heading>
            <Text maxW={['100%', '90%']}>{highlightedService.description}</Text>
            {/* <Box mt={4} display="flex" justifyContent={'end'}>
                <Link to={'/services#contact'} prefetch="intent">
                    <Button
                        as={motion.button}
                        whileTap={{ scale: 0.95 }}
                        colorScheme={'purple'}
                        variant="outline"
                    >
                        Contact
                    </Button>
                </Link>
            </Box> */}
            <Box className="styled-emoji">{highlightedService.emoji}</Box>
        </StyledHightlightedSection>
    );
};
