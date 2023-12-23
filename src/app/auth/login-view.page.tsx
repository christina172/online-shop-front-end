import React, { useState } from 'react';

import { useAppDispatch } from "hooks";
import { useNavigate } from "react-router-dom";

// ============== MUI ==============
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

// ============== Redux ==============
import { useAuthSelector } from "./store/auth.selectors";
import { logInUser } from "./store/auth.actions";

// ============== Type ==============
import { LoginDto } from './types/login-dto.type';

// ============== Component ==============
import ErrorMessage from 'components/error-message.component';


const LoginPageView = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const auth = useAuthSelector();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const dto: LoginDto = {
      username: username,
      password: password
    };

    dispatch(logInUser({ dto }))
      .then(({ meta }) => {
        if (meta.requestStatus !== 'rejected') {
          setUsername('');
          setPassword('');
          navigate('/', { replace: true });
        }
      })
  };

  return (
    <>
      <Typography variant='h4' component='h1' sx={{textAlign: 'center', my: 3}}>Log In</Typography>
      <form onSubmit={handleSubmit}>
        <Stack sx={{maxWidth: '450px', mx: 'auto'}} spacing={2}>
          <TextField 
            id="username" 
            label="Username" 
            variant="outlined" 
            name="username"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            required
          />
          <TextField 
            id="password" 
            label="Password" 
            variant="outlined" 
            name="password"
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            inputProps={{
              minLength: 8
            }}
            required
          />
          <Button variant="contained" type='submit'>Log In</Button>
          {auth.errors.tokens && <ErrorMessage title="Error" text={auth.errors.tokens} />}
        </Stack>
      </form>
    </>
  )
};

export default LoginPageView;