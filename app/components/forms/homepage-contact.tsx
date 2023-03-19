import { ChevronRightIcon, PhoneIcon } from '@chakra-ui/icons';
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputLeftElement,
    Textarea,
} from '@chakra-ui/react';
import { Form } from '@remix-run/react';

export const HomePageContactForm = () => {
    const CustomFormLabel = ({ label }: { label: string }) => {
        return (
            <FormLabel fontSize={'sm'} mb={1} color={'gray.600'}>
                {label}
            </FormLabel>
        );
    };
    return (
        <Form method="post">
            <Box maxW={['100%', '100%', '40%']}>
                <FormControl mb={3}>
                    <CustomFormLabel label="Name" />
                    <Input
                        type="text"
                        name="name"
                        variant="flushed"
                        color={'gray.700'}
                    />
                </FormControl>

                <FormControl mb={3}>
                    <CustomFormLabel label="Phone" />

                    <InputGroup>
                        <InputLeftElement
                            pointerEvents="none"
                            children={<PhoneIcon color="gray.300" />}
                        />
                        <Input
                            type="tel"
                            name="phone"
                            variant="flushed"
                            color={'gray.700'}
                        />
                    </InputGroup>
                </FormControl>

                <FormControl mb={5}>
                    <CustomFormLabel label="Message" />
                    <Textarea
                        name="message"
                        variant="flushed"
                        color={'gray.700'}
                    />
                </FormControl>

                <Button type="submit" colorScheme={'purple'} size={'md'}>
                    Email Luke
                </Button>
            </Box>
        </Form>
    );
};
