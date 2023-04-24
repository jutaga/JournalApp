import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { FirebaseAuth } from "../firebase/config";
import { logout, login } from "../store/auth/authSlice";
import { RootState } from "../store/store";
import { startLoadingNotes } from '../store/journal/thunks';
import { useAppDispatch } from "./useDispatch";

export const useCheckAuth = () => {

    const { status } = useSelector((state: RootState) => state.auth);
    const dispatch = useAppDispatch();

    useEffect(() => {

        onAuthStateChanged(FirebaseAuth, async (user) => {

            if (!user) return dispatch(logout(user));

            const { uid, email, displayName, photoURL } = user;
            dispatch(login({ uid, email, displayName, photoURL }));
            dispatch(startLoadingNotes());
        })

    }, []);

    return status

}
