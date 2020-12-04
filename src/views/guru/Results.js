import React, { useState } from 'react';
import clsx from 'clsx';
import PerfectScrollbar from 'react-perfect-scrollbar';
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

const Results = ({ className, guru, ...rest }) => {
  const classes = useStyles();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleLimitChange = event => {
    setLimit(event.target.value);
  };

  const handlePageChange = newPage => {
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
                <TableCell>Wali</TableCell>
                <TableCell>Email</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {guru.slice(0, limit).map(guru => (
                <TableRow hover key={guru._id}>
                  <TableCell>
                    <Box alignItems="center" display="flex">
                      <Avatar className={classes.avatar} src={guru.photo}>
                        {getInitials(guru.nama)}
                      </Avatar>
                      <Typography color="textPrimary" variant="body1">
                        {guru.nama}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{guru.wali}</TableCell>
                  <TableCell>{guru.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={guru.length}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25, 100, 500]}
      />
    </Card>
  );
};

export default Results;
