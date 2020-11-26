import React from 'react';

const Logo = props => {
  return (
    <img
      alt="Logo"
      src="/static/logo.svg"
      style={{ height: 2.6 + 'em' }}
      {...props}
    />
  );
};

export default Logo;
