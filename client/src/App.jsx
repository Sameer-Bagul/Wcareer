import { Routes, Route } from "react-router-dom";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from "./pages/Home";
import Login from "./pages/Login";
import EmailVerify from "./pages/EmailVerify";
import ResetPassword from "./pages/ResetPassword";

// import DashboardLayout from "./layouts/DashboardLayout";
// import OverviewPage from "./pages/dashboard";
// import ProductsPage from "./pages/dashboard/products";
// import UsersPage from "./pages/dashboard/users";
// import SalesPage from "./pages/dashboard/sales";
// import OrdersPage from "./pages/dashboard/orders";
// import AnalyticsPage from "./pages/dashboard/analytics";
// import SettingsPage from "./pages/dashboard/settings";

const App = () => {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/email-verify" element={<EmailVerify />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Dashboard routes */}
        {/* <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<OverviewPage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="sales" element={<SalesPage />} />
          <Route path="orders" element={<OrdersPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route> */}


      </Routes>
    </div>
  )
}


export default App;