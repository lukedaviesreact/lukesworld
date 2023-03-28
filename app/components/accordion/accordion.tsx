import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
} from '@chakra-ui/accordion';
import { Box } from '@chakra-ui/react';

export interface AccordionComponentProps {
    titleComponent: JSX.Element;
    contentComponent: JSX.Element;
}

export const AccordionComponent = ({
    titleComponent,
    contentComponent,
}: AccordionComponentProps) => {
    return (
        <Accordion>
            <AccordionItem>
                <AccordionButton>
                    {titleComponent}
                    <AccordionIcon />
                </AccordionButton>

                <AccordionPanel pb={4}>{contentComponent}</AccordionPanel>
            </AccordionItem>
        </Accordion>
    );
};
