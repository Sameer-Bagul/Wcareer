const ToggleSwitch = ({ label, isOn, onToggle }) => {
	return (
		<div className='flex items-center justify-between py-3 bg-[#F8F7F3] bg-opacity-50 backdrop-blur-md'>
			<span className='text-black'>{label}</span>
			<button
				className={`
        relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none
        ${isOn ? "bg-yellow-400" : "bg-gray-400"}
        `}
				onClick={onToggle}
			>
				<span
					className={`inline-block size-4 transform transition-transform bg-black rounded-full 
            ${isOn ? "translate-x-6" : "translate-x-1"}
            `}
				/>
			</button>
		</div>
	);
};
export default ToggleSwitch;
