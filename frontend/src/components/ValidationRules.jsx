import React, { useState, useRef, useEffect } from 'react';
import { CheckCircle, AlertTriangle, Filter, Plus, Search, ChevronDown } from 'lucide-react';

const ValidationRules = () => {
  // Example of validation rules with their status
  const [rules] = useState([
    { 
      id: 1, 
      rule: 'Counterparty Name must match the official name', 
      status: 'Passed', 
      description: 'Validates that the counterparty name exactly matches our database of official legal entity names.',
      category: 'Counterparty'
    },
    { 
      id: 2, 
      rule: 'Principal Amount must be greater than $1,000,000', 
      status: 'Failed',
      description: 'Ensures the principal amount meets minimum threshold requirements for this type of agreement.',
      category: 'Amount'
    },
    { 
      id: 3, 
      rule: 'Interest Rate must be within acceptable range (3% - 5%)', 
      status: 'Passed',
      description: 'Checks if the interest rate falls within the approved range for this class of transaction.',
      category: 'Terms'
    },
    { 
      id: 4, 
      rule: 'Maturity Date must not be in the past', 
      status: 'Failed',
      description: 'Validates that all maturity dates are set in the future relative to the agreement date.',
      category: 'Date'
    },
    { 
      id: 5, 
      rule: 'Term should be between 1 and 10 years', 
      status: 'Passed',
      description: 'Confirms that the term length is within acceptable parameters.',
      category: 'Terms'
    },
  ]);

  const [filterStatus, setFilterStatus] = useState('all');
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const filterRef = useRef(null);

  // Extract unique categories for filtering
  const categories = ['all', ...new Set(rules.map(rule => rule.category))];

  // Close filter menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setShowFilterMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Apply all filters
  const filteredRules = rules
    .filter(rule => {
      // Filter by status
      if (filterStatus !== 'all' && rule.status.toLowerCase() !== filterStatus.toLowerCase()) {
        return false;
      }
      
      // Filter by category
      if (filterCategory !== 'all' && rule.category !== filterCategory) {
        return false;
      }
      
      // Filter by search term
      if (searchTerm && !rule.rule.toLowerCase().includes(searchTerm.toLowerCase()) && 
          !rule.description.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      
      return true;
    });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Validation Rules</h2>
        <div className="flex space-x-2">
          <div className="relative" ref={filterRef}>
            <button 
              className="flex items-center px-4 py-2 text-sm border border-gray-300 rounded-md bg-white"
              onClick={() => setShowFilterMenu(!showFilterMenu)}
            >
              <Filter size={16} className="mr-2" />
              Filter Rules
              <ChevronDown size={16} className="ml-2" />
            </button>
            
            {showFilterMenu && (
              <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                <div className="p-3 border-b">
                  <p className="font-medium text-gray-700 mb-2">Filter Options</p>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search rules..."
                      className="w-full p-2 pl-8 text-sm border border-gray-300 rounded-md"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Search size={14} className="absolute left-2 top-3 text-gray-400" />
                  </div>
                </div>
                
                <div className="p-3 border-b">
                  <p className="font-medium text-gray-700 mb-2">By Category</p>
                  <div className="space-y-1">
                    {categories.map(category => (
                      <div key={category} className="flex items-center">
                        <input
                          type="radio"
                          id={`category-${category}`}
                          name="category"
                          checked={filterCategory === category}
                          onChange={() => setFilterCategory(category)}
                          className="mr-2"
                        />
                        <label htmlFor={`category-${category}`} className="text-sm text-gray-600 capitalize">
                          {category}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="p-3 flex justify-between">
                  <button 
                    className="text-xs text-gray-600"
                    onClick={() => {
                      setSearchTerm('');
                      setFilterCategory('all');
                      setFilterStatus('all');
                      setShowFilterMenu(false);
                    }}
                  >
                    Reset Filters
                  </button>
                  <button 
                    className="text-xs bg-indigo-600 text-white px-3 py-1 rounded"
                    onClick={() => setShowFilterMenu(false)}
                  >
                    Apply
                  </button>
                </div>
              </div>
            )}
          </div>
          <button className="flex items-center px-4 py-2 text-sm bg-indigo-600 text-white rounded-md">
            <Plus size={16} className="mr-2" />
            Add Rule
          </button>
        </div>
      </div>

      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`py-2 px-4 font-medium text-sm ${
            filterStatus === 'all'
              ? 'border-b-2 border-indigo-600 text-indigo-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setFilterStatus('all')}
        >
          All Rules
        </button>
        <button
          className={`py-2 px-4 font-medium text-sm ${
            filterStatus === 'passed'
              ? 'border-b-2 border-indigo-600 text-indigo-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setFilterStatus('passed')}
        >
          Passed
        </button>
        <button
          className={`py-2 px-4 font-medium text-sm ${
            filterStatus === 'failed'
              ? 'border-b-2 border-indigo-600 text-indigo-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setFilterStatus('failed')}
        >
          Failed
        </button>
      </div>

      {/* Filter indicators */}
      {(searchTerm || filterCategory !== 'all') && (
        <div className="flex flex-wrap gap-2 mb-4">
          {searchTerm && (
            <div className="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full flex items-center">
              Search: {searchTerm}
              <button 
                className="ml-1 text-gray-500 hover:text-gray-700"
                onClick={() => setSearchTerm('')}
              >
                ×
              </button>
            </div>
          )}
          {filterCategory !== 'all' && (
            <div className="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full flex items-center">
              Category: {filterCategory}
              <button 
                className="ml-1 text-gray-500 hover:text-gray-700"
                onClick={() => setFilterCategory('all')}
              >
                ×
              </button>
            </div>
          )}
          <button 
            className="text-xs text-indigo-600 hover:text-indigo-800 underline"
            onClick={() => {
              setSearchTerm('');
              setFilterCategory('all');
            }}
          >
            Clear all filters
          </button>
        </div>
      )}

      {filteredRules.length === 0 ? (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
          <p className="text-gray-500">No rules match your current filters.</p>
          <button 
            className="mt-2 text-indigo-600 text-sm font-medium"
            onClick={() => {
              setSearchTerm('');
              setFilterCategory('all');
              setFilterStatus('all');
            }}
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredRules.map((rule) => (
            <div 
              key={rule.id} 
              className={`bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow ${
                rule.status === 'Passed' ? 'border-green-200' : 'border-red-200'
              }`}
            >
              <div className="p-4">
                <div className="flex items-start">
                  <div className={`flex-shrink-0 rounded-full p-1 ${
                    rule.status === 'Passed' ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {rule.status === 'Passed' ? (
                      <CheckCircle size={24} />
                    ) : (
                      <AlertTriangle size={24} />
                    )}
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-medium text-gray-900">{rule.rule}</h3>
                    <div className="flex items-center mt-1">
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded mr-2">
                        {rule.category}
                      </span>
                      <p className="text-sm text-gray-600">{rule.description}</p>
                    </div>
                  </div>
                  <div className="ml-auto">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      rule.status === 'Passed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {rule.status}
                    </span>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 border-t border-gray-100 flex justify-end">
                <button className="text-xs text-indigo-600 font-medium hover:text-indigo-800">
                  Edit Rule
                </button>
                <span className="mx-2 text-gray-300">|</span>
                <button className="text-xs text-indigo-600 font-medium hover:text-indigo-800">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ValidationRules;