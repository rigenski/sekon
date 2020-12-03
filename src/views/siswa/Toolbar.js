import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import { Box, Button, makeStyles } from '@material-ui/core';

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

  let selectedFile;
  const handleChange = event => {
    console.log(event);
  };

  // document.getElementById("button").addEventListener("click", () => {
  //   if (selectedFile) {
  //     let fileReader = new FileReader();
  //     fileReader.readAsBinaryString(selectedFile);
  //     fileReader.onload = (event) => {
  //       console.log(event.target.result);
  //       let data = event.target.result;
  //       let workbook = XLSX.read(data, { type: "binary" });
  //       console.log(workbook);
  //       workbook.SheetNames.forEach((sheet) => {
  //         let rowObject = XLSX.utils.sheet_to_row_object_array(
  //           workbook.Sheets[sheet]
  //         );
  //         console.log(rowObject);
  //         document.getElementById("json-data").innerHTML = JSON.stringify(
  //           rowObject
  //         );
  //       });
  //     };
  //   }
  // });

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Box display="flex" justifyContent="flex-end">
        <label htmlFor="file">
          <input
            accept=".xls,.xlsx"
            className={classes.input}
            onChange={e => handleChange(e)}
            id="file"
            type="file"
            hidden
          />
          <Button component="span" className={classes.importButton}>
            File
          </Button>
        </label>
        <Button id="button" className={classes.exportButton}>
          Export
        </Button>
      </Box>
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

export default Toolbar;
