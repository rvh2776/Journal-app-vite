import {Link as RouterLink} from "react-router-dom";
import { useMemo, useState } from "react";

import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"
import { AuthLayout } from "../layout/AuthLayout"
import { useForm } from "../../hooks";
import { useDispatch, useSelector } from "react-redux";
import { startCreatingUserWithEmailPassword } from "../../store/auth";



const formData = {
  email: '', // estos datos son los que queremos enviar con el useForm
  password: '',    // estos datos son los que queremos enviar con el useForm
  displayName: '', // estos datos son los que queremos enviar con el useForm
}

const formValidations = {

  email: [ (value) => value.includes('@'), 'El correo debe tener @' ],
  password: [ (value) => value.length >= 6, 'El password debe tener al menos 6 caracteres.' ],
  displayName: [ (value) => value.length >= 1, 'El nombre es obligatorio.' ],

}

export const RegisterPage = () => {

  const dispatch = useDispatch();

  const [formSubmitted, setFormSubmitted] = useState(false);

  const {status, errorMessage} = useSelector((state) => state.auth);

  const isCheckingAuthentication = useMemo(() => status === 'checking', [status]);

  const {
    formState, displayName, email, password, onInputChange,
    isFormValid, displayNameValid, emailValid, passwordValid,
  } = useForm(formData, formValidations);


  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);

    if (!isFormValid) return;
    
    dispatch(startCreatingUserWithEmailPassword(formState));
  }


  return (
    <AuthLayout title="Crear cuenta">

      <form onSubmit={onSubmit}>

        <Grid container>

        <Grid item xs={12} sx= {{mt: 2}}>
            <TextField
              label="Nombre completo" 
              type="text" 
              placeholder="Tu nombre"
              fullWidth
              name="displayName"  // lo necesito para enviarcelo al useForm
              value={displayName} // lo necesito para enviarcelo al useForm
              onChange={onInputChange}  // lo necesito para enviarcelo al useForm
              error = {!!displayNameValid && formSubmitted}
              helperText = {displayNameValid}
            />
          </Grid>

          <Grid item xs={12} sx= {{mt: 2}}>
            <TextField
              label="Correo" 
              type="email" 
              placeholder="correo@gmail.com"
              fullWidth
              name="email"  // lo necesito para enviarcelo al useForm
              value={email} // lo necesito para enviarcelo al useForm
              onChange={onInputChange}  // lo necesito para enviarcelo al useForm
              error = {!!emailValid && formSubmitted}
              helperText = {emailValid}
            />
          </Grid>

          <Grid item xs={12} sx= {{mt: 2}}>
            <TextField 
              label="Contraseña" 
              type="password" 
              placeholder="Contraseña"
              fullWidth
              name="password"  // lo necesito para enviarcelo al useForm
              value={password} // lo necesito para enviarcelo al useForm
              onChange={onInputChange}  // lo necesito para enviarcelo al useForm
              error = {!!passwordValid && formSubmitted}
              helperText = {passwordValid}
            />
          </Grid>

          <Grid container spacing={2} sx={{mb: 2, mt: 1}}>

          <Grid 
            item 
            xs={12}
            display= {!!errorMessage ? '' : 'none'}
          >
              <Alert severity="error">
                {errorMessage}
              </Alert>
            </Grid>

            <Grid item xs={12}>
              <Button 
                variant="contained"
                fullWidth
                type="submit"
                disabled= {isCheckingAuthentication}
              >
                Crear cuenta
              </Button>
            </Grid>

          </Grid>

          <Grid container direction='row' justifyContent='end'>
            <Typography sx={{mr: 1}}> ¿Ya tienes cuenta?</Typography>
            <Link component={RouterLink} color='inherit' to='/auth/login'>
              ingresar
            </Link>
          </Grid>  

        </Grid>

      </form>

    </AuthLayout>
  )
}
