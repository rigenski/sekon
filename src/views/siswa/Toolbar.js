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

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Box display="flex" justifyContent="flex-end">
        <input className={classes.input} id="import-file" type="file" hidden />
        <label htmlFor="import-file">
          <Button
            accept=".csv"
            component="span"
            className={classes.importButton}
          >
            File
          </Button>
        </label>
        <Button className={classes.exportButton}>Export</Button>
      </Box>
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

export default Toolbar;
