import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { Box, Button, makeStyles } from '@material-ui/core';
import { AuthContext } from './../../App';

const useStyles = makeStyles(theme => ({
  root: {},
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  }
}));

const Toolbar = ({ className, api, date, ...rest }) => {
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

  let dataToday;

  const fetchDataToday = async () => {
    const fetch = await axios.get(state.api.absen + date, config);
    dataToday = fetch.data.result;
  };

  const absenToday = () => {
    const worksheet = XLSX.utils.json_to_sheet(dataToday);
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

  let dataAll;

  const fetchDataAll = async () => {
    const fetch = await axios.get(state.api.absen, config);
    dataAll = fetch.data.result;
  };

  const absenAll = () => {
    const worksheetAll = XLSX.utils.json_to_sheet(dataAll);
    const workbookAll = {
      Sheets: {
        data: worksheetAll
      },
      SheetNames: ['data']
    };
    const excelBufferAll = XLSX.write(workbookAll, {
      bookType: 'xlsx',
      type: 'array'
    });
    saveAsExcel(excelBufferAll, 'absenAll');
  };

  function blobToFile(theBlob, fileName) {
    theBlob.lastModifiedDate = new Date();
    theBlob.name = fileName;
    return theBlob;
  }

  function saveAsExcel(buffer, filename) {
    const data = new Blob([buffer], { type: EXCEL_TYPE });
    const test = blobToFile(data, `${filename}.xlsx`);
    // console.log(blobToFile(data, `${filename}.xlsx`));
    saveAs(test, filename + '_export_' + date + EXCEL_EXTENSION);
  }

  useEffect(() => {
    fetchDataToday();
    fetchDataAll();
  });

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Box display="flex" justifyContent="flex-end">
        <Button
          className={classes.exportButton}
          color="primary"
          variant="contained"
          onClick={() => absenToday()}
        >
          Download Hari Ini
        </Button>
        <Button color="primary" variant="contained" onClick={() => absenAll()}>
          Download Semua
        </Button>
      </Box>
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

export default Toolbar;
