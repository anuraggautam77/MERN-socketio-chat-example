import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './style/css/index.scss';
import App from './App';

const appId = 'app-wrapper';
ReactDOM.render(<BrowserRouter><App/></BrowserRouter>, document.getElementById(appId));