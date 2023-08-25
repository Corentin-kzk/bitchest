import { createBrowserRouter } from "react-router-dom";
import SignIn from "../components/templates/SingIn";
import Index from "../pages/Index";
import Dashboard from "../components/templates/Dashboard";
import ProtectedAdmin from "../components/templates/ProtectedAdmin";
import { linkUrl } from "../utils/linkUrl";

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
        element: <Index />,
      },
      {
        path: linkUrl.admin,
        element: <ProtectedAdmin />,
        children: [
          {
            path: linkUrl.users,
            element: <Index />
          }
        ]
      },
    ],

  },
]);

export default router;
