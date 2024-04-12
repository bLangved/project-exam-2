import React from "react";
import "./components/";
import "./App.css";
import "./scss/index.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { Layout } from "./components/";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Home,
  Venue,
  Checkout,
  CheckoutSuccess,
  RouteNotFound,
} from "./pages/";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="venue/:id" element={<Venue />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="checkoutSuccess" element={<CheckoutSuccess />} />
          <Route path="*" element={<RouteNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
