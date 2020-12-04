import React, { useState, useContext } from 'react';
import { Box, Container, Grid, makeStyles } from '@material-ui/core';
import moment from 'moment';
import Page from 'src/components/Page';
import Toolbar from './Toolbar';
import ToolbarButtom from './ToolbarButtom';
import ProductCard from './ProductCard';
import data from './data';
import { AuthContext } from './../../App';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  productCard: {
    height: '100%'
  }
}));

const ProductList = () => {
  const classes = useStyles();
  const date = moment().format('YYYY-MM-DD');
  const [products] = useState(data);
  const { state } = useContext(AuthContext);

  return (
    <Page className={classes.root} title="Absen">
      <Container maxWidth={false}>
        <Toolbar />
        <Box mt={3} mb={3}>
          <Grid container spacing={3}>
            {products.map(product => (
              <Grid item key={product.id} lg={4} md={6} xs={12}>
                <ProductCard
                  className={classes.productCard}
                  product={product}
                  api={state.api.absen}
                  date={date}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
        <ToolbarButtom api={state.api.absen} date={date} />
      </Container>
    </Page>
  );
};

export default ProductList;
