import 'react-perfect-scrollbar/dist/css/styles.css';
import React, { createContext, useReducer, useEffect } from 'react';
import { useRoutes, useNavigate } from 'react-router-dom';
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
    admin: 'https://sekon.herokuapp.com/api/v2/admin/',
    siswa: 'https://sekon.herokuapp.com/api/v2/siswa/',
    absen: 'https://sekon.herokuapp.com/api/v2/absen/',
    guru: 'https://sekon.herokuapp.com/api/v2/guru/'
  }
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      localStorage.setItem('user', JSON.stringify(action.payload.admin));
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('isAuthenticated', true);
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.admin,
        token: action.payload.token
      };

    case 'LOGOUT':
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.setItem('isAuthenticated', false);
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
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, initialState);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (user) {
    } else {
      navigate('/login', { replace: true });
    }
  }, []);

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
