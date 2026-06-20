import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import Services from "../pages/Services/Services";
import Gallery from "../pages/Gallery/Gallery";
import HappyClient from "../pages/HappyClients/HappyClient";
import Contact from "../pages/Contact/Contact";
import AddReview from "../pages/Review/AddReview";

import AdminLogin from "../admin/AdminLogin/AdminLogin";
import AdminLayout from "../admin/AdminLayout/AdminLayout";

import AdminDashboard from "../admin/AdminDashboard/AdminDashboard";
import ManageEvents from "../admin/ManageEvents/ManageEvents";
import ManageVendors from "../admin/ManageVendors/ManageVendors";
import ManageMessages from "../admin/ManageMessages/ManageMessages";
import ManageReviews from "../admin/ManageReviews/ManageReviews";
import AdminNotifications from "../admin/AdminNotifications/AdminNotifications";
import AdminAnalytics from "../admin/AdminAnalytics/AdminAnalytics";
import AdminAddGallery from "../admin/AdminAddGallery/AdminAddGallery";
import AdminAddHappyClients from "../admin/AdminAddHappyClients/AdminAddHappyClients";

import AdminRoute from "./AdminRoute";

function AppRoutes() {

  return (

    <BrowserRouter>

      <Routes>

        {/* PUBLIC ROUTES */}

        <Route path="/" element={<MainLayout />}>

          <Route index element={<Home />} />

          <Route path="about" element={<About />} />

          <Route path="services" element={<Services />} />

          <Route path="gallery" element={<Gallery />} />

          <Route path="happy-clients" element={<HappyClient />} />

          <Route path="contact" element={<Contact />} />

          <Route path="add-review" element={<AddReview />} />

        </Route>

        {/* ADMIN LOGIN */}

        <Route
          path="/admin-login"
          element={<AdminLogin />}
        />

        {/* ADMIN ROUTES */}

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >

          <Route
            index
            element={<AdminDashboard />}
          />

          <Route
            path="events"
            element={<ManageEvents />}
          />

          <Route
            path="vendors"
            element={<ManageVendors />}
          />

          <Route
            path="messages"
            element={<ManageMessages />}
          />

          <Route
            path="reviews"
            element={<ManageReviews />}
          />

          <Route
            path="notifications"
            element={<AdminNotifications />}
          />

          <Route
            path="analytics"
            element={<AdminAnalytics />}
          />

          <Route
            path="add-gallery"
            element={<AdminAddGallery />}
          />

          <Route
            path="add-happy-clients"
            element={<AdminAddHappyClients />}
          />

        </Route>

      </Routes>

    </BrowserRouter>

  );
}

export default AppRoutes;