import { RouterProvider } from 'react-router'
import { customerRouter } from './customer-router'

export default function CustomerApp() {
  return <RouterProvider router={customerRouter} />
}