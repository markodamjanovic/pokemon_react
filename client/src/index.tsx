import * as React from 'react';
import * as ReactDOM from "react-dom";

import App from './App';
import './index.scss';

var mountNode = document.getElementById("app");
ReactDOM.render(<App />, mountNode);
