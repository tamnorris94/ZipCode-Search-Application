import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
//import App7 from './App7';
import App4 from './App4';
//import App6 from './App6';
//import ZipCodeSearchForm from './components/ZipSearchForm';
//import ZipCodeSearchResults from './components/ZipSearchResults';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    {/* <App />
    <App2 /> */}
    <App/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
