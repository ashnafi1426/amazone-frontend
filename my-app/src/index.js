import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { DataProvider } from './components/Dataprovider/Dataprovider';
import { initialState, reducer } from './Utility/Reducer';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <DataProvider reducer={reducer} initialState={initialState}>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </DataProvider>
  </React.StrictMode>
);
