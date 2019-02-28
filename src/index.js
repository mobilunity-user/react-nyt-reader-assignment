import React from 'react';
import ReactDOM from 'react-dom';
import { StoreContext } from 'redux-react-hook';
import theme from './theme';
import store from './store';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import ThemeProvider from '@material-ui/styles/ThemeProvider';

ReactDOM.render(
  <StoreContext.Provider value={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </StoreContext.Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
