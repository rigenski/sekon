import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import axios from 'axios';
import XLSX from 'xlsx';
import { saveAs } from 'file-saver';

import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  makeStyles
} from '@material-ui/core';
import { AuthContext } from './../../App';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  statsItem: {
    alignItems: 'center',
    display: 'flex'
  },
  statsIcon: {
    marginRight: theme.spacing(1)
  }
}));

const ProductCard = ({ className, product, api, date, ...rest }) => {
  const classes = useStyles();
  const { state } = useContext(AuthContext);

  const token = localStorage.getItem('token');

  const EXCEL_TYPE =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';

  const EXCEL_EXTENSION = '.xlsx';

  let config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    }
  };

  let data;

  const fetchData = async () => {
    const fetch = await axios.get(
      state.api.absen + date + '/' + product.kelas,
      config
    );
    data = fetch.data.result;
  };

  const absen = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = {
      Sheets: {
        data: worksheet
      },
      SheetNames: ['data']
    };
    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array'
    });
    saveAsExcel(excelBuffer, 'absen');
  };

  function saveAsExcel(buffer, filename) {
    const data = new Blob([buffer], { type: EXCEL_TYPE });
    saveAs(
      data,
      filename + '_' + product.kelas + '_export_' + date + EXCEL_EXTENSION
    );
  }

  useEffect(() => {
    fetchData();
  });

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Box display="flex" justifyContent="center" mb={3}>
          <Avatar alt="Product" src={product.media} variant="square" />
        </Box>
        <Typography
          align="center"
          color="textPrimary"
          gutterBottom
          variant="h4"
        >
          {product.kelas}
        </Typography>
      </CardContent>
      <Box flexGrow={1} />
      <Divider />
      <Box p={2}>
        <Grid container justify="space-between" spacing={2}>
          <Grid className={classes.statsItem} item></Grid>
          <Grid className={classes.statsItem} item>
            <Button color="primary" variant="contained" onClick={() => absen()}>
              Download Absen
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};

ProductCard.propTypes = {
  className: PropTypes.string,
  product: PropTypes.object.isRequired
};

export default ProductCard;
