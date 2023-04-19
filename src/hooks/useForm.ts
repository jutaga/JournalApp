import { useState } from 'react';

interface FormState {
    email: string;
    password: string;
}

interface FormRegister {
    email: string;
    password: string;
    displayName: string;
}

export const useForm = (initialForm: FormState) => {

    const [formState, setFormState] = useState(initialForm);

    const onInputChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [name]: value
        });
    }

    const onResetForm = () => {
        setFormState(initialForm);
    }

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,
    }
}

export const useFormRegister = (initialForm: FormRegister) => {

    const [formState, setFormState] = useState<FormRegister>(initialForm);

    const onInputChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [name]: value
        });
    }

    const onResetForm = () => {
        setFormState(initialForm);
    }

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,
    }
}