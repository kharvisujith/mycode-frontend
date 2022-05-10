import React from 'react';
import ReactDOM from 'react-dom';
import './Layouts/index.css';
import App from './Layouts/App';
import { Router } from 'react-router-dom';
//import reportWebVitals from './reportWebVitals';
import { createBrowserHistory } from 'history'
import { StoreProvider } from './context/StoreContext';

import { Provider } from 'react-redux';
import { store } from './store/configureStore';
import { fetchProductsAsync } from './Features/catalog/catalogSlice';
export const history = createBrowserHistory()

store.dispatch(fetchProductsAsync())


ReactDOM.render(
  <React.StrictMode>
    <Router history={history}>
      <StoreProvider>
        <Provider store={store}>
        <App />
        </Provider>
      
      </StoreProvider>
    
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
