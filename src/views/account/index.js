import React from 'react';
import { Container, Grid, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import Profile from './Profile';

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

  return (
    <Page className={classes.root} title="Account">
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item lg={12} md={12} xs={12}>
            <Profile position="centered" />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Account;
