import { Control, Controller, FieldValues } from 'react-hook-form';
import { CustomLabel } from '../label/custom-label';
import { StyledFormControl } from '../shared/input-style.styled';
import { StyledInput } from './text-input.styled';

interface TextInputProps {
    control: Control<FieldValues, any>;
    name: string;
    label: string;
    type?: string;
}

export const TextInput = ({ control, name, label, type }: TextInputProps) => {
    return (
        <Controller
            name={name}
            control={control}
            defaultValue={''}
            render={({ field }) => {
                return (
                    <StyledFormControl
                        hasvalue={field.value.length >= 1 ? 'true' : 'false'}
                    >
                        <StyledInput
                            {...field}
                            hasvalue={
                                field.value.length >= 1 ? 'true' : 'false'
                            }
                            type={type ? type : 'text'}
                            color={'gray.700'}
                        />
                        <CustomLabel label={label} />
                    </StyledFormControl>
                );
            }}
        />
    );
};
