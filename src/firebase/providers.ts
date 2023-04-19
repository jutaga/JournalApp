import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";
import { FirebaseError } from "firebase/app";
import { FormRegister, FormState } from "../hooks/hooks.type";

const googleProvider = new GoogleAuthProvider();

export const singInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(FirebaseAuth, googleProvider);
        // const credentials = GoogleAuthProvider.credentialFromResult(result);
        const { displayName, email, photoURL, uid } = result.user;

        return {
            ok: true,
            //User info
            displayName,
            email,
            photoURL,
            uid
        }

    } catch (error) {

        if (error instanceof FirebaseError) {
            const errorCode = error.code;
            const errorMessage = error.message;

            return {
                ok: false,
                errorMessage,
            }
        }
    }
}

export const registerUserWithEmail = async ({ email, password, displayName }: FormRegister) => {

    try {
        console.log({ email, password, displayName });
        const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
        const { uid, photoURL } = resp.user;
        console.log(resp);

        //Actualizar Firebase
        if (FirebaseAuth.currentUser) {
            await updateProfile(FirebaseAuth.currentUser, { displayName });
        }

        return {
            ok: true,
            uid, photoURL, email, displayName
        }

    } catch (error) {

        if (error instanceof FirebaseError) {
            return {
                ok: false,
                errorMessage: error.message,
            }
        }
    }

}

export const loginWithEmailPassword = async ({ email, password }: FormState) => {

    try {

        const resp = await signInWithEmailAndPassword(FirebaseAuth, email, password);
        const { uid, photoURL, displayName } = resp.user;

        return {
            ok: true,
            uid, photoURL, displayName
        }


    } catch (error) {
        if (error instanceof FirebaseError) {
            return {
                ok: false,
                errorMessage: error.message,
            }
        }
    }
}

export const logoutFirebase = async () => {
    return await FirebaseAuth.signOut();
}