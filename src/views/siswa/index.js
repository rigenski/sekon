import React, { useState, useEffect, useContext } from 'react';
import { Box, Container, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import Results from './Results';
import Toolbar from './Toolbar';
import axios from 'axios';
import { AuthContext } from './../../App';

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
  const { state } = useContext(AuthContext);
  const [siswas, setSiswas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const getData = await axios(state.api.siswa);
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
