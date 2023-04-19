import { Dispatch } from "@reduxjs/toolkit";
import { chekingCredentials, login, logout } from "./authSlice"
import { registerUserWithEmail, singInWithGoogle } from "../../firebase/providers";
import { FormRegister } from "../../hooks/hooks.type";

export const chechingAuthentication = (email: string, password: string) => {

    return async (dispatch: Dispatch) => {

        dispatch(chekingCredentials());

    }
}


export const startGoogleSignIn = () => {
    return async (dispatch: Dispatch) => {
        dispatch(chekingCredentials());

        const result = await singInWithGoogle();

        if (!result?.ok) {
            return dispatch(logout(result?.errorMessage))
        }

        dispatch(login(result));
    }
}

export const startCreatingUserWithEmailPasswords = ({ email, password, displayName }: FormRegister) => {

    return async (dispatch: Dispatch) => {
        dispatch(chekingCredentials());

        const resp = await registerUserWithEmail({ email, password, displayName });

        if (resp) {
            const { ok, uid, photoURL, errorMessage } = resp;

            if (!ok) return dispatch(logout({ errorMessage }));

            dispatch(login({ uid, displayName, email, photoURL }));

        }

    }
}