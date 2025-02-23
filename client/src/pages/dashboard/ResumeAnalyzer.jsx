import React, { useState } from 'react';
import { HiOutlineUpload, HiOutlineQuestionMarkCircle } from 'react-icons/hi';
import { BsBriefcase, BsFileEarmark, BsCheckCircle, BsExclamationTriangle } from 'react-icons/bs';
import Header from '../../components/dashbord/dash-common/Header';

function ResumeAnalyzer() {
  const [jobDescription, setJobDescription] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
    } else {
      alert('Please upload a PDF file');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !jobDescription) {
      alert('Please provide both job description and resume');
      return;
    }

    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setResult({
        "JD Match": "75%",
        "MissingKeywords": ["Docker", "Kubernetes", "AWS"],
        "Profile Summary": "Strong match for the position with good technical background, but lacking some cloud technologies."
      });
    } catch (error) {
      console.error('Error analyzing resume:', error);
      alert('Error analyzing resume. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="w-full min-h-screen bg-[#F8F7F3]">
      <div className="w-full">
        <Header title="Resume Analyzer" />
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
              Smart ATS Analyzer
            </h1>
            <p className="text-gray-600 mt-2">
              Optimize your resume for Applicant Tracking Systems
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="bg-gray-50 rounded-2xl p-6 mb-6">
              <div className="flex items-center mb-4">
                <BsBriefcase className="text-blue-500 mr-2" />
                <h2 className="text-xl font-semibold">Job Description</h2>
              </div>
              <textarea
                className="w-full h-40 p-4 border rounded-xl bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the job description here..."
              />
            </div>

            <div className="bg-gray-50 rounded-2xl p-6 mb-6">
              <div className="flex items-center mb-4">
                <BsFileEarmark className="text-blue-500 mr-2" />
                <h2 className="text-xl font-semibold">Resume Upload</h2>
                <div className="relative group ml-2">
                  <HiOutlineQuestionMarkCircle className="text-gray-400 cursor-help" />
                  <div className="hidden group-hover:block absolute z-10 w-48 p-2 bg-gray-800 text-white text-sm rounded-lg -left-20 top-6">
                    Maximum file size: 200MB, PDF only
                  </div>
                </div>
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-blue-500 transition-all cursor-pointer bg-white">
                {!file ? (
                  <div>
                    <HiOutlineUpload className="mx-auto text-6xl text-blue-500 mb-4" />
                    <h3 className="text-xl mb-2">Drag and drop your resume here</h3>
                    <p className="text-gray-500 mb-4">Limit 200MB per file • PDF</p>
                    <label className="bg-blue-500 text-white px-6 py-3 rounded-full text-lg cursor-pointer hover:bg-blue-600 transition-colors">
                      Browse files
                      <input
                        type="file"
                        className="hidden"
                        accept=".pdf"
                        onChange={handleFileChange}
                      />
                    </label>
                  </div>
                ) : (
                  <div>
                    <BsCheckCircle className="mx-auto text-5xl text-green-500 mb-4" />
                    <p className="text-xl text-green-500">{file.name}</p>
                    <button
                      type="button"
                      onClick={() => setFile(null)}
                      className="mt-4 px-4 py-2 border border-red-500 text-red-500 rounded-full hover:bg-red-50"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !file || !jobDescription}
              className={`w-full py-3 rounded-xl text-lg ${
                loading || !file || !jobDescription
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto"/>
              ) : (
                'Analyze Resume'
              )}
            </button>

            {result && (
              <div className="bg-gray-50 rounded-2xl p-6 mt-8">
                <h2 className="text-2xl text-blue-500 mb-6">Analysis Results</h2>
                
                <div className="flex items-center mb-4">
                  <h3 className="text-xl mr-2">JD Match:</h3>
                  <span className={`text-xl font-bold ${
                    parseInt(result["JD Match"]) > 70 ? 'text-green-500' : 'text-yellow-500'
                  }`}>
                    {result["JD Match"]}
                  </span>
                </div>

                <div className="mb-4">
                  <h3 className="text-xl mb-2">Missing Keywords:</h3>
                  <div className="flex flex-wrap gap-2">
                    {result["MissingKeywords"].map((keyword, index) => (
                      <span
                        key={index}
                        className="flex items-center px-3 py-1 rounded-full border border-yellow-500 text-yellow-700 bg-yellow-50"
                      >
                        <BsExclamationTriangle className="mr-1" />
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl mb-2">Profile Summary:</h3>
                  <p className="text-gray-600">
                    {result["Profile Summary"]}
                  </p>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResumeAnalyzer;