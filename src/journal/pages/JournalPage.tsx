import { IconButton } from "@mui/material"
import { JournalLayout } from "../layout/JournalLayout"
import { NoteView, NothingSelected } from "../views"
import { AddOutlined } from "@mui/icons-material"
import { startNewNote } from "../../store/journal/thunks"
import { useAppDispatch } from "../../hooks/useDispatch"
import { useSelector } from "react-redux"
import { RootState } from "../../store/store"


export const JournalPage = () => {

  const dispatch = useAppDispatch();
  const { isSaving, active } = useSelector((state: RootState) => state.journal);

  const onClickNewNote = () => {
    dispatch(startNewNote());
  }

  return (
    <JournalLayout>


      {
        (!!active)
          ? <NoteView />
          : <NothingSelected />
      }

      <IconButton disabled={isSaving} onClick={onClickNewNote} size="large" sx={{ color: 'white', backgroundColor: 'error.main', ':hover': { backgroundColor: 'error.main', opacity: 0.9 }, position: 'fixed', right: 50, bottom: 50 }} >
        <AddOutlined sx={{ fontSize: 30 }} />

      </IconButton>
    </JournalLayout >
  )
}
