import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
  makeStyles
} from '@material-ui/core';
import { AuthContext } from './../../App';

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    height: 100,
    width: 100
  }
}));

const Profile = ({ className, ...rest }) => {
  const classes = useStyles();
  const { state } = useContext(AuthContext);

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Box alignItems="center" display="flex" flexDirection="column">
          <Avatar className={classes.avatar} src={state.user.photo} />
          <Typography color="textPrimary" gutterBottom variant="h3">
            {state.user.nama}
          </Typography>
          <Typography color="textSecondary" gutterBottom variant="h5">
            Administrator
          </Typography>
          {/* <Typography color="textSecondary" variant="body1">
            {`${user.tagline}`}
          </Typography> */}
          {/* <Typography
            className={classes.dateText}
            color="textSecondary"
            variant="body1"
          >
            {`${moment().format('hh:mm A')} ${user.timezone}`}
          </Typography> */}
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <input
          className={classes.input}
          id="update-profile"
          type="file"
          hidden
        />
        <label htmlFor="update-profile">
          <Button color="primary" component="span" variant="text">
            Upload picture
          </Button>
        </label>
      </CardActions>
    </Card>
  );
};

Profile.propTypes = {
  className: PropTypes.string
};

export default Profile;
