import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Link, useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios'
import { CircularProgress } from '@mui/material';
import Spinner from '../../utils/Spinner';
const theme = createTheme();

export default function SignUp() {
  const [loading,setLoading] = useState(false);
  const [pic, setPic] = useState('https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg');
  const url = "https://api.cloudinary.com/v1_1/dkf6a0vcp/image/upload"
  let navigate = useNavigate();

  const handleSubmit = (event) => {
   event.preventDefault();
   const data = new FormData(event.currentTarget);
   const userData = {
      first_name:data.get('firstName'),
      last_name:data.get('lastName'),
      email: data.get('email'),
      password: data.get('password'),
      pic:pic
    };
    const myurl = "http://localhost:5000/register"

    fetch(myurl, {
      method: "POST",
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(userData)
    })
    .then(res=>res.json())
    .then(data=>{
      const code = data.status;
      if(code==400) {alert("All inputs are required");}
      else if(code==409) alert("user already exists please log in to continue");
      else if(code==201) {
        console.log(data);
        localStorage.setItem('token', data.user.user.token)
        localStorage.setItem('user', JSON.stringify(data.user.user))
        localStorage.setItem('userId',data.user.user.userId)
        navigate('/main/notes')
        }
      else{alert("network error please try again later")}
    })
    .catch(err=>console.log("err",err));
  };

  const postDetail = async (pics) => {
    setLoading(true);
    if(pics===undefined){
      alert("please select image")
      return;
    }
    if(pics.type === "image/jpeg" || pics.type === "image/png"){
      const data = new FormData();
      data.append('file',pics);
      data.append('upload_preset','DizzyAlb');
      data.append('cloud_name','dkf6a0vcp');
      try {
        const imgData = await axios.post(url,data)
        setPic(imgData.data.url.toString());
        setLoading(false);
      } catch (error) {
        console.log(error," --error");
        setLoading(false);
      }
    }
    else{
      alert("image type is not supported")
      setLoading(false);
      return;
    }
  };


  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <label htmlFor="upload-photo">
            <input
              style={{ display: 'none' }}
              id="upload-photo"
              name="upload-photo"
              accept="image/*"
              type="file"
              loading="true"
              onChange={(e) => postDetail(e.target.files[0])}
            />

          <Button sx={{mt:3}} variant="contained" component="span">
            {loading?<>uploading...<Spinner/></>:" Upload photo "}
          </Button>
          </label>

          
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to='/login'>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

