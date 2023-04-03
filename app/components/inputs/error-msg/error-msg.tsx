import type { FieldErrors, FieldValues } from 'react-hook-form';
import { Text } from '@chakra-ui/react';
interface ErrorMsgProps {
    errors: FieldErrors<FieldValues>;
    fieldName: string;
}
export const ErrorMsg = ({ errors, fieldName }: ErrorMsgProps) => {
    if (
        errors[fieldName] &&
        errors[fieldName]?.message &&
        typeof errors[fieldName]?.message === 'string'
    ) {
        return (
            <Text fontSize={'xs'} color={'red'} ml={1}>
                {/* @ts-ignore */}
                {errors[fieldName].message?.toString()}
            </Text>
        );
    }
    return null;
};
