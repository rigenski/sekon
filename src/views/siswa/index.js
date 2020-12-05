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

const SiswaListView = () => {
  const classes = useStyles();
  const [siswas, setSiswas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const getData = await axios('https://sekon.herokuapp.com/api/v2/siswa');
      const res = getData.data;
      setSiswas(res.result);
    };
    fetchData();
  }, []);

  return (
    <Page className={classes.root} title="Siswa">
      <Container maxWidth={false}>
        <Toolbar />
        <Box mt={3}>
          <Results siswas={siswas} />
        </Box>
      </Container>
    </Page>
  );
};

export default SiswaListView;
