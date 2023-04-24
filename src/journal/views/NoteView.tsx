import { Button, Grid, IconButton, TextField, Typography } from "@mui/material"
import { ImageGallery } from "../components"
import { RootState } from "../../store/store"
import { DeleteOutline, SaveOutlined, UploadOutlined } from "@mui/icons-material"
import { setActiveNote } from "../../store/journal/journalSlice"
import { startDeletingNote, startSavingNote, startUploadingFiles } from "../../store/journal/thunks"
import { useAppDispatch } from "../../hooks/useDispatch"
import { useEffect, useMemo, useRef } from "react"
import { useFormNote } from "../../hooks/useForm"
import { useSelector } from "react-redux"
import Swal from "sweetalert2"
import 'sweetalert2/dist/sweetalert2.css'


export const NoteView = () => {

    const dispatch = useAppDispatch();
    const { active: note, messageSaved, isSaving } = useSelector((state: RootState) => state.journal);

    const { body, title, date, onInputChange, formState } = useFormNote(note!);

    const dateString = useMemo(() => {

        const newDate = new Date(date);

        return newDate.toUTCString();

    }, [date])

    const fileInpuRef = useRef<HTMLInputElement>(null);


    useEffect(() => {
        dispatch(setActiveNote(formState));
    }, [formState])

    useEffect(() => {
        if (messageSaved.length > 0) {
            Swal.fire('Nota Actualizada', messageSaved, 'success');
        }
    }, [messageSaved])


    const onSaveNote = () => {
        dispatch(startSavingNote())
    }

    const onFileInputChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {

        if (!target.files || target.files.length === 0) return;

        dispatch(startUploadingFiles(target.files));

    }

    const onDelete = () => {
        dispatch(startDeletingNote());
    }


    return (
        <Grid className='animate__animated animate__fadeIn animate__faster' container direction='row' justifyContent={'space-between'} alignItems={'center'} sx={{ mb: 1 }} >
            <Grid item>
                <Typography fontSize={39} fontWeight={'light'} >{dateString}</Typography>
            </Grid>

            <Grid item>

                <input ref={fileInpuRef} type="file" multiple onChange={onFileInputChange} style={{ display: 'none' }} />

                <IconButton onClick={() => fileInpuRef.current?.click()} color="primary" disabled={isSaving}>
                    <UploadOutlined />
                </IconButton>

                <Button disabled={isSaving} onClick={onSaveNote} color='primary' sx={{ padding: 2 }}>
                    <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                    Guardar
                </Button>
            </Grid>

            <Grid container>
                <TextField name='title' value={title} onChange={onInputChange} type='text' variant="filled" fullWidth placeholder="Ingrese un titulo" label='Titulo' sx={{ border: 'none', mb: 1 }} />

                <TextField name='body' value={body} onChange={onInputChange} type='text' variant="filled" fullWidth multiline placeholder="¿Que Sucedio en el dia de hoy?" minRows={5} />
            </Grid>

            <Grid container justifyContent='end'>

                <Button onClick={onDelete} sx={{ mt: 2 }} color="error">
                    <DeleteOutline />
                    Borrar
                </Button>
            </Grid>

            {/* Galeria de imagenes */}

            <ImageGallery images={note!.imageUrls} />

        </Grid>
    )
}
