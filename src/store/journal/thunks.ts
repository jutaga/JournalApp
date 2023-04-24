import { Dispatch } from '@reduxjs/toolkit';
import { store } from '../store';
import { collection, doc, setDoc } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../firebase/config';
import { addNewEmptyNote, savingNewNote, setActiveNote } from './journalSlice';


export const startNewNote = () => {
    return async (dispatch: Dispatch, getState: typeof store.getState) => {

        dispatch(savingNewNote());

        const { uid } = getState().auth;
        //uid


        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
            id: ''
        }

        const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));
        const setDocResp = await setDoc(newDoc, newNote);

        newNote.id = newDoc.id;


        //dispatch 
        dispatch(addNewEmptyNote(newNote))
        dispatch(setActiveNote(newNote))
        //dispatch(newNote)
        //dispatch(activarnota)

    }
}