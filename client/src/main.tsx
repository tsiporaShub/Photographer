import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.tsx'
// import './index.css'
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme.ts';
import TopNavComponent from './components/topNav.component'
import SigninFormComponent from './components/signin.component.tsx'
import SignupFormComponent from './components/signup.component.tsx'
import OrderFormComponent from './components/orderPackage.tsx'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      {/* <App /> */}
      <TopNavComponent></TopNavComponent>
      <SigninFormComponent></SigninFormComponent>
      <SignupFormComponent></SignupFormComponent>
      <OrderFormComponent></OrderFormComponent>
    </ThemeProvider>
  </React.StrictMode>,
)
