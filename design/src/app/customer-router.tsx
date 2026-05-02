import { createBrowserRouter } from 'react-router'
import CustomerLogin from './pages/CustomerLogin'
import CustomerSignup from './pages/CustomerSignup'
import CustomerForgot from './pages/CustomerForgot'
import CustomerSetPassword from './pages/CustomerSetPassword'
import CustomerOTP from './pages/CustomerOTP'
import CustomerPortal from './pages/CustomerPortal'
import CustomerProtectedRoute from './components/CustomerProtectedRoute'

export const customerRouter = createBrowserRouter([
  { path: '/login', Component: CustomerLogin },
  { path: '/signup', Component: CustomerSignup },
  { path: '/forgot', Component: CustomerForgot },
  { path: '/set-password', Component: CustomerSetPassword },
  { path: '/otp', Component: CustomerOTP },
  {
    path: '/portal',
    Component: CustomerProtectedRoute,
    children: [{ index: true, Component: CustomerPortal }],
  },
])