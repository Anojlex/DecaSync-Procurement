import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage.jsx";
import SupplierPage from "./components/SupplierPage/SupplierPage.jsx";
import ItemPage from "./components/ItemPage/ItemPage.jsx";
import PurchaseOrderPage from "./components/PurchaseOrderPage/PurchaseOrderPage.jsx";
import DefaultAppLayout from "./components/DefaultAppLayout.jsx";
import PurchaseOrderForm from "./components/PurchaseOrderPage/PurchaseOrderForm.jsx";
import PurchaseOrderView from "./components/PurchaseOrderPage/PurchaseOrderView.jsx";

const App = () => {
  return (
    <Router>
      <DefaultAppLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/suppliers" element={<SupplierPage />} />
          <Route path="/items" element={<ItemPage />} />
          <Route path="/purchase-orders" element={<PurchaseOrderPage />} />
          <Route path="/purchase-order-form" element={<PurchaseOrderForm />} />
          <Route path="/purchase-order-view" element={<PurchaseOrderView />} />
        </Routes>
      </DefaultAppLayout>
    </Router>
  );
};

export default App;
