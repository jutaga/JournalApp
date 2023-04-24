import { createSlice } from '@reduxjs/toolkit';

interface ActiveNote {
    id: string,
    title: string,
    body: string,
    date: number,
    imageUrls: string[],
}

interface JournalState {
    isSaving: boolean,
    messageSaved: string,
    notes: any[],
    active: ActiveNote | null
}

const initialState: JournalState = {
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
            state.messageSaved = '';
        },
        setNotes: (state, action) => {
            state.notes = action.payload;
        },
        setSaving: (state) => {
            state.isSaving = true;
            state.messageSaved = '';
        },
        updateNote: (state, action) => {
            state.isSaving = false;
            state.notes = state.notes.map(note => {
                if(note.id === action.payload.id){
                    return action.payload
                }
                return note
            })

            state.messageSaved = `${action.payload.title}, Actualizada Correctamente!`
        },
        setPhotosToActiveNote : (state, action) => {
            state.active!.imageUrls = [...state.active!.imageUrls, ...action.payload];
            state.isSaving = false;

        },
        clearNotesLogout : (state) => {
            state.isSaving = false;
            state.messageSaved = '';
            state.notes = [];
            state.active = null;
        },
        deleteNoteById: (state, action) => {
            state.active = null;
            state.notes = state.notes.filter(note => note.id !== action.payload.id);            
        },
    },
})


export const {
    addNewEmptyNote,
    clearNotesLogout,
    deleteNoteById,
    savingNewNote,
    setActiveNote,
    setNotes,
    setPhotosToActiveNote,
    setSaving,
    updateNote,
} = journalSlice.actions

