import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Amplify } from 'aws-amplify'
import amplifyconfig from './amplifyconfiguration.json';
import App from './App';  
import reportWebVitals from './reportWebVitals';


Amplify.configure(amplifyconfig);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

reportWebVitals()
