import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const ImprovementChart = ({ data }) => {
  // Default data in case no data is provided
  const defaultData = [
    { attempt: 1, score: 50, efficiency: 60 },
    { attempt: 2, score: 65, efficiency: 75 },
    { attempt: 3, score: 78, efficiency: 85 },
    { attempt: 4, score: 85, efficiency: 90 },
    { attempt: 5, score: 92, efficiency: 95 },
  ];

  // Use provided data or default data
  const chartData = data || defaultData;

  return (
    <div className="w-full max-w-4xl shadow-lg rounded-lg bg-white">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800">
          Performance Improvement Tracker
        </h2>
      </div>
      <div className="p-4">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="attempt"
              label={{
                value: "Number of Attempts",
                position: "insideBottom",
                offset: -10,
              }}
            />
            <YAxis
              label={{
                value: "Performance",
                angle: -90,
                position: "insideLeft",
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#f8f8f8",
                borderRadius: "10px",
              }}
            />
            <Legend verticalAlign="top" height={36} />
            <Line
              type="monotone"
              dataKey="score"
              stroke="#3b82f6"
              strokeWidth={3}
              activeDot={{ r: 8 }}
              name="Technical Competency"
            />
            <Line
              type="monotone"
              dataKey="efficiency"
              stroke="#10b981"
              strokeWidth={3}
              activeDot={{ r: 8 }}
              name="Cognitive Efficiency"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ImprovementChart;
