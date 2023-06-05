import { Box, Button } from '@chakra-ui/react';
import {
    Form,
    useActionData,
    useLoaderData,
    useSubmit,
    useTransition,
} from '@remix-run/react';
import type { FieldValues } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { TextInput } from '../../inputs/text/text-input';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextareaInput } from '../../inputs/textarea/textarea-input';
import * as yup from 'yup';
import { ErrorMsg } from '../../inputs/error-msg/error-msg';
import type { LoaderData } from '~/routes';
import { useState } from 'react';
import { SuccessMessage } from './success-message';
import { ErrorMessage } from './error-message';
import { motion } from 'framer-motion';

type FormData = {
    name: string;
    phone: string;
    email: string;
    message: string;
};

const schema = yup
    .object({
        name: yup.string().required('Name is required'),
        phone: yup
            .number()
            .positive()
            .integer('Needs to be a number')
            .required('Phone is required'),
        email: yup
            .string()
            .email('thats not an email address')
            .required('Email is required'),
        message: yup.string().required('Message is required'),
    })
    .required();

export const HomePageContactForm = () => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData | FieldValues>({
        resolver: yupResolver(schema),
    });
    const { formSuccess } = useLoaderData() as LoaderData;
    const error = useActionData();
    const transition = useTransition();
    const isSubmitting = Boolean(transition.submission);
    const submit = useSubmit();
    const [name, setName] = useState('');

    const onSubmit = (data: FormData | FieldValues) => {
        setName(data.name);

        submit(
            {
                name: data.name.replace(/</g, '&lt;').replace(/>/g, '&gt;'),
                email: data.email.replace(/</g, '&lt;').replace(/>/g, '&gt;'),
                phone: data.phone
                    .toString()
                    .replace(/</g, '&lt;')
                    .replace(/>/g, '&gt;'),
                message: data.message
                    .replace(/</g, '&lt;')
                    .replace(/>/g, '&gt;'),
            },
            { method: 'post' }
        );
    };

    if (formSuccess) {
        return <SuccessMessage name={name} />;
    }

    if (error?.error) {
        return <ErrorMessage error={error} />;
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Box maxW={['100%', '60%', '80%']} marginTop={'-1rem'}>
                <TextInput name="name" label="Name" control={control} />
                <ErrorMsg errors={errors} fieldName="name" />

                <TextInput
                    name="email"
                    label="Email"
                    type="email"
                    control={control}
                />
                <ErrorMsg errors={errors} fieldName="email" />

                <TextInput
                    name="phone"
                    label="Phone"
                    type="number"
                    control={control}
                />
                <ErrorMsg errors={errors} fieldName="phone" />

                <TextareaInput
                    name="message"
                    label="Message"
                    control={control}
                />
                <ErrorMsg errors={errors} fieldName="message" />

                <Button
                    as={motion.button}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    colorScheme={'purple'}
                    size={'md'}
                    mt={8}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Sending...' : 'Email Luke'}
                </Button>
            </Box>
        </Form>
    );
};
