import { Box, theme } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useState } from 'react';
import { motion } from 'framer-motion';
export const Circles = () => {
    const CIRCLE_COUNT = 12;

    const CirclesWrapper = styled(Box)({
        display: 'grid',
        placeItems: 'center',
    });
    const StyledBox = styled(motion.div)({
        width: '100px',
        aspectRatio: '1',
        background: theme.colors.purple[500],
        borderRadius: '50%',
        position: 'relative',
        cursor: 'pointer',
    });
    const StyledCircle = styled(motion.div)(({ index }: { index: number }) => {
        const size = '50px';

        return {
            width: `${size}`,
            top: `calc(${size} /2)`,
            left: `calc(${size} /2)`,
            aspectRatio: '1',
            position: 'absolute',
            background: theme.colors.purple[400],
            borderRadius: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        };
    });

    const generateArr = (count: number) => {
        const arr = [];
        for (let i = 0; i <= count; i++) {
            arr.push('item');
        }
        return arr;
    };

    const container = {
        hidden: { scale: 0, opacity: 0 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                delayChildren: 0.3,
                staggerChildren: 0.2,
            },
        },
    };
    const [isOpen, setIsOpen] = useState(false);
    return (
        <CirclesWrapper>
            <StyledBox
                variants={container}
                initial="hidden"
                animate="visible"
                onClick={() => setIsOpen((isOpen) => !isOpen)}
            >
                {generateArr(CIRCLE_COUNT - 1).map((circle, i) => {
                    const offset = 100;
                    const degrees = `${(i * 360) / CIRCLE_COUNT}deg`;

                    const item = {
                        on: {
                            transform: `translate(calc(cos(${degrees}) * 100px),
        calc(sin(${degrees}) * 50px))`,
                            opacity: 0,
                        },
                        off: {
                            transform: `translate(calc(cos(${degrees}) * ${offset}px),
                              calc(sin(${degrees}) * ${offset}px))`,
                            opacity: 0,
                        },
                    };

                    return (
                        <StyledCircle
                            key={i}
                            index={i + 1}
                            initial={{
                                transform: `translate(calc(cos(${0}) * ${0}),
                                calc(sin(${0}) * ${0}))`,
                            }}
                            animate={isOpen ? 'on' : 'off'}
                            variants={item}
                            transition={{
                                type: 'spring',
                                damping: 20,
                            }}
                        >
                            {/* <Text>✨</Text> */}
                        </StyledCircle>
                    );
                })}
            </StyledBox>
        </CirclesWrapper>
    );
};
