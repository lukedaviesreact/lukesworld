import { defineStyleConfig } from '@chakra-ui/react';

export const Button = defineStyleConfig({
    // The styles all button have in common
    baseStyle: {
        fontWeight: 'bold',
        borderRadius: '0', // <-- border radius is same for all variants and sizes
        border: '1px solid #1A202C',

        transition: 'all .2s ease',
        position: 'relative',

        transform: 'translateX(-2px) translateY(-2px)',
        boxShadow: '4px 4px #1A202C ',
        _hover: {
            transform: 'translateX(0px) translateY(0px)',
            boxShadow: '0px 0px  #1A202C ',
        },
    },

    // Two sizes: sm and md
    sizes: {
        sm: {
            fontSize: 'sm',
            px: 4, // <-- px is short for paddingLeft and paddingRight
            py: 3, // <-- py is short for paddingTop and paddingBottom
        },
        md: {
            fontSize: 'md',
            px: 6, // <-- these values are tokens from the design system
            py: 4, // <-- these values are tokens from the design system
        },
    },
    // Two variants: outline and solid
    variants: {
        outline: {
            border: '2px solid',
            borderColor: 'purple.500',
            color: 'purple.500',
            borderRadius: '0',
        },
        solid: {
            bg: 'purple.500',
            color: 'white',
        },
    },
    // The default size and variant values
    defaultProps: {
        size: 'md',
        variant: 'solid',
    },
});
