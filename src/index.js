import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import {NextUIProvider} from "@nextui-org/react";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<NextUIProvider>
<App />
</NextUIProvider>
);
