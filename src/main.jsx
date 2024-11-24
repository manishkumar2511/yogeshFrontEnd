import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from './redux/store'
import { ToastContainer, Flip } from 'react-toastify';
import { PrimeReactProvider } from "primereact/api";
import "react-toastify/dist/ReactToastify.css";
import "primereact/resources/primereact.css";
import "primereact/resources/themes/lara-light-cyan/theme.css";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ToastContainer transition={Flip} autoClose={2000} />
      <Provider store={store}>
        <PrimeReactProvider>
          <App />
        </PrimeReactProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>,
)
