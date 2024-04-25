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
  VenueEdit,
  VenueCreate,
  Profile,
  Login,
  Register,
  Admin,
  Checkout,
  CheckoutSuccess,
  RouteNotFound,
} from "./pages/";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="venue/:id" element={<Venue />} />
          <Route path="profile" element={<Profile />} />
          <Route path="venue_create" element={<VenueCreate />} />
          <Route path="venue_edit" element={<VenueEdit />} />
          <Route path="admin" element={<Admin />} />
          <Route path="profile" element={<Profile />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="checkoutSuccess" element={<CheckoutSuccess />} />
          <Route path="*" element={<RouteNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
