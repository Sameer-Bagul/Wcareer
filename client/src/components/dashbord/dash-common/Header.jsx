import { Settings } from "lucide-react";
import { Link } from "react-router-dom";

const Header = ({ title }) => {
	return (
		<header className='bg-[#F8F7F3]-800 bg-opacity-50 backdrop-blur-md shadow-sm border-b border-[#F8F7F3]-700'>
			<div className='max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center'>
				<h1 className='text-2xl font-semibold text-black-100'>{title}</h1>
				<Link 
					to="/dashboard/settings"
					className="p-2 rounded-full hover:bg-gray-200 transition-colors"
				>
					<Settings size={24} className="text-gray-600" />
				</Link>
			</div>
		</header>
	);
};

export default Header;
