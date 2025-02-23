import { Settings } from "lucide-react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

const Header = ({ title }) => {
	return (
		<header className='bg-[#F8F7F3] bg-opacity-50 backdrop-blur-md shadow-sm border border-[#F8F7F3] rounded-lg transition-all duration-300 ease-in-out transform '>
			<div className='max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center'>
				<h1 className='text-2xl font-semibold text-black transition-all duration-300 ease-in-out transform hover:text-gray-700'>{title}</h1>
				<Link 
					to="/dashboard/settings"
					className="p-2 rounded-full hover:bg-gray-200 transition-colors duration-300 ease-in-out transform hover:rotate-16"
				>
					<Settings size={24} className="text-gray-600 transition-all duration-300 ease-in-out transform hover:text-gray-800" />
				</Link>
			</div>
		</header>
	);
};
Header.propTypes = {
	title: PropTypes.string.isRequired,
};

export default Header;
