import { Box, Button, HStack } from '@chakra-ui/react';
import {
    Form,
    useActionData,
    useNavigate,
    useSubmit,
    useTransition,
} from '@remix-run/react';
import type { FieldValues } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { TextInput } from '../../inputs/text/text-input';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ErrorMsg } from '../../inputs/error-msg/error-msg';
import { ErrorMessage } from './error-message';
import type { Dispatch, SetStateAction } from 'react';
import { motion } from 'framer-motion';

type FormData = {
    prompt: string;
};

export interface ImageResult {
    prompt: string;
    image: string;
}

export type ImageResults = ImageResult[];

const schema = yup
    .object({
        prompt: yup.string().required('Ai cant read your mind... yet'),
    })
    .required();

export const OpenAIForm = ({
    setImageResults,
}: {
    setImageResults: Dispatch<SetStateAction<ImageResults>>;
    imageResults: ImageResults;
}) => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData | FieldValues>({
        resolver: yupResolver(schema),
    });
    const error = useActionData();
    const transition = useTransition();
    const isSubmitting = Boolean(transition.submission);
    const navigate = useNavigate();
    const submit = useSubmit();

    const onSubmit = (data: FormData | FieldValues) => {
        submit(
            {
                prompt: data.prompt.replace(/</g, '&lt;').replace(/>/g, '&gt;'),
            },
            { method: 'post' }
        );
    };

    if (error?.error) {
        return <ErrorMessage error={error} />;
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Box maxW={['100%', '100%', '40%']}>
                <TextInput name="prompt" label="Prompt" control={control} />
                <ErrorMsg errors={errors} fieldName="prompt" />
                <HStack mt={4} spacing={4}>
                    <Button
                        as={motion.button}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        colorScheme={'purple'}
                        size={'md'}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Submitting...' : 'Generate an image'}
                    </Button>

                    <Button
                        colorScheme={'purple'}
                        variant={'outline'}
                        size={'md'}
                        disabled={isSubmitting}
                        onClick={() => {
                            window.sessionStorage.clear();
                            setImageResults([]);
                            navigate('/image-generation');
                        }}
                    >
                        Clear History
                    </Button>
                </HStack>
            </Box>
        </Form>
    );
};
