import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const HomePage = () => {
	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
			<div className="container mx-auto px-4 h-screen flex flex-col items-center justify-center">
				<motion.div
					className="text-center"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
				>
					<h1 className="text-5xl font-bold text-white mb-6">Welcome to Admin Dashboard</h1>
					<p className="text-xl text-gray-300 mb-8">
						A powerful tool for managing your business operations
					</p>
					<Link
						to="/dashboard"
						className="inline-flex items-center px-6 py-3 text-lg font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
					>
						Go to Dashboard
					</Link>
				</motion.div>
			</div>
		</div>
	);
};

export default HomePage;