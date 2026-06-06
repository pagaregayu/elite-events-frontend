import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { AuthProvider } from "./context/AuthContext";

import { WishlistProvider } from "./context/WishlistContext";
import { NotificationProvider } from "./context/NotificationContext";
import { BookingProvider } from "./context/BookingContext";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>
    <AuthProvider>
      <WishlistProvider>
        <NotificationProvider>
          <BookingProvider>
            <App />
          </BookingProvider>
        </NotificationProvider>
      </WishlistProvider>
    </AuthProvider>
  </React.StrictMode>
);