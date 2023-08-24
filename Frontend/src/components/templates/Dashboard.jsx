import { AppBar } from "@mui/material";
import { Outlet } from "react-router";

const Dashboard = () => {
  return (
    <div>
      <AppBar position="static" color="grey" enableColorOnDark>
        {"enableColorOnDark"}
      </AppBar>
      <Outlet/>
    </div>
  );
};

export default Dashboard;
