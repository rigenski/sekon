import 'react-perfect-scrollbar/dist/css/styles.css';
import React, { createContext, useReducer } from 'react';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import 'src/mixins/chartjs';
import theme from 'src/theme';
import routes from 'src/routes';

export const AuthContext = createContext();

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  api: {
    admin: 'http://sekon.herokuapp.com/api/v2/admin/',
    siswa: 'http://sekon.herokuapp.com/api/v2/siswa/',
    absen: 'http://sekon.herokuapp.com/api/v2/absen/',
    guru: 'http://sekon.herokuapp.com/api/v2/guru/'
  }
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      localStorage.setItem('user', JSON.stringify(action.payload.admin));
      localStorage.setItem('token', JSON.stringify(action.payload.token));
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.admin,
        token: action.payload.token
      };

    case 'LOGOUT':
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null
      };
    default:
      return state;
  }
};

const App = () => {
  const routing = useRoutes(routes);
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ThemeProvider theme={theme}>
      <AuthContext.Provider
        value={{
          state,
          dispatch
        }}
      >
        <GlobalStyles />
        {routing}
      </AuthContext.Provider>
    </ThemeProvider>
  );
};

export default App;
