import { As, Heading } from '@chakra-ui/react';

export const StyledHeading = ({
    type,
    size,
    content,
    weight,
    color,
    noOfLines,
}: {
    type: As<any> | undefined;
    size: string;
    content: string | JSX.Element;
    weight?: number;
    color: 'light' | 'dark';
    noOfLines?: number;
}) => {
    return (
        <Heading
            as={type}
            size={size}
            fontWeight={weight || 'bold'}
            color={color === 'light' ? 'gray.600' : 'gray.700'}
            noOfLines={noOfLines || undefined}
        >
            {content}
        </Heading>
    );
};
