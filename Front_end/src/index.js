import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { PersistGate } from 'redux-persist/integration/react';
import 'react-toastify/dist/ReactToastify.min.css';
import 'react-quill/dist/quill.snow.css';

import { store, persistor } from './redux/store';
import App from './App';
import { GlobalStyle } from './components/global_style';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <GlobalStyle>
                <App />
            </GlobalStyle>

            <ToastContainer />
        </PersistGate>
    </Provider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
