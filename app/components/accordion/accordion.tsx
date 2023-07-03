import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
} from '@chakra-ui/accordion';
import { Box } from '@chakra-ui/react';
import { StyledAccordionWrap } from './accordion.styled';

export interface AccordionComponentProps {
    content: {
        title: string;
        content: string;
    }[];
}

export const AccordionComponent = ({ content }: AccordionComponentProps) => {
    return (
        <StyledAccordionWrap>
            <Accordion>
                {content.map((item) => (
                    <AccordionItem key={item.title}>
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
