import React from "react";
import { Typography, Box } from "@mui/material";
import { styled } from "@mui/system";
import InventoryIcon from "@mui/icons-material/Inventory";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { replace, useNavigate } from "react-router-dom";

const FeaturesSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4, 2),
  background: "#f9fafb",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexWrap: "wrap",
  height: "50vh",
  overflowY: "auto",
}));

const FeatureCard = styled(Box)({
  backgroundColor: "white",
  width: "200px",
  height: "200px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  margin: "1rem",
  padding: "1rem",
  borderRadius: "8px",
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  cursor: "pointer",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.15)",
  },
});

const HomePage = () => {
  const navigate = useNavigate();
  const HeroSection = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    padding: theme.spacing(8, 2),
    background: "linear-gradient(to right, #1e3a8a, #2563eb)", // Blue gradient background
    color: "white",
  }));
  return (
    <Box className="w-screen">
      <HeroSection>
        <Typography variant="h2" className="font-bold mb-4">
          Welcome to DecaSync
        </Typography>
        <Typography variant="h6" className="mb-6 max-w-md">
          Streamline your procurement processes with DecaSync. Manage suppliers,
          items, and orders efficiently.
        </Typography>
      </HeroSection>
      <FeaturesSection id="features">
        <FeatureCard onClick={() => navigate("/suppliers", { replace: true })}>
          <PersonIcon style={{ fontSize: 30, color: "green" }} />
          <Typography
            variant="subtitle1"
            style={{ fontWeight: 400, color: "gray", marginTop: "0.5rem" }}
          >
            Suppliers
          </Typography>
        </FeatureCard>

        <FeatureCard onClick={() => navigate("/items")}>
          <InventoryIcon style={{ fontSize: 30, color: "green" }} />
          <Typography
            variant="subtitle1"
            style={{ fontWeight: 400, color: "gray", marginTop: "0.5rem" }}
          >
            Items
          </Typography>
        </FeatureCard>

        <FeatureCard onClick={() => navigate("/purchase-orders")}>
          <ShoppingCartIcon style={{ fontSize: 30, color: "green" }} />
          <Typography
            variant="subtitle1"
            style={{ fontWeight: 400, color: "gray", marginTop: "0.5rem" }}
          >
            Purchase Order
          </Typography>
        </FeatureCard>
      </FeaturesSection>
    </Box>
  );
};

export default HomePage;
