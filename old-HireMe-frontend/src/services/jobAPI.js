import React, { useEffect, useState } from 'react';
import { Bar, Line, Pie, Doughnut } from 'react-chartjs-2';
import 'chart.js/auto'; // Required for Chart.js v3 and above
import axios from 'axios';

const ADZUNA_API_URL = 'https://api.adzuna.com/v1/api/jobs';
const JSEARCH_API_URL = 'https://jsearch.p.rapidapi.com/search';

const fetchAdzunaJobs = async (search) => {
  const params = {
    app_id: 'YOUR_ADZUNA_APP_ID',
    app_key: 'YOUR_ADZUNA_APP_KEY',
    results_per_page: 10,
    what: search, // Search query
    where: 'remote',
  };

  const response = await axios.get(`${ADZUNA_API_URL}/gb/search/1`, { params });
  return response.data.results.map(job => ({
    title: job.title,
    company: job.company.display_name,
    location: job.location.display_name,
    link: job.redirect_url,
    category: job.category.label,
    employment_type: job.contract_type || 'Full-time', // Add employment type
  }));
};

const fetchJSearchJobs = async (search) => {
  const options = {
    method: 'GET',
    url: JSEARCH_API_URL,
    params: { query: search, page: '1', num_pages: '1' },
    headers: { 'X-RapidAPI-Key': 'YOUR_RAPIDAPI_KEY' },
  };

  const response = await axios.request(options);
  return response.data.data.map(job => ({
    title: job.job_title,
    company: job.employer_name,
    location: job.job_city || 'Remote',
    link: job.job_apply_link,
    category: job.job_employment_type,
    employment_type: job.job_employment_type || 'Full-time', // Ensure employment type is included
  }));
};

export const fetchAllJobs = async (search) => {
  const adzunaJobs = await fetchAdzunaJobs(search);
  const jSearchJobs = await fetchJSearchJobs(search);
  return [...adzunaJobs, ...jSearchJobs];
};

const JobChart = ({ jobs, chartType = 'Bar', height = 400, width = 600, backgroundColor = 'rgba(75,192,192,0.6)', borderColor = 'rgba(75,192,192,1)', borderWidth = 1 }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const prepareChartData = () => {
      // Count job categories
      const categoryCounts = jobs.reduce((acc, job) => {
        acc[job.category] = (acc[job.category] || 0) + 1;
        return acc;
      }, {});

      // Count job locations (cities)
      const locationCounts = jobs.reduce((acc, job) => {
        acc[job.location] = (acc[job.location] || 0) + 1;
        return acc;
      }, {});

      // Count employment types (full-time, part-time, etc.)
      const employmentCounts = jobs.reduce((acc, job) => {
        acc[job.employment_type] = (acc[job.employment_type] || 0) + 1;
        return acc;
      }, {});

      setChartData({
        categoryData: {
          labels: Object.keys(categoryCounts),
          datasets: [{
            label: 'Job Categories',
            data: Object.values(categoryCounts),
            backgroundColor,
            borderColor,
            borderWidth,
          }],
        },
        locationData: {
          labels: Object.keys(locationCounts),
          datasets: [{
            label: 'Job Locations',
            data: Object.values(locationCounts),
            backgroundColor,
            borderColor,
            borderWidth,
          }],
        },
        employmentData: {
          labels: Object.keys(employmentCounts),
          datasets: [{
            label: 'Employment Types',
            data: Object.values(employmentCounts),
            backgroundColor,
            borderColor,
            borderWidth,
          }],
        },
      });
    };

    if (jobs.length > 0) {
      prepareChartData();
    }
  }, [jobs]);

  const chartComponents = {
    Bar: Bar,
    Line: Line,
    Pie: Pie,
    Doughnut: Doughnut,
  };

  const ChartComponent = chartComponents[chartType] || Bar;

  return (
    <div style={{ height: `${height}px`, width: `${width}px`, maxWidth: '100%' }}>
      {chartData && (
        <>
          <div style={{ marginBottom: '20px' }}>
            <h3>Job Categories</h3>
            <ChartComponent data={chartData.categoryData} />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <h3>Job Locations</h3>
            <ChartComponent data={chartData.locationData} />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <h3>Employment Types</h3>
            <ChartComponent data={chartData.employmentData} />
          </div>
        </>
      )}
    </div>
  );
};

export default JobChart;
