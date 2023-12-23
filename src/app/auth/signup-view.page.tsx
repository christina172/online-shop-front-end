import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

// ============== MUI ==============
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

// ============== Redux ==============
import { useAppDispatch } from "hooks";
import { useAuthSelector } from "./store/auth.selectors";
import { signUpUser } from "./store/auth.actions";

// ============== Type ==============
import { SignupDto } from './types/signup-dto.type';

// ============== Component ==============
import ErrorMessage from 'components/error-message.component';


const SignupPageView = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const auth = useAuthSelector();

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const dto: SignupDto = {
      name: name,
      username: username,
      password: password
    };

    dispatch(signUpUser({ dto }))
      .then(({ meta }) => {
        if (meta.requestStatus !== 'rejected') {
          setName('');
          setUsername('');
          setPassword('');
          navigate('/auth/log_in', { replace: true });
        }
      })
  };

  return (
    <>
      <Typography variant='h4' component='h1' sx={{textAlign: 'center', my: 3}}>Sign Up</Typography>
      <form onSubmit={handleSubmit}>
        <Stack sx={{maxWidth: '450px', mx: 'auto'}} spacing={2}>
        <TextField 
            id="name" 
            label="Name" 
            variant="outlined" 
            name="name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            required
          />
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
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            type="password"
            inputProps={{
              minLength: 8
            }}
            required
          />
          <Button variant="contained" type='submit'>Create Account</Button>
          {auth.errors.tokens && <ErrorMessage title="Error" text={auth.errors.tokens} />}
        </Stack>
      </form>
    </>
  )
};

export default SignupPageView;