import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import XLSX from 'xlsx';
import ReactDOM from 'react-dom';
import axios from 'axios';
import clsx from 'clsx';
import Alert from '@material-ui/lab/Alert';
import { AuthContext } from '../../App';

import { Box, Button, makeStyles, Input } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {},
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  }
}));

const Toolbar = ({ className, ...rest }) => {
  const classes = useStyles();
  const { state } = useContext(AuthContext);

  let selectedFile;

  const handleChange = event => {
    selectedFile = event.target.files[0];
  };

  const handleClick = () => {
    if (selectedFile) {
      const fileReader = new FileReader();
      fileReader.readAsBinaryString(selectedFile);
      fileReader.onload = event => {
        let data = event.target.result;
        let workbook = XLSX.read(data, { type: 'binary' });

        workbook.SheetNames.forEach(sheet => {
          let rowObject = XLSX.utils.sheet_to_row_object_array(
            workbook.Sheets[sheet]
          );
          const config = {
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Contet-Type': 'application/json'
              // Authorization: 'Bearer ' + token
            }
          };
          console.log(rowObject);

          rowObject.map(row =>
            axios
              .post(
                'http://sekon.herokuapp.com/api/v2/guru/',
                {
                  email: row.email,
                  wali: row.wali,
                  nama: row.nama,
                  password: row.password
                },
                config
              )
              .then(res => {
                ReactDOM.render(
                  <Alert severity="success">Guru berhasil ditambahkan</Alert>,
                  document.getElementById('alert-handler')
                );
              })
          );
        });
      };
    }
  };

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Box display="flex" justifyContent="flex-end">
        <Input
          accept=".xls,.xlsx"
          className={classes.input}
          onChange={e => handleChange(e)}
          id="file"
          type="file"
          component="span"
        >
          File
        </Input>
        <Button
          id="button"
          onClick={() => {
            handleClick();
          }}
          className={classes.exportButton}
        >
          Export
        </Button>
      </Box>
      <div id="alert-handler"></div>
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

export default Toolbar;
