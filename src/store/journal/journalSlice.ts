import { createSlice } from '@reduxjs/toolkit';

interface ActiveNote {
    id: string,
    title: string,
    body: string,
    date: number,
    imageUrls: string[],
}

interface journalState {
    isSaving: boolean,
    messageSaved: string,
    notes: any[],
    active: ActiveNote | null
}

const initialState: journalState = {
    isSaving: false,
    messageSaved: '',
    notes: [],
    active: null,
    /*     active: {
            id: 'ABC123',
            title: '',
            body: '',
            date: 12351,
            imageUrls: [],
        }, */

}


export const journalSlice = createSlice({
    name: 'journal',
    initialState,
    reducers: {
        savingNewNote: (state) => {
            state.isSaving = true;
        },
        addNewEmptyNote: (state, action) => {
            state.notes.push(action.payload);
            state.isSaving = false;
        },
        setActiveNote: (state, action) => {
            state.active = action.payload;
        },
        setNote: (state, action) => {

        },
        setSaving: (state) => {

        },
        updateNote: (state, action) => {

        },
        deleteNoteById: (state, action) => {

        },
    },
})


export const {
    addNewEmptyNote,
    deleteNoteById,
    savingNewNote,
    setActiveNote,
    setNote,
    setSaving,
    updateNote,
} = journalSlice.actions

