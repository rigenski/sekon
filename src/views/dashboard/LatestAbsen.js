import React, { useState, useContext, useEffect } from 'react';
import clsx from 'clsx';
import axios from 'axios';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import {
  Box,
  Card,
  CardHeader,
  Chip,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  makeStyles
} from '@material-ui/core';
import { AuthContext } from './../../App';

const useStyles = makeStyles(() => ({
  root: {},
  actions: {
    justifyContent: 'flex-end'
  }
}));

const LatestOrders = ({ className, ...rest }) => {
  const classes = useStyles();
  const { state } = useContext(AuthContext);
  const [absen, setAbsen] = useState([]);
  const token = localStorage.getItem('token');

  const fetchData = () => {
    let config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      }
    };

    axios
      .get(state.api.absen, config)
      .then(res => {
        setAbsen(res.data.result);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardHeader title="Latest Absen" />
      <Divider />
      <PerfectScrollbar>
        <Box minWidth={800}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>NIS</TableCell>
                <TableCell>Nama</TableCell>
                <TableCell>Kelas</TableCell>
                <TableCell>Jam</TableCell>
                <TableCell>Tanggal</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {absen
                .slice(0, 10)
                .reverse()
                .map(absen => (
                  <TableRow hover key={absen._id}>
                    <TableCell>{absen.nis}</TableCell>
                    <TableCell>{absen.nama}</TableCell>
                    <TableCell>{absen.kelas}</TableCell>
                    <TableCell>{absen.hour}</TableCell>
                    <TableCell>{absen.date}</TableCell>
                    <TableCell>
                      <Chip color="primary" label={absen.status} size="small" />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
    </Card>
  );
};

LatestOrders.propTypes = {
  className: PropTypes.string
};

export default LatestOrders;
