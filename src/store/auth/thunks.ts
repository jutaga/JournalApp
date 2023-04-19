import { Dispatch } from "@reduxjs/toolkit";
import { chekingCredentials, login, logout } from "./authSlice"
import { loginWithEmailPassword, logoutFirebase, registerUserWithEmail, singInWithGoogle } from "../../firebase/providers";
import { FormRegister, FormState } from "../../hooks/hooks.type";
import { FirebaseError } from "firebase/app";

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

export const startLoginWithEmailPassword = ({ email, password }: FormState) => {
    return async (dispatch: Dispatch) => {
        dispatch(chekingCredentials());

        const resp = await loginWithEmailPassword({ email, password });
        console.log(resp);

        if (resp) {
            if (!resp.ok) return dispatch(logout(resp));
            dispatch(login(resp));
        }
    }
}

export const startLogout = () => {
    return async (dispatch: Dispatch) => {
        try {
            await logoutFirebase();
            dispatch(logout({ errorMessage: null }));

        } catch (error) {
            if (error instanceof FirebaseError) {
                dispatch(logout({ errorMessage: error.message }));
            }
        }
    }
}