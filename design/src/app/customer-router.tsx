import { createBrowserRouter } from 'react-router'
import CustomerLogin from './pages/CustomerLogin'
import CustomerForgot from './pages/CustomerForgot'
import CustomerSetPassword from './pages/CustomerSetPassword'
import CustomerOTP from './pages/CustomerOTP'
import CustomerPortal from './pages/CustomerPortal'

export const customerRouter = createBrowserRouter([
  { path: '/login', Component: CustomerLogin },
  { path: '/forgot', Component: CustomerForgot },
  { path: '/set-password', Component: CustomerSetPassword },
  { path: '/otp', Component: CustomerOTP },
  { path: '/portal', Component: CustomerPortal },
])