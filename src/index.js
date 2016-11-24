import App from './app';
import React from 'react';
import ReactDom from 'react-dom';
import "babel-polyfill";

ReactDom.render(
  <App />,
  document.getElementById('app')
);