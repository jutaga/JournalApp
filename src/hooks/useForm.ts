import { useEffect, useState } from 'react';

interface FormState {
    email: string;
    password: string;
}

interface FormRegister {
    email: string;
    password: string;
    displayName: string;
}

interface ActiveNote {
    id: string,
    title: string,
    body: string,
    date: number,
    imageUrls: string[],
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

export const useFormNote = (initialForm: ActiveNote) => {

    const [formState, setFormState] = useState(initialForm);

    useEffect(() => {
        setFormState(initialForm);
    }, [initialForm])


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