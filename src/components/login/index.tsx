import React, { useState, ChangeEvent } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Box, TextField, Grid, Button, Typography } from '@material-ui/core';
import { makeLogin } from '../../actions/login';

interface LoginState {
  email: string;
  password: string;
}

interface LoginProps {
  makeLogin: Function
}

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(3),
      width: '100%',
    },
  },
}));

const _Login: React.FC<LoginProps> = ({ makeLogin }): JSX.Element => {
  const [state, setState] = useState<LoginState>({
    email: '',
    password: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = (): void => {
    makeLogin(state);
  }

  const classes = useStyles();

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      bgcolor="background.paper"
      height={'100vh'}
    >
      <Grid item xs={4}>
        <Box height={400} display="flex" flexDirection="column">
          <Typography variant="h4" component="h2" align="center">
            PMS Login
          </Typography>
          <form className={classes.root}>
            <TextField
              label="Email"
              name="email"
              type="text"
              value={state.email}
              variant="outlined"
              onChange={handleChange}
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              value={state.password}
              variant="outlined"
              onChange={handleChange}
            />
            <Button variant="contained" color="primary" size="large" onClick={handleSubmit}>
              LOGIN
            </Button>
          </form>
        </Box>
      </Grid>
    </Box>
  );
}


export const Login = connect(null, {
  makeLogin
})(_Login);