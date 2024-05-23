import React from "react";
import "./components/";
import "./App.css";
import "./scss/index.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { Layout } from "./components/";
import { VenueDataProvider } from "./contexts/VenueDataContext";
import { UserProfileProvider } from "./contexts/ProfileDataContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Home,
  Venue,
  Profile,
  Login,
  Register,
  Admin,
  RouteNotFound,
} from "./pages/";

function App() {
  return (
    <UserProfileProvider>
      <VenueDataProvider>
        <BrowserRouter>
          <Routes>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="venue/:id" element={<Venue />} />
              <Route path="admin" element={<Admin />} />
              <Route path="profile" element={<Profile />} />
              <Route path="*" element={<RouteNotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </VenueDataProvider>
    </UserProfileProvider>
  );
}

export default App;
