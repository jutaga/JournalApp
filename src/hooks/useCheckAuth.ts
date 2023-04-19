import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FirebaseAuth } from "../firebase/config";
import { logout, login } from "../store/auth/authSlice";
import { RootState } from "../store/store";

export const useCheckAuth = () => {

    const { status } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {

        onAuthStateChanged(FirebaseAuth, async (user) => {

            if (!user) return dispatch(logout(user));

            const { uid, email, displayName, photoURL } = user;


            dispatch(login({ uid, email, displayName, photoURL }));
        })

    }, []);

    return status
    
}
