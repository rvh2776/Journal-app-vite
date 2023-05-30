import { AddOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { startNewNote } from "../../store/journal/thunks";

import { JournalLayout } from "../layout/JournalLayout";
import { NoteView, NotingSelectedView } from "../views";

export const JournalPage = () => {

  const dispatch = useDispatch();
  const {isSaving, active} = useSelector((state) => state.journal);

  const onClickNewNote = () => {
    dispatch(startNewNote());
  }

  return (
    <JournalLayout>

      {
        (!!active)
        ? <NoteView />
        : <NotingSelectedView/>
      }

      <IconButton
        size="large"
        sx={{
          color: 'white',
          backgroundColor: 'error.main',
          ':hover': {backgroundColor: 'error.main', opacity: 0.9},
          position: 'fixed',
          right: 50,
          bottom: 50
        }}
        onClick = {onClickNewNote}
        disabled = {isSaving}
      >
        <AddOutlined sx={{fontSize: 30}}/>
      </IconButton>

    </JournalLayout>
  )
}
