import React from "react";
import { Box, Typography } from "@mui/material";
import ItemPageListing from "./ItemPage/ItemPageListing";
const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        bgcolor: "primary.main",
        color: "white",
        textAlign: "center",
        p: 1,
      }}
    >
      <Typography variant="body2">
        © 2024 DecaSync. All Rights Reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
