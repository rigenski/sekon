import React from 'react';
import { Container, Grid, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import TotalGuru from './TotalGuru';
import LatestAbsen from './LatestAbsen';
import TotalSiswa from './TotalSiswa';
import TotalKelas from './TotalKelas';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Dashboard = () => {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="Dashboard">
      <Container maxWidth={false}>
        <Grid container spacing={3}>
          <Grid item lg={4} sm={6} xl={4} xs={12}>
            <TotalGuru />
          </Grid>
          <Grid item lg={4} sm={6} xl={4} xs={12}>
            <TotalSiswa />
          </Grid>
          <Grid item lg={4} sm={6} xl={4} xs={12}>
            <TotalKelas />
          </Grid>
          <Grid item lg={12} md={12} xl={12} xs={12}>
            <LatestAbsen />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Dashboard;
