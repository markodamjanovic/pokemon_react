import * as React from 'react';
import * as ReactDOM from "react-dom";
import { Provider } from 'react-redux';

import App from './App';
import { store } from './app/store';
import './index.scss';

var mountNode = document.getElementById("app");
ReactDOM.render(<Provider store={store}> <App /> </Provider>, mountNode);