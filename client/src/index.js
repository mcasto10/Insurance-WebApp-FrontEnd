import React from 'react';
import ReactDOM from 'react-dom'; // Import from 'react-dom'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './Components/Header.css';
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from 'recoil';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <RecoilRoot> 
        <App />
      </RecoilRoot>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
