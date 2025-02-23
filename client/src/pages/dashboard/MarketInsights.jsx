import { useEffect, useState } from 'react';
import JobList from '../../components/market-insights/JobList';
import JobChart from '../../components/market-insights/JobChart';
import { FiSearch } from 'react-icons/fi';

// Fallback data in case API fails
const FALLBACK_JOBS = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "Tech Corp",
    location: "Remote",
    type: "Full-time",
    skills: ["JavaScript", "React", "TypeScript"],
    salary: "Competitive",
    posted_date: new Date().toLocaleDateString(),
    url: "#" 
  },
  {
    id: 2,
    title: "Backend Developer",
    company: "Dev Solutions",
    location: "Remote",
    type: "Full-time",
    skills: ["Python", "Node.js", "MongoDB"],
    salary: "Competitive",
    posted_date: new Date().toLocaleDateString(),
    url: "#"
  }
];

// Add your Indeed API key here (should be in environment variables in production)
const INDEED_API_KEY = 'YOUR_RAPID_API_KEY';
const FANTASTIC_JOBS_API_KEY = 'YOUR_FANTASTIC_JOBS_API_KEY';

const MarketInsights = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('all');
  const [error, setError] = useState(null);

  const skillFilters = ['All', 'JavaScript', 'Python', 'React', 'Node.js', 'Java', 'DevOps', 'Full Stack'];

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      setError(null);

      try {
        // Fetch from all APIs concurrently
        const [remoteOkJobs, indeedJobs, fantasticJobs] = await Promise.allSettled([
          fetchRemoteOkJobs(),
          fetchIndeedJobs(),
          fetchFantasticJobs()
        ]);

        let combinedJobs = [];

        // Handle RemoteOK results
        if (remoteOkJobs.status === 'fulfilled') {
          combinedJobs = [...combinedJobs, ...remoteOkJobs.value];
        }

        // Handle Indeed results
        if (indeedJobs.status === 'fulfilled') {
          combinedJobs = [...combinedJobs, ...indeedJobs.value];
        }

        // Handle Fantastic Jobs results
        if (fantasticJobs.status === 'fulfilled') {
          combinedJobs = [...combinedJobs, ...fantasticJobs.value];
        }

        if (combinedJobs.length === 0) {
          throw new Error('No jobs data received from any source');
        }

        setJobs(combinedJobs);
      } catch (err) {
        console.error('Error fetching jobs:', err);
        setError('Failed to fetch jobs data. Using sample data.');
        setJobs(FALLBACK_JOBS);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Helper function to fetch RemoteOK jobs
  const fetchRemoteOkJobs = async () => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    try {
      const response = await fetch('https://remoteok.com/api', {
        signal: controller.signal,
        headers: {
          'User-Agent': 'Mozilla/5.0',
          'Accept': 'application/json',
          'Origin': window.location.origin,
        },
        mode: 'cors',
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`RemoteOK API responded with status: ${response.status}`);
      }

      const data = await response.json();
      const jobsData = data.slice(1);

      return jobsData.map(job => ({
        id: `remoteok-${job.id || Math.random().toString()}`,
        source: 'RemoteOK',
        title: job.position || 'Position Not Specified',
        company: job.company || 'Company Not Specified',
        location: job.location || 'Remote',
        type: job.job_type || 'Full-time',
        skills: (job.tags || []).filter(tag => tag && typeof tag === 'string'),
        salary: job.salary || 'Not specified',
        posted_date: job.date ? new Date(job.date).toLocaleDateString() : 'Recently',
        url: job.url || job.apply_url || '#'
      }));
    } catch (error) {
      console.error('RemoteOK API Error:', error);
      return [];
    }
  };

  // Helper function to fetch Indeed jobs
  const fetchIndeedJobs = async () => {
    if (!INDEED_API_KEY) {
      console.warn('Indeed API key not provided');
      return [];
    }

    try {
      const response = await fetch(
        'https://indeed-indeed.p.rapidapi.com/apisearch?v=2&format=json&q=software&radius=25',
        {
          headers: {
            'x-rapidapi-key': INDEED_API_KEY,
            'x-rapidapi-host': 'indeed-indeed.p.rapidapi.com'
          }
        }
      );

      if (!response.ok) {
        throw new Error(`Indeed API responded with status: ${response.status}`);
      }

      const data = await response.json();
      
      return (data.results || []).map(job => ({
        id: `indeed-${job.jobkey || Math.random().toString()}`,
        source: 'Indeed',
        title: job.jobtitle || 'Position Not Specified',
        company: job.company || 'Company Not Specified',
        location: job.formattedLocation || 'Location Not Specified',
        type: job.jobType || 'Full-time',
        skills: extractSkillsFromDescription(job.snippet || ''),
        salary: job.formattedRelativeTime || 'Not specified',
        posted_date: new Date(job.date).toLocaleDateString(),
        url: job.url || '#'
      }));
    } catch (error) {
      console.error('Indeed API Error:', error);
      return [];
    }
  };

  // Helper function to fetch Fantastic Jobs
  const fetchFantasticJobs = async () => {
    if (!FANTASTIC_JOBS_API_KEY) {
      console.warn('Fantastic Jobs API key not provided');
      return [];
    }

    try {
      const response = await fetch(
        'https://fantastic.jobs/api/jobs?keyword=developer&location=remote',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${FANTASTIC_JOBS_API_KEY}`
          }
        }
      );

      if (!response.ok) {
        throw new Error(`Fantastic Jobs API responded with status: ${response.status}`);
      }

      const data = await response.json();
      
      return (data.jobs || []).map(job => ({
        id: `fantastic-${job.id || Math.random().toString()}`,
        source: 'Fantastic Jobs',
        title: job.title || 'Position Not Specified',
        company: job.company_name || 'Company Not Specified',
        location: job.location || 'Remote',
        type: job.employment_type || 'Full-time',
        skills: extractSkillsFromTags(job.tags || []),
        salary: formatSalaryRange(job.salary_min, job.salary_max, job.salary_currency) || 'Not specified',
        posted_date: new Date(job.posted_at).toLocaleDateString(),
        url: job.apply_url || '#'
      }));
    } catch (error) {
      console.error('Fantastic Jobs API Error:', error);
      return [];
    }
  };

  // Helper function to format salary range
  const formatSalaryRange = (min, max, currency = 'USD') => {
    if (!min && !max) return 'Not specified';
    if (!max) return `${currency} ${min}+`;
    if (!min) return `Up to ${currency} ${max}`;
    return `${currency} ${min} - ${max}`;
  };

  // Helper function to extract skills from tags
  const extractSkillsFromTags = (tags) => {
    const commonSkills = [
      'JavaScript', 'Python', 'Java', 'React', 'Node.js', 'Angular',
      'Vue.js', 'PHP', 'Ruby', 'C++', 'C#', '.NET', 'SQL', 'MongoDB',
      'AWS', 'Docker', 'Kubernetes', 'DevOps', 'Machine Learning'
    ];

    return tags.filter(tag => 
      commonSkills.some(skill => 
        tag.toLowerCase().includes(skill.toLowerCase())
      )
    );
  };

  // Helper function to extract skills from job description
  const extractSkillsFromDescription = (description) => {
    const commonSkills = [
      'JavaScript', 'Python', 'Java', 'React', 'Node.js', 'Angular',
      'Vue.js', 'PHP', 'Ruby', 'C++', 'C#', '.NET', 'SQL', 'MongoDB',
      'AWS', 'Docker', 'Kubernetes', 'DevOps', 'Machine Learning'
    ];

    return commonSkills.filter(skill => 
      description.toLowerCase().includes(skill.toLowerCase())
    );
  };

  // Filter jobs based on search term and selected skill
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = (job.title?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
                         (job.company?.toLowerCase() || '').includes(searchTerm.toLowerCase());
    const matchesSkill = selectedSkill.toLowerCase() === 'all' ||
                        (job.skills || []).some(skill => 
                          (skill?.toLowerCase() || '').includes(selectedSkill.toLowerCase())
                        );
    return matchesSearch && matchesSkill;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Remote Job Market Insights
        </h1>

        {/* Search and Filter Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative w-full md:w-96">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search jobs or companies..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Skill Filter Buttons */}
            <div className="flex flex-wrap gap-2 justify-center">
              {skillFilters.map(skill => (
                <button
                  key={skill}
                  onClick={() => setSelectedSkill(skill === 'All' ? 'all' : skill)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                    ${selectedSkill.toLowerCase() === skill.toLowerCase()
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded mb-4">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            {/* Job Chart Section */}
            <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
              <h2 className="text-2xl font-semibold text-gray-700 mb-6">Remote Job Market Analytics</h2>
              {filteredJobs.length > 0 ? (
                <JobChart jobs={filteredJobs} />
              ) : (
                <p className="text-center text-gray-500">No data available for charts</p>
              )}
            </div>

            {/* Job Listings Section */}
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-700 mb-6">
                Remote Job Listings
                <span className="text-sm font-normal text-gray-500 ml-2">
                  ({filteredJobs.length} jobs found)
                </span>
              </h2>
              {filteredJobs.length > 0 ? (
                <JobList jobs={filteredJobs} />
              ) : (
                <p className="text-center text-gray-500">No jobs found matching your criteria</p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MarketInsights;
