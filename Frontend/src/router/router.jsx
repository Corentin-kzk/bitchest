import {
    createBrowserRouter,
  } from "react-router-dom";
import SignIn from "../components/templates/SingIn";
import Index from "../pages/Index";

const router = createBrowserRouter([
    {
      path: "/",
      element: <SignIn/>,
    },
    {
      path: "/dashboard",
      element: <Index/>,
    },

  ]);

  export default router