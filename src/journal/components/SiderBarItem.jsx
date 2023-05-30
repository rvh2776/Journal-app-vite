import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { TurnedInNot } from "@mui/icons-material";
import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { setActiveNote } from "../../store/journal/journalSlice";

export const SiderBarItem = ({title = '', id, body, date, imageUrls = []}) => {

    const dispatch = useDispatch();

    const OnClickNote = () => {
        // dispatch(setActiveNote(note));
        dispatch(setActiveNote({title, id, date, body, imageUrls}));
    }


    const newTitle = useMemo(() => {
        return title.length > 17
            ? title.substring(0, 17) + '...'
            : title;

    }, [title])


    const dateString = useMemo(() => {
        const newDate = new Date(date);
        // return  newDate.toUTCString();
        return  newDate.toLocaleString();
    }, [date])

  return (
    <ListItem disablePadding>

        <ListItemButton onClick={OnClickNote}>
            <ListItemIcon>
                <TurnedInNot/>
            </ListItemIcon>
            <Grid container>
                <ListItemText  primary={newTitle}/>
                <ListItemText secondary= { `Creada: ${dateString}`} /> 
            </Grid>
        </ListItemButton>

    </ListItem>
  )
}

