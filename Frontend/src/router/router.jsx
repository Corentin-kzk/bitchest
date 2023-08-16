import {
    createBrowserRouter,
  } from "react-router-dom";
import SignIn from "../components/templates/SingIn";

const router = createBrowserRouter([
    {
      path: "/",
      element: <SignIn/>,
    },

  ]);

  export default router