"use client";
import React from "react";
import { motion } from "framer-motion";

const POINTS = [
  [65, 28],
  [12, 30],
  [20, 50],
  [45, 10],
  [60, 70],
  [90, 40],
  [70, 20],
  [30, 30],
  [50, 50],
  [80, 60],
];

export function WorldMap() {
  return (
    <div className="h-[400px] w-full">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
      >
        {POINTS.map(([x, y], index) => (
          <motion.circle
            key={index}
            cx={x}
            cy={y}
            r="1"
            fill="#FF8A65"
            initial={{ scale: 0 }}
            animate={{
              scale: [0, 1.2, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: index * 0.2,
            }}
          />
        ))}

        {POINTS.map(([x, y], index) => (
          <motion.circle
            key={`dot-${index}`}
            cx={x}
            cy={y}
            r="0.5"
            fill="#FF8A65"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
              delay: index * 0.1,
            }}
          />
        ))}

        {/* Connection Lines */}
        {POINTS.map((point, index) => {
          const nextPoint = POINTS[(index + 1) % POINTS.length];
          return (
            <motion.line
              key={`line-${index}`}
              x1={point[0]}
              y1={point[1]}
              x2={nextPoint[0]}
              y2={nextPoint[1]}
              stroke="#FF8A65"
              strokeWidth="0.2"
              strokeOpacity="0.2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 2,
                delay: index * 0.2,
              }}
            />
          )
        })}

        {/* World Map Path */}
        <path
          d="M5,40 Q25,20 45,35 T90,40 T140,40"
          fill="none"
          stroke="#CBD5E0"
          strokeWidth="0.2"
          strokeDasharray="1,1"
          className="opacity-20"
        />
      </svg>
    </div>
  );
}
