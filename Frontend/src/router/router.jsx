import { createBrowserRouter } from "react-router-dom";
import SignIn from "../components/templates/SingIn";
import Index from "../pages/Index";
import Dashboard from "../components/templates/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SignIn />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "",
        element: <Index />,
      },
    ],
  },
]);

export default router;
