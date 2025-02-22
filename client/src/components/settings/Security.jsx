import { Lock } from "lucide-react";
import SettingSection from "./SettingSection";
import ToggleSwitch from "./ToggleSwitch";
import { useState } from "react";

const Security = () => {
	const [twoFactor, setTwoFactor] = useState(false);

	return (
		<SettingSection icon={Lock} title={"Security"}>
			<ToggleSwitch
				label={"Two-Factor Authentication"}
				isOn={twoFactor}
				onToggle={() => setTwoFactor(!twoFactor)}
			/>
			<div className="mt-4 bg-[#F8F7F3] bg-opacity-50 backdrop-blur-md p-4 rounded-md">
				<button
					className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded transition duration-200"
				>
					Change Password
				</button>
			</div>
		</SettingSection>
	);
};
export default Security;
