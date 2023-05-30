import { useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { DeleteOutline, SaveOutlined, UploadOutlined } from "@mui/icons-material"
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material"
import Swal from "sweetalert2";
import 'sweetalert2/dist/sweetalert2.css';

import { useForm } from "../../hooks/useForm";
import { ImageGallery } from "../components"
import { setActiveNote } from "../../store/journal/journalSlice";
import { startDeletingNote, startSaveNote, startUploadingFiles } from "../../store/journal/thunks";

export const NoteView = () => {

    const {active: note, messageSaved, isSaving, messageDeleted} = useSelector((state => state.journal));
    const dispatch = useDispatch()
        
    const {title, body, date, formState, onInputChange } = useForm(note)


    const dateString = useMemo(() => {
        const newDate = new Date(date);
        // return  newDate.toUTCString();
        return  newDate.toLocaleString();
    }, [date])

    const fileInputRef = useRef();
    
    
    useEffect(() => {
        dispatch(setActiveNote(formState));
    },[formState])
    
    
    useEffect(() => {
        if(messageSaved.length > 0){
            Swal.fire('Nota actualizada', messageSaved, 'success');
        }
    }, [messageSaved])


    // useEffect(() => {
    //     Swal.fire('Nota elimidada.', messageDeleted, 'success');
    // },[messageDeleted])

    
    // const onSubmit = (event) => {
    //     event.preventDefault();
    //     dispatch(setActiveNote(formState));
    // }

    const onSaveNote = () => {
        dispatch(startSaveNote());
    }

    const onFileInputChance = ({target}) => {
        if(target.files === 0) return;

        dispatch(startUploadingFiles(target.files));
    }

    const onDelete = () => {
        dispatch(startDeletingNote());
    }

  return (
    <Grid 
        container direction= 'row' 
        justifyContent= 'space-between' 
        alignItems='center' 
        sx= {{mb: 1}}
        className="animate__animated animate__fadeIn animate__faster"
        >
        
        {/* <form onSubmit={onSubmit}> */}
        <form >

            <Grid item>
                <Typography fontSize={39} fontWeight='light'>
                    {/* 28 de agosto, 2023 */}
                    {`Creada: ${dateString}`}
                </Typography>
            </Grid>

            <Grid item>

                <input 
                    type= 'file'
                    multiple
                    ref={fileInputRef}
                    onChange={onFileInputChance}
                    style= {{display: 'none'}}
                />
                <IconButton
                    color="primary"
                    disabled= {isSaving}
                    onClick= { () => fileInputRef.current.click() }
                >
                    <UploadOutlined 
                    
                    />
                </IconButton>

                <Button 
                    disabled = {isSaving}
                    color="primary" 
                    sx= {{padding: 2}}
                    // type="submit"
                    onClick = {onSaveNote}
                    >
                    <SaveOutlined sx={{fontSize: 30, mr: 1}} />
                    Guardar
                </Button>
            </Grid>

            <Grid container>

                <TextField 
                    type='text'
                    variant="filled"
                    fullWidth
                    placeholder="Ingrese un titulo"
                    label='Titulo'
                    sx={{border: 'none', mb: 1}}
                    name="title"  // lo necesito para enviarcelo al useForm
                    value={title} // lo necesito para enviarcelo al useForm
                    onChange={onInputChange}  // lo necesito para enviarcelo al useForm
                />

                <TextField 
                    type='text'
                    variant="filled"
                    fullWidth
                    multiline
                    placeholder="¿Que sucedio el dia de hoy?"
                    minRows={5}
                    name="body"  // lo necesito para enviarcelo al useForm
                    value={body} // lo necesito para enviarcelo al useForm
                    onChange={onInputChange}  // lo necesito para enviarcelo al useForm
                />

            </Grid>

            <Grid container justifyContent='end'>
                <Button
                    onClick={onDelete}
                    sx ={{mt: 2}}
                    color= 'error'
                >
                    <DeleteOutline />
                    Borrar
                </Button>
            </Grid>

            <ImageGallery images = {note.imageUrls}/>

        </form>

        

    </Grid>
  )
}
