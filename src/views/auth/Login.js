import React, { useState, useContext } from 'react';
import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Avatar,
  Box,
  Button,
  Container,
  TextField,
  CardContent,
  Typography,
  makeStyles
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import Page from 'src/components/Page';
import { AuthContext } from './../../App';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3)
  },
  statsItem: {
    alignItems: 'center',
    display: 'flex'
  },
  avatar: {
    height: 120,
    width: 120,
    marginBottom: theme.spacing(8)
  }
}));

const LoginView = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const { state, dispatch } = useContext(AuthContext);

  const initialState = {
    email: '',
    password: '',
    isSubmitting: false,
    errorMessage: null
  };

  const [data, setData] = useState(initialState);

  const handleInputChange = event => {
    setData({
      ...data,
      [event.target.name]: event.target.value
    });
  };

  const handleFormSubmit = event => {
    event.preventDefault();
    setData({
      ...data,
      isSubmitting: true,
      errorMessage: null
    });

    const requestBody = {
      email: data.email,
      password: data.password
    };

    const config = {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Contet-Type': 'application/json'
      }
    };

    axios
      .post(`${state.api.admin}signin`, requestBody, config)
      .then(res => {
        if (res.data.status === 'sukses') {
          dispatch({
            type: 'LOGIN',
            payload: res.data
          });
          navigate('/app/dashboard', { replace: true });
        } else {
          setData({
            ...data,
            isSubmitting: false,
            errorMessage: res.data.message
          });
        }

        throw res;
      })
      .catch(err => {});
  };

  if (data.errorMessage === null) {
  } else {
    ReactDOM.render(
      <Alert severity="error">{data.errorMessage}</Alert>,
      document.getElementById('alert-handler')
    );
  }

  return (
    <Page className={classes.root} title="Login">
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          <CardContent align="center">
            <Avatar className={classes.avatar} src="/static/logo.svg" />
            <Typography
              align="center"
              color="primary"
              gutterBottom
              variant="h1"
              value="bold"
            >
              WELCOME TO SEKON
            </Typography>
          </CardContent>
          <Formik
            initialValues={{
              email: '',
              password: ''
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .email('Must be a valid email')
                .max(255),
              password: Yup.string().max(255)
            })}
            onSubmit={() => {
              navigate('/app/dashboard', { replace: true });
            }}
          >
            {({ errors, handleBlur, touched }) => (
              <form onSubmit={handleFormSubmit}>
                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label="Email Address"
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleInputChange}
                  type="email"
                  value={data.email}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Password"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleInputChange}
                  type="password"
                  value={data.password}
                  variant="outlined"
                />

                <Box my={2}>
                  <Button
                    color="primary"
                    disabled={data.isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    {data.isSubmitting ? '...loading' : 'login'}
                  </Button>
                </Box>
                <div id="alert-handler"></div>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </Page>
  );
};

export default LoginView;
