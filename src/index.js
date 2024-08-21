import React from 'react';
import ReactDOM from 'react-dom/client'; 
import App from './App'; 
import './index.css'; 
import { NextUIProvider } from '@nextui-org/react'; 

// Create the root element where the React app will be mounted
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the React app inside the root element
root.render(
  <NextUIProvider>
    <App />
  </NextUIProvider>
);
