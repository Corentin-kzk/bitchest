import { createBrowserRouter } from "react-router-dom";
import SignIn from "../components/templates/SingIn";
import IndexPage from "../pages/Index";
import Dashboard from "../components/templates/Dashboard";
import ProtectedAdmin from "../components/templates/ProtectedAdmin";
import { linkUrl } from "../utils/linkUrl";
import UsersPage from "../pages/Users";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SignIn />,
  },
  {
    path: linkUrl.home,
    element: <Dashboard />,
    children: [
      {
        path: "",
        element: <IndexPage />,
      },
      {
        path: linkUrl.admin,
        element: <ProtectedAdmin />,
        children: [
          {
            path: linkUrl.users,
            element: <UsersPage />
          }
        ]
      },
    ],

  },
]);

export default router;
