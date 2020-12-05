import React, { useState, useEffect, useContext } from 'react';
import { Box, Container, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import Results from './Results';
import Toolbar from './Toolbar';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const GuruListView = () => {
  const classes = useStyles();
  const [guru, setGurus] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const getData = await axios('https://sekon.herokuapp.com/api/v2/guru/');
      const res = getData.data;
      setGurus(res.result);
    };
    fetchData();
  }, []);

  return (
    <Page className={classes.root} title="Guru">
      <Container maxWidth={false}>
        <Toolbar />
        <Box mt={3}>
          <Results guru={guru} />
        </Box>
      </Container>
    </Page>
  );
};

export default GuruListView;
