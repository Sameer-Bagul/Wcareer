import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import PropTypes from 'prop-types';

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto mb-8">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search threads by tags or keywords..."
          className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
      </div>
    </form>
  );
}

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired
};


export default SearchBar;