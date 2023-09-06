import { createBrowserRouter } from 'react-router-dom'
import SignIn from '@components/organism/SingIn'
import IndexPage from '@pages/Index'
import Dashboard from '@components/organism/Dashboard'
import { linkUrl } from '../utils/linkUrl'
import UsersPage from '@pages/Users'
import ProtectedAdmin from '@components/middleware/MiddlewareAdmin'
import IsConnected from '@components/middleware/MiddlewareConected'
import { Page500 } from '@pages/Page500'
import { CryptoPage } from '@pages/CryptoPage'
import { Page404 } from '@pages/Page404'
import WalletPage from '@pages/WalletPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <SignIn />,
  },
  {
    path: '/500',
    element: <Page500 />,
  },
  {
    path: '*',
    element: <Page404 />,
  },
  {
    path: '',
    element: <IsConnected />,
    children: [
      {
        path: linkUrl.home,
        element: <Dashboard />,
        children: [
          {
            path: '',
            element: <IndexPage />,
          },
          {
            path: linkUrl.cryptoId,
            element: <CryptoPage />,
          },
          {
            path: linkUrl.wallet,
            element: <WalletPage />,
          },
          {
            path: linkUrl.admin,
            element: <ProtectedAdmin />,
            children: [
              {
                path: linkUrl.users,
                element: <UsersPage />,
              },
            ],
          },
        ],
      },
    ],
  },
])

export default router
