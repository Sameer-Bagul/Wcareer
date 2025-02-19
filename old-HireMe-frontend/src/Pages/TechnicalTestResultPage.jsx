import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell } from "recharts";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import CertificateGenerator from "../components/CertificateGenerator";
const ResultsPage = () => {
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const storedResults = localStorage.getItem("examResults");
      if (!storedResults) {
        setError("No results found");
        return;
      }
      const parsedResults = JSON.parse(storedResults);
      if (!parsedResults) {
        setError("Invalid results data");
        return;
      }
      setResults(parsedResults);
    } catch (err) {
      setError("Error loading results: " + err.message);
    }
  }, []);

  const generatePDF = () => {
    if (!results) return;

    const doc = new jsPDF();

    // Add title
    doc.setFontSize(20);
    doc.text("Exam Results Report", 20, 20);

    // Add score summary
    doc.setFontSize(12);
    doc.text(`Total Score: ${results.score.toFixed(2)}%`, 20, 40);
    doc.text(
      `Questions Attempted: ${results.attempted}/${results.total_questions}`,
      20,
      50
    );
    doc.text(
      `Correct Answers: ${results.correct}/${results.total_questions}`,
      20,
      60
    );

    // Add detailed results table
    const tableData = results.detailed_results.map((result, index) => [
      index + 1,
      result.question_text.slice(0, 40) + "...",
      result.selected_option,
      result.correct_option,
      result.concept_tag,
      result.is_correct ? "Correct" : "Incorrect",
    ]);

    doc.autoTable({
      startY: 80,
      head: [["Q.No", "Question", "Selected", "Correct", "Concept", "Status"]],
      body: tableData,
      margin: { top: 15 },
      styles: { fontSize: 8 },
    });

    doc.save("exam_report.pdf");
  };

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
          <div className="text-center text-red-600">
            <h1 className="text-2xl font-bold mb-4">Error</h1>
            <p>{error}</p>
            <button
              onClick={() => navigate("/")}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Return to Exam
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Show loading state
  if (!results) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl">Loading results...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">Exam Results</h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Score Summary */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl mb-4 font-semibold">Score Summary</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Score:</span>
                <span className="font-bold text-lg">
                  {results.score.toFixed(2)}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Questions Attempted:</span>
                <span className="font-bold">
                  {results.attempted}/{results.total_questions}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Correct Answers:</span>
                <span className="font-bold">
                  {results.correct}/{results.total_questions}
                </span>
              </div>
            </div>
          </div>

          {/* Donut Chart */}
          <div className="flex flex-col items-center justify-center bg-gray-50 p-6 rounded-lg">
            <PieChart width={200} height={200}>
              <Pie
                data={[
                  { name: "Correct", value: results.correct },
                  {
                    name: "Incorrect",
                    value: results.total_questions - results.correct,
                  },
                ]}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                <Cell fill="#4CAF50" />
                <Cell fill="#f44336" />
              </Pie>
            </PieChart>
            <div className="mt-4 flex gap-4">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span>Correct</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                <span>Incorrect</span>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Results Table */}
        <div className="mt-8">
          <h2 className="text-xl mb-4 font-semibold">Question Details</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-2 border">Q.No</th>
                  <th className="px-4 py-2 border">Question</th>
                  <th className="px-4 py-2 border">Your Answer</th>
                  <th className="px-4 py-2 border">Correct Answer</th>
                  <th className="px-4 py-2 border">Status</th>
                </tr>
              </thead>
              <tbody>
                {results.detailed_results.map((result, index) => (
                  <tr
                    key={index}
                    className={result.is_correct ? "bg-green-50" : "bg-red-50"}
                  >
                    <td className="px-4 py-2 border text-center">
                      {index + 1}
                    </td>
                    <td className="px-4 py-2 border">{result.question_text}</td>
                    <td className="px-4 py-2 border text-center">
                      {result.selected_option}
                    </td>
                    <td className="px-4 py-2 border text-center">
                      {result.correct_option}
                    </td>
                    <td className="px-4 py-2 border text-center">
                      {result.is_correct ? "Correct" : "Incorrect"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <button
          onClick={generatePDF}
          className="mt-8 w-full px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
        >
          Download Detailed Report (PDF)
        </button>
        <button
          onClick={() => navigate("/roadmap")}
          className="mt-4 w-full px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          View Personalized Learning Roadmap
        </button>
        <CertificateGenerator />
      </div>
    </div>
  );
};

export default ResultsPage;
