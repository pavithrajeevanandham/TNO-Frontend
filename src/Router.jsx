import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";
import {
  Dashboard,
  Team,
  Invoices,
  Contacts,
  Form,
  Bar,
  Line,
  Pie,
  FAQ,
  Geography,
  Calendar,
  Stream,
} from "./scenes";
import Login from "./Login";
import PrivateRoute from './PrivateRoute';
import NotFound from "./components/NotFound";
import Content from "./scenes/content";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
          {/* Public Routes */}
          <Route path="/ad/login" element={<Login />} />

          {/* Admin Protected Routes */}
          <Route path="/admin" element={<PrivateRoute><App /></PrivateRoute>}>
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/content" element={<Content />} />
            <Route path="/admin/team" element={<Team />} />
            <Route path="/admin/contacts" element={<Contacts />} />
            <Route path="/admin/invoices" element={<Invoices />} />
            <Route path="/admin/form" element={<Form />} />
            <Route path="/admin/calendar" element={<Calendar />} />
            <Route path="/admin/bar" element={<Bar />} />
            <Route path="/admin/pie" element={<Pie />} />
            <Route path="/admin/stream" element={<Stream />} />
            <Route path="/admin/line" element={<Line />} />
            <Route path="/admin/faq" element={<FAQ />} />
            <Route path="/admin/geography" element={<Geography />} />
          </Route>

          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
