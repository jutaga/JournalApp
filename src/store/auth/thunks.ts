import { Dispatch } from "@reduxjs/toolkit";
import { chekingCredentials, login, logout } from "./authSlice"
import { singInWithGoogle } from "../../firebase/providers";

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