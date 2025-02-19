import React, { useEffect, useRef } from "react";

const IChart2 = () => {
  const options = {
    series: [
      {
        name: "CNC Programming Basics Test", // Test 1 for CNC programming basics
        data: [85, 88, 92, 94, 97, 98], // Scores for this test over the different attempts
        color: "#1A56DB", // Blue color for this test
      },
      {
        name: "CNC Machining Test", // Test 2 for CNC machining
        data: [78, 80, 84, 88, 90, 93], // Scores for this test over the different attempts
        color: "#7E3BF2", // Purple color for this test
      },
      {
        name: "CNC Advanced Operations Test", // Test 3 for advanced CNC operations
        data: [70, 75, 80, 85, 89, 91], // Scores for this test over the different attempts
        color: "#FF6F61", // Red color for this test
      },
    ],

    chart: {
      height: "500px", // Height of the chart
      width: "100%", // Increase width to double
      type: "area",
      fontFamily: "Inter, sans-serif",

      dropShadow: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    tooltip: {
      enabled: true,
      x: {
        show: true,
      },
    },
    legend: {
      show: true,
    },
    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.55,
        opacityTo: 0,
        shade: "#1C64F2",
        gradientToColors: ["#1C64F2"],
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 6,
    },
    grid: {
      show: true,
      strokeDashArray: 4,
      padding: {
        left: 0, // Adjusted padding for the grid to fill more width
        right: 0,
        top: 0,
      },
    },
    xaxis: {
      categories: ["a1", "a2", "a3", "a4", "a5", "a6"], // Attempts renamed to a1, a2, a3, etc.
      labels: {
        show: true,
        style: {
          fontSize: "12px", // Adjust font size for X-axis labels
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: true,
      tickAmount: 10,
      labels: {
        formatter: function (value) {
          return value; // Show raw score out of 100 without percentage
        },
        style: {
          fontSize: "12px", // Adjust font size for Y-axis labels
        },
      },
    },
  };

  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current && typeof ApexCharts !== "undefined") {
      const chart = new ApexCharts(chartRef.current, options);
      chart.render();

      return () => {
        chart.destroy();
      };
    }
  }, [options]);

  return (
    <div>
      <div class="w-full bg-white rounded-xl p-4 md:p-6">
        <div class="flex justify-between">
          <div>
            <h5 class="leading-none text-3xl font-bold text-gray-900 light:text-white pb-2">
              CNC Programming Test Progress Over Attempts
            </h5>
          </div>
          <div class="flex items-center px-2.5 py-0.5 text-base font-semibold text-green-500 light:text-green-500 text-center">
            23% Improvement
            <svg
              class="w-3 h-3 ms-1"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13V1m0 0L1 5m4-4 4 4"
              />
            </svg>
          </div>
        </div>
        <div
          ref={chartRef}
          id="data-series-chart"
          style={{ width: "100%", margin: "0 auto" }}
        ></div>
      </div>
    </div>
  );
};

export default IChart2;
