import React from "react";
import { Box } from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";

const DefaultAppLayout = ({ children }) => {
  return (
    <Box className="w-screen h-screen flex flex-col">
      <Header />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          paddingTop: "64px",
          paddingBottom: "64px",
          overflowY: "auto",
          height: "calc(100vh - 128px)",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {children}
        </Box>
      </Box>

      <Footer />
    </Box>
  );
};

export default DefaultAppLayout;
