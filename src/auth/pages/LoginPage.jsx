import {Link as RouterLink} from "react-router-dom";

import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material";
import { Google } from "@mui/icons-material";
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks";
import { useDispatch, useSelector } from "react-redux";
import { useMemo } from "react";
import { startGoogleSignIn, startLoginWithEmailPassword } from "../../store/auth/thunks";


const formData = {
  email: '', // estos datos son los que queremos enviar con el useForm
  password: '',    // estos datos son los que queremos enviar con el useForm
}

export const LoginPage = () => {
  
  const {status, errorMessage} = useSelector((state) => state.auth);
  const dispatch = useDispatch();


  const {email, password, onInputChange} = useForm(formData);

  const isAuthenticating = useMemo(() => status === 'checking', [status]);
  

  const onSubmit = (event) => {
    event.preventDefault();

    // console.log({email, password})
    dispatch(startLoginWithEmailPassword({email, password})); 
  
  }

  const onGoogleSignIn = () => {

    console.log('onGoogleSignIn')
    dispatch(startGoogleSignIn())
  }

  return (
    <AuthLayout title="Login">

      <form onSubmit={onSubmit} className="animate__animated animate__fadeIn animate__faster">

        <Grid container>
          <Grid item xs={12} sx= {{mt: 2}}>
            <TextField 
              label="Correo" 
              type="email" 
              placeholder="correo@gmail.com"
              fullWidth
              name="email"  // lo necesito para enviarcelo al useForm
              value={email} // lo necesito para enviarcelo al useForm
              onChange={onInputChange}  // lo necesito para enviarcelo al useForm
            />
          </Grid>

          <Grid item xs={12} sx= {{mt: 2}}>
            <TextField 
              label="Contraseña" 
              type="password" 
              placeholder="Contraseña"
              fullWidth
              name="password"   // lo necesito para enviarcelo al useForm
              value={password}  // lo necesito para enviarcelo al useForm
              onChange={onInputChange}  // lo necesito para enviarcelo al useForm
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

            <Grid item xs={12} sm={6}>

              <Button
                disabled = {isAuthenticating}
                variant="contained" 
                fullWidth
                type="submit"
              >
                Login
              </Button>
            </Grid>

            <Grid item xs={12} sm={6}>

              <Button
                disabled = {isAuthenticating}
                variant="contained" 
                fullWidth
                onClick={onGoogleSignIn}
              >

                <Google /> 
                <Typography sx={{ml: 1}}>Google</Typography>
              </Button>
            </Grid>

          </Grid>

          <Grid container direction='row' justifyContent='end'>
            <Link component={RouterLink} color='inherit' to='/auth/register'>
              Crear una cuenta
            </Link>
          </Grid>  

        </Grid>

      </form>

    </AuthLayout>
  )
}
