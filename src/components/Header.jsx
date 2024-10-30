import React from "react";
import { Typography, AppBar, Toolbar } from "@mui/material";

const Header = () => {
  return (
    <AppBar position="fixed" sx={{ top: 0, left: 0, right: 0 }}>
      <Toolbar>
        <Typography variant="h6" component="div">
          DecaSync
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
export default Header;
