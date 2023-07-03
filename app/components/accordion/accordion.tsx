import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
} from '@chakra-ui/accordion';
import { Box } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { StyledAccordionWrap } from './accordion.styled';

export interface AccordionComponentProps {
    content: {
        title: string;
        content: string;
    }[];
}

export const AccordionComponent = ({ content }: AccordionComponentProps) => {
    const container = {
        hidden: { opacity: 1, scale: 0 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                delayChildren: 0.3,
                staggerChildren: 0.2,
            },
        },
    };

    const child = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
        },
    };

    return (
        <StyledAccordionWrap>
            <Accordion
                as={motion.div}
                variants={container}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                {content.map((item) => (
                    <AccordionItem
                        key={item.title}
                        as={motion.div}
                        variants={child}
                    >
                        <h2>
                            <AccordionButton>
                                <Box as="span" flex="1" textAlign="left">
                                    <b>{item.title}</b>
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>{item.content}</AccordionPanel>
                    </AccordionItem>
                ))}
            </Accordion>
        </StyledAccordionWrap>
    );
};
