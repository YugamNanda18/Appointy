import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App'

import AppContextProvider from './context/AppContext'
import AdminContextProvider from './context/AdminContext'
import DoctorContextProvider from './context/DoctorContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AppContextProvider>
      <AdminContextProvider>
        <DoctorContextProvider>
          <App />
        </DoctorContextProvider>
      </AdminContextProvider>
    </AppContextProvider>
  </BrowserRouter>
)