import React from 'react';
import { Navigate } from 'react-router-dom';
import { Container, Grid, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import Profile from './Profile';
// import ProfileDetails from './ProfileDetails';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Account = () => {
  const classes = useStyles();
  const status = localStorage.getItem('isAuthenticated');

  // if (!status) {
  //   return <Navigate to="/login" />;
  // }

  return (
    <Page className={classes.root} title="Account">
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item lg={12} md={12} xs={12}>
            <Profile position="centered" />
          </Grid>
          {/* <Grid item lg={8} md={6} xs={12}>
            <ProfileDetails />
          </Grid> */}
        </Grid>
      </Container>
    </Page>
  );
};

export default Account;
