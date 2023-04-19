import { useState } from 'react';
import { Errors, FormState, FormRegister } from './hooks.type';



const errorsData: Errors = {
    email: false,
    password: false,
    displayName: false
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
    const [formState, setFormState] = useState(initialForm);
    const [errorForm, setErrorForm] = useState(errorsData);

    const onInputChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const onResetForm = () => {
        setFormState(initialForm);
    };

    const onSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const newErrors: Errors = { ...errorsData };
        let hasError = false;

        if (formState.displayName.trim().length < 1) {
            newErrors.displayName = true;
            hasError = true;
        }

        if (!regex.test(formState.email)) {
            newErrors.email = true;
            hasError = true;
        }

        if (formState.password === "") {
            newErrors.password = true;
            hasError = true;
        }

        setErrorForm(newErrors);

        if (!hasError) {
            // Aquí iría el código para enviar el formulario si no hay errores
        }

        setTimeout(() => {
            setErrorForm(errorsData);
        }, 2000);
    };

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,
        onSubmitForm,
        errorForm,
    };
};