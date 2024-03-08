import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { ConfigProvider } from 'antd';
import { Provider } from 'react-redux';
import store from "./redux/store.js";

const root = document.getElementById('root');

createRoot(root).render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider
        componentSize="middle"
        theme={{
          colorPrimary:"#141E46",
          colorBorder:"#141E46",
        }}
      >
        <App/>
      </ConfigProvider>
    </Provider>
  </React.StrictMode>
);
