import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { store } from './redux/store/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const client = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store = {store}>
      <QueryClientProvider client = {client}>
        <App />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);