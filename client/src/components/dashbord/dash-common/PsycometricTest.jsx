import { motion } from "framer-motion";
import {
	ResponsiveContainer,
	Radar,
	RadarChart,
	PolarGrid,
	PolarAngleAxis,
	PolarRadiusAxis,
	Legend,
	Tooltip,
} from "recharts";
import { FaExternalLinkAlt } from 'react-icons/fa';

const psychometricData = [
	{ subject: "Realistic", Score: 120, Benchmark: 110, fullMark: 150 },
	{ subject: "Investigative", Score: 98, Benchmark: 130, fullMark: 150 },
	{ subject: "Artistic", Score: 86, Benchmark: 125, fullMark: 150 },
	{ subject: "Social", Score: 99, Benchmark: 100, fullMark: 150 },
	{ subject: "Enterprising", Score: 85, Benchmark: 95, fullMark: 150 },
	{ subject: "Conventional", Score: 65, Benchmark: 85, fullMark: 150 },
];

const Psychometric = () => {
	return (
		<motion.div
			className='bg-[#F8F7F3] bg-opacity-50 backdrop-blur-md shadow-md shadow-[#bfbcb2] p-6 rounded-lg flex flex-col gap-6 relative'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.6 }}
		>
			<div className="flex justify-between items-center mb-4">
				<h2 className='text-xl font-semibold text-black-100'>Personality Metrics</h2>
				<a 
					href="https://www.16personalities.com/personality-types"
					target="_blank"
					rel="noopener noreferrer"
					className="text-gray-600 hover:text-gray-800 transition-colors"
					title="Visit 16Personalities"
				>
					<FaExternalLinkAlt size={16} />
				</a>
			</div>
			<div style={{ width: "100%", height: 300 }}>
				<ResponsiveContainer>
					<RadarChart cx='50%' cy='50%' outerRadius='80%' data={psychometricData}>
						<PolarGrid stroke='#4A5568' />
						<PolarAngleAxis dataKey='subject' fontSize= '12' stroke='#black' />
						<PolarRadiusAxis angle={30} domain={[0, 150]} stroke='#black' />
						<Radar name='User Score' dataKey='Score' stroke='#F59E0B' fill='#F59E0B' fillOpacity={0.6} />
						<Radar name='Benchmark' dataKey='Benchmark' stroke='#38B2AC' fill='#38B2AC' fillOpacity={0.6} />
						<Legend />
						<Tooltip
							contentStyle={{
								backgroundColor: "rgba(45, 55, 72, 0.8)",
								borderColor: "#4A5568",
							}}
							itemStyle={{ color: "#E2E8F0" }}
						/>
					</RadarChart>
				</ResponsiveContainer>
			</div>
		</motion.div>
	);
};

export default Psychometric;
