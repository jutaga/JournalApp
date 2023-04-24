import { collection, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../firebase/config";




export const loadNotes = async (uid: string) => {

    if (!uid) throw new Error('El uid is required');

    const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`);
    const docs = await getDocs(collectionRef);

    const notes: any[] = [];

    docs.forEach(doc => {
        notes.push({
            id: doc.id,
            ...doc.data()
        })
    })
    return notes;

}