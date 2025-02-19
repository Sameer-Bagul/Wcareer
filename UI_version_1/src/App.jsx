import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home";
import DashboardLayout from "./layouts/DashboardLayout";
import OverviewPage from "./pages/dashboard";
import ProductsPage from "./pages/dashboard/products";
import UsersPage from "./pages/dashboard/users";
import SalesPage from "./pages/dashboard/sales";
import OrdersPage from "./pages/dashboard/orders";
import AnalyticsPage from "./pages/dashboard/analytics";
import SettingsPage from "./pages/dashboard/settings";

function App() {
	return (
		<Routes>
			{/* Home page route */}
			<Route path="/" element={<HomePage />} />

			{/* Dashboard routes */}
			<Route path="/dashboard" element={<DashboardLayout />}>
				<Route index element={<OverviewPage />} />
				<Route path="products" element={<ProductsPage />} />
				<Route path="users" element={<UsersPage />} />
				<Route path="sales" element={<SalesPage />} />
				<Route path="orders" element={<OrdersPage />} />
				<Route path="analytics" element={<AnalyticsPage />} />
				<Route path="settings" element={<SettingsPage />} />
			</Route>
		</Routes>
	);
}

export default App;