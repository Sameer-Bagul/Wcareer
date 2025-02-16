import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import EmailVerify from "./pages/EmailVerify";
import ResetPassword from "./pages/ResetPassword";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Sidebar from "./components/common/Sidebar";

import OverviewPage from "./pages/OverviewPage";
import ProductsPage from "./pages/ProductsPage";
import UsersPage from "./pages/UsersPage";
import SalesPage from "./pages/SalesPage";
import OrdersPage from "./pages/OrdersPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import SettingsPage from "./pages/SettingsPage";


const App = () => {
  return (
    <div>
      <ToastContainer /> 
      <Routes>
        {/* authentication Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/email-verify" element={<EmailVerify />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Dashoard Route */}

        <Route path="/OverviewPage" element={<OverviewPage />} />  
        <Route path="/ProductsPage" element={<ProductsPage />} />
        <Route path="/UsersPage" element={<UsersPage />} />
        <Route path="/SalesPage" element={<SalesPage />} />
        <Route path="/OrdersPage" element={<OrdersPage />} />
        <Route path="/AnalyticsPage" element={<AnalyticsPage />} />
        <Route path="/SettingsPage" element={<SettingsPage />} />
        
      </Routes>
    </div>
  )
}


export default App;