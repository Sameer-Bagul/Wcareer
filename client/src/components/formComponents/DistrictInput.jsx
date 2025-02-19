// component/CountryInput.js

import React from "react";

const countries = [
  "Select District",
  "Amritsar",
  "Barnala",
  "Bathinda",
  "Faridkot",
  "Fatehgarh Sahib",
  "Fazilka",
  "Ferozepur",
  "Gurdaspur",
  "Hoshiarpur",
  "Jalandhar",
  "Kapurthala",
  "Ludhiana",
  "Malerkotla",
  "Mansa",
  "Moga",
  "Muktsar",
  "Pathankot",
  "Patiala",
  "Rupnagar",
  "Sangrur",
  "SAS Nagar (Mohali)",
  "Shaheed Bhagat Singh Nagar (Nawanshahr)",
  "Tarn Taran",
];

const DistrictInput = () => {
  return (
    <div className="max-w-xl">
      <div className="mb-2 block">
        <label htmlFor="District" className="text-sm font-medium required">
          District
        </label>
      </div>
      <select
        id="district"
        name="district"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
        required
      >
        {countries.map((el, index) => (
          <option key={index}>{el}</option>
        ))}
      </select>
    </div>
  );
};

export default DistrictInput;
