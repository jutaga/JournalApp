import { IconButton } from "@mui/material"
import { JournalLayout } from "../layout/JournalLayout"
import { NoteView, NothingSelected } from "../views"
import { AddOutlined } from "@mui/icons-material"


export const JournalPage = () => {
  return (
    <JournalLayout>
      <NothingSelected />

      {/* <NoteView/> */}

      <IconButton size="large" sx={{ color: 'white', backgroundColor: 'error.main', ':hover': { backgroundColor: 'error.main', opacity: 0.9 }, position: 'fixed', right: 50, bottom: 50 }} >
        <AddOutlined sx={{ fontSize: 30 }} />

      </IconButton>
    </JournalLayout >
  )
}