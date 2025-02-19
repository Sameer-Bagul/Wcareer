import React, { useEffect } from "react";
import ApexCharts from "apexcharts";

const ResumeCard = () => {
  const getChartOptions = () => {
    return {
      series: [35.1, 23.5, 2.4, 5.4],
      colors: ["#1C64F2", "#16BDCA", "#FDBA8C", "#E74694"],
      chart: {
        height: 320,
        width: "100%",
        type: "donut",
      },
      stroke: {
        colors: ["transparent"],
        lineCap: "",
      },
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
              name: {
                show: true,
                fontFamily: "Inter, sans-serif",
                offsetY: 20,
              },
              total: {
                showAlways: true,
                show: true,
                label: "Unique visitors",
                fontFamily: "Inter, sans-serif",
                formatter: function (w) {
                  const sum = w.globals.seriesTotals.reduce((a, b) => {
                    return a + b;
                  }, 0);
                  return "$" + sum + "k";
                },
              },
              value: {
                show: true,
                fontFamily: "Inter, sans-serif",
                offsetY: -20,
                formatter: function (value) {
                  return value + "k";
                },
              },
            },
            size: "80%",
          },
        },
      },
      grid: {
        padding: {
          top: -2,
        },
      },
      labels: ["Direct", "Sponsor", "Affiliate", "Email marketing"],
      dataLabels: {
        enabled: false,
      },
      legend: {
        position: "bottom",
        fontFamily: "Inter, sans-serif",
      },
      yaxis: {
        labels: {
          formatter: function (value) {
            return value + "k";
          },
        },
      },
      xaxis: {
        labels: {
          formatter: function (value) {
            return value + "k";
          },
        },
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
      },
    };
  };

  useEffect(() => {
    // Render the chart only once when the component is mounted
    const chart = new ApexCharts(
      document.getElementById("donut-chart"),
      getChartOptions()
    );
    chart.render();

    // Get all the checkboxes by their class name
    const checkboxes = document.querySelectorAll(
      '#devices input[type="checkbox"]'
    );

    // Function to handle the checkbox change event
    function handleCheckboxChange(event, chart) {
      const checkbox = event.target;
      if (checkbox.checked) {
        switch (checkbox.value) {
          case "desktop":
            chart.updateSeries([15.1, 22.5, 4.4, 8.4]);
            break;
          case "tablet":
            chart.updateSeries([25.1, 26.5, 1.4, 3.4]);
            break;
          case "mobile":
            chart.updateSeries([45.1, 27.5, 8.4, 2.4]);
            break;
          default:
            chart.updateSeries([55.1, 28.5, 1.4, 5.4]);
        }
      } else {
        chart.updateSeries([35.1, 23.5, 2.4, 5.4]);
      }
    }

    // Attach the event listener to each checkbox
    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", (event) =>
        handleCheckboxChange(event, chart)
      );
    });

    return () => {
      chart.destroy(); // Cleanup chart on component unmount
    };
  }, []);

  return (
    <div>
      <div className="w-full bg-white rounded-xl p-8 md:p-6">
        <div className="flex justify-between mb-3">
          <div className="flex justify-center items-center">
            <h1 className="text-xl font-bold leading-none text-gray-900 dark:text-white pe-1">
              Website traffic
            </h1>
            <svg
              data-popover-target="chart-info"
              data-popover-placement="bottom"
              className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer ms-1"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm0 16a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm1-5.034V12a1 1 0 0 1-2 0v-1.418a1 1 0 0 1 1.038-.999 1.436 1.436 0 0 0 1.488-1.441 1.501 1.501 0 1 0-3-.116.986.986 0 0 1-1.037.961 1 1 0 0 1-.96-1.037A3.5 3.5 0 1 1 11 11.466Z" />
            </svg>
            <div
              data-popover=""
              id="chart-info"
              role="tooltip"
              className="absolute z-10 invisible inline-block text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 w-72 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400"
            >
              <div className="p-3 space-y-2">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Activity growth - Incremental
                </h3>
                <p>
                  Report helps navigate cumulative growth of community
                  activities. Ideally, the chart should have a growing trend, as
                  stagnating chart signifies a significant decrease of community
                  activity.
                </p>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Calculation
                </h3>
                <p>
                  For each date bucket, the all-time volume of activities is
                  calculated. This means that activities in period n contain all
                  activities up to period n, plus the activities generated by
                  your community in period.
                </p>
                <a
                  href="#"
                  className="flex items-center font-medium text-blue-600 dark:text-blue-500 dark:hover:text-blue-600 hover:text-blue-700 hover:underline"
                >
                  Read more{" "}
                  <svg
                    className="w-2 h-2 ms-1.5 rtl:rotate-180"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="m1 9 4-4-4-4"
                    />
                  </svg>
                </a>
              </div>
              <div data-popper-arrow="" />
            </div>
          </div>
        </div>
        <div>
          <div className="flex" id="devices">
            <div className="flex items-center me-4">
              <input
                id="desktop"
                type="checkbox"
                defaultValue="desktop"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="desktop"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Desktop
              </label>
            </div>
            <div className="flex items-center me-4">
              <input
                id="tablet"
                type="checkbox"
                defaultValue="tablet"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="tablet"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Tablet
              </label>
            </div>
            <div className="flex items-center me-4">
              <input
                id="mobile"
                type="checkbox"
                defaultValue="mobile"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="mobile"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Mobile
              </label>
            </div>
          </div>
        </div>
        <div
          id="donut-chart"
          className="min-h-[320px] mt-4 max-w-[370px] mx-auto"
        />
      </div>
    </div>
  );
};

export default ResumeCard;
