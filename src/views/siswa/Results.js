import React, { useState } from 'react';
import clsx from 'clsx';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  makeStyles
} from '@material-ui/core';
import getInitials from 'src/utils/getInitials';

const useStyles = makeStyles(theme => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const Results = ({ className, siswas, ...rest }) => {
  const classes = useStyles();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleLimitChange = event => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <PerfectScrollbar>
        <Box minWidth={1050}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nama</TableCell>
                <TableCell>NIS</TableCell>
                <TableCell>Kelas</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {siswas.slice(0, limit).map(siswa => (
                <TableRow hover key={siswa.nis}>
                  <TableCell>
                    <Box alignItems="center" display="flex">
                      <Avatar className={classes.avatar} src={siswa.photo}>
                        {getInitials(siswa.nama)}
                      </Avatar>
                      <Typography color="textPrimary" variant="body1">
                        {siswa.nama}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{siswa.nis}</TableCell>
                  <TableCell>{siswa.kelas}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={siswas.length}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25, 100, 500]}
      />
    </Card>
  );
};

// Results.propTypes = {
//   className: PropTypes.string,
//   siswas: PropTypes.array.isRequired
// };

export default Results;
