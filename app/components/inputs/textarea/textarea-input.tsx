import { Textarea, theme } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { Control, Controller, FieldValues } from 'react-hook-form';
import { CustomLabel } from '../label/custom-label';
import { StyledFormControl } from '../shared/input-style.styled';
import { StyledTextArea } from './textarea-input.styled';

interface TextareaInputProps {
    control: Control<FieldValues, any>;
    name: string;
    label: string;
}
export const TextareaInput = ({ control, name, label }: TextareaInputProps) => {
    return (
        <Controller
            name={name}
            control={control}
            defaultValue={''}
            render={({ field }) => (
                <StyledFormControl
                    hasvalue={field.value.length >= 1 ? 'true' : 'false'}
                >
                    <StyledTextArea
                        {...field}
                        color={'gray.700'}
                        hasvalue={field.value.length >= 1 ? 'true' : 'false'}
                    />
                    <CustomLabel label={label} />
                </StyledFormControl>
            )}
        />
    );
};
