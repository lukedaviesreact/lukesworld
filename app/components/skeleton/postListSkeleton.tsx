import { Badge, Box, HStack, theme, VStack } from '@chakra-ui/react';
import styled from '@emotion/styled';

export const PostListSkeleton = ({ tagCount }: { tagCount: number }) => {
    const generateArray = (num: number) => {
        const arr = [];
        for (let i = 1; i <= num; i++) {
            arr.push(i);
        }
        return arr;
    };

    const StyledBox = styled(Box)({
        width: '100%',
        padding: theme.space['2'],

        '.vr-skeleton-wrap span': {
            background: theme.colors.gray[200],
            display: 'block',
            marginTop: '16px',
            height: '18px',

            '&:first-child': {
                height: '40px',
            },
        },
    });

    return (
        <VStack align="start" overflowY="scroll" maxH="calc(100vh - 200px)">
            {generateArray(tagCount).map((fake, i) => {
                return (
                    <StyledBox key={i} shadow="md" mr="2">
                        <div className="vr-skeleton-wrap">
                            <span></span>
                            <span></span>
                        </div>

                        <Box mt="2">
                            <HStack>
                                {generateArray(tagCount).map((fake, i) => (
                                    <Badge
                                        key={`fake-tag-${i}`}
                                        colorScheme={'gray'}
                                    ></Badge>
                                ))}
                            </HStack>
                        </Box>
                    </StyledBox>
                );
            })}
        </VStack>
    );
};
