import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { Container, Grid, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import Profile from './Profile';
import ProfileDetails from './ProfileDetails';
import { AuthContext } from './../../App';

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
  const { state } = useContext(AuthContext);

  if (!state.isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <Page className={classes.root} title="Account">
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item lg={4} md={6} xs={12}>
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
