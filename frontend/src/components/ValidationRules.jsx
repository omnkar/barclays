import React, { useState, useRef, useEffect } from 'react';
import { CheckCircle, AlertTriangle, Filter, Plus, Search, ChevronDown, Upload, File, X } from 'lucide-react';

const ValidationRules = () => {
  // Example of validation rules with their status
  const [rules, setRules] = useState([
    { 
      id: 1, 
      rule: 'Counterparty Name must match the official name', 
      status: 'Passed', 
      description: 'Validates that the counterparty name exactly matches our database of official legal entity names.',
      category: 'Counterparty',
      source: 'Default'
    },
    { 
      id: 2, 
      rule: 'Principal Amount must be greater than $1,000,000', 
      status: 'Failed',
      description: 'Ensures the principal amount meets minimum threshold requirements for this type of agreement.',
      category: 'Amount',
      source: 'Default'
    },
    { 
      id: 3, 
      rule: 'Interest Rate must be within acceptable range (3% - 5%)', 
      status: 'Passed',
      description: 'Checks if the interest rate falls within the approved range for this class of transaction.',
      category: 'Terms',
      source: 'Default'
    },
    { 
      id: 4, 
      rule: 'Maturity Date must not be in the past', 
      status: 'Failed',
      description: 'Validates that all maturity dates are set in the future relative to the agreement date.',
      category: 'Date',
      source: 'Default'
    },
    { 
      id: 5, 
      rule: 'Term should be between 1 and 10 years', 
      status: 'Passed',
      description: 'Confirms that the term length is within acceptable parameters.',
      category: 'Terms',
      source: 'Default'
    },
  ]);

  const [filterStatus, setFilterStatus] = useState('all');
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterSource, setFilterSource] = useState('all');
  const filterRef = useRef(null);
  const fileInputRef = useRef(null);
  
  // State for PDF upload modal
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractedRules, setExtractedRules] = useState([]);
  const [companyName, setCompanyName] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [extractionProgress, setExtractionProgress] = useState(0);

  // Extract unique categories and sources for filtering
  const categories = ['all', ...new Set(rules.map(rule => rule.category))];
  const sources = ['all', ...new Set(rules.map(rule => rule.source))];

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
      
      // Filter by source
      if (filterSource !== 'all' && rule.source !== filterSource) {
        return false;
      }
      
      // Filter by search term
      if (searchTerm && !rule.rule.toLowerCase().includes(searchTerm.toLowerCase()) && 
          !rule.description.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      
      return true;
    });

  // Handle file upload
  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      setUploadedFile(file);
      
      // Reset extraction state
      setExtractedRules([]);
      setUploadProgress(0);
      setExtractionProgress(0);
    }
  };

  // Simulate file upload progress
  const simulateUpload = () => {
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
    return interval;
  };

  // Simulate extraction progress
  const simulateExtraction = () => {
    setExtractionProgress(0);
    const interval = setInterval(() => {
      setExtractionProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 300);
    return interval;
  };

  // Extract rules from uploaded PDF
  const extractRulesFromPDF = () => {
    if (!uploadedFile) return;
    
    setIsExtracting(true);
    
    // Simulate upload progress
    const uploadInterval = simulateUpload();
    
    setTimeout(() => {
      clearInterval(uploadInterval);
      setUploadProgress(100);
      
      // After upload completes, simulate extraction
      const extractionInterval = simulateExtraction();
      
      // Mock extraction - in a real app, this would use a PDF parsing library
      setTimeout(() => {
        clearInterval(extractionInterval);
        setExtractionProgress(100);
        
        // Example of extracted rules (in real app, these would come from the PDF)
        const newRules = [
          {
            id: rules.length + 1,
            rule: 'Compliance with Section 3.2.1 of Company Regulations',
            status: 'Passed',
            description: 'All transactions must comply with internal governance standards.',
            category: 'Compliance',
            source: companyName || 'Uploaded PDF'
          },
          {
            id: rules.length + 2,
            rule: 'Document retention period minimum of 7 years',
            status: 'Passed',
            description: 'All transaction documents must be stored securely for at least 7 years.',
            category: 'Documentation',
            source: companyName || 'Uploaded PDF'
          },
          {
            id: rules.length + 3,
            rule: 'Authorized signatures required from both parties',
            status: 'Failed',
            description: 'All agreements must have authorized signatures from both counterparties.',
            category: 'Authorization',
            source: companyName || 'Uploaded PDF'
          }
        ];
        
        setExtractedRules(newRules);
        setIsExtracting(false);
      }, 3000);
    }, 2000);
  };

  // Import extracted rules to the main rules list
  const importExtractedRules = () => {
    if (extractedRules.length > 0) {
      setRules([...rules, ...extractedRules]);
      setShowUploadModal(false);
      setUploadedFile(null);
      setExtractedRules([]);
      setCompanyName('');
    }
  };

  return (
    <div>
      {/* Main header with controls */}
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
                
                <div className="p-3 border-b">
                  <p className="font-medium text-gray-700 mb-2">By Source</p>
                  <div className="space-y-1">
                    {sources.map(source => (
                      <div key={source} className="flex items-center">
                        <input
                          type="radio"
                          id={`source-${source}`}
                          name="source"
                          checked={filterSource === source}
                          onChange={() => setFilterSource(source)}
                          className="mr-2"
                        />
                        <label htmlFor={`source-${source}`} className="text-sm text-gray-600">
                          {source}
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
                      setFilterSource('all');
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
          
          <button 
            className="flex items-center px-4 py-2 text-sm bg-green-600 text-white rounded-md"
            onClick={() => setShowUploadModal(true)}
          >
            <Upload size={16} className="mr-2" />
            Upload Regulations
          </button>
          
          <button className="flex items-center px-4 py-2 text-sm bg-indigo-600 text-white rounded-md">
            <Plus size={16} className="mr-2" />
            Add Rule
          </button>
        </div>
      </div>

      {/* Status filter tabs */}
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
      {(searchTerm || filterCategory !== 'all' || filterSource !== 'all') && (
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
          {filterSource !== 'all' && (
            <div className="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full flex items-center">
              Source: {filterSource}
              <button 
                className="ml-1 text-gray-500 hover:text-gray-700"
                onClick={() => setFilterSource('all')}
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
              setFilterSource('all');
            }}
          >
            Clear all filters
          </button>
        </div>
      )}

      {/* Rule listing */}
      {filteredRules.length === 0 ? (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
          <p className="text-gray-500">No rules match your current filters.</p>
          <button 
            className="mt-2 text-indigo-600 text-sm font-medium"
            onClick={() => {
              setSearchTerm('');
              setFilterCategory('all');
              setFilterStatus('all');
              setFilterSource('all');
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
                    <div className="flex flex-wrap items-center mt-1 gap-2">
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                        {rule.category}
                      </span>
                      {rule.source && rule.source !== 'Default' && (
                        <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded">
                          {rule.source}
                        </span>
                      )}
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

      {/* PDF Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-xl w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-800">Upload Regulations Document</h3>
              <button 
                className="text-gray-400 hover:text-gray-600" 
                onClick={() => setShowUploadModal(false)}
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company Name (Optional)
              </label>
              <input 
                type="text" 
                className="w-full p-2 border border-gray-300 rounded-md"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Enter company name"
              />
            </div>
            
            {!uploadedFile ? (
              <div 
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-indigo-500"
                onClick={() => fileInputRef.current.click()}
              >
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept=".pdf"
                  onChange={handleFileChange}
                />
                <div className="flex justify-center mb-2">
                  <Upload size={36} className="text-gray-400" />
                </div>
                <p className="text-gray-600 mb-1">Click to upload or drag and drop</p>
                <p className="text-xs text-gray-500">PDF files only</p>
              </div>
            ) : (
              <div className="mb-6">
                <div className="flex items-center p-4 bg-gray-50 rounded-lg mb-4">
                  <File size={24} className="text-indigo-600 mr-3" />
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{uploadedFile.name}</p>
                    <p className="text-xs text-gray-500">
                      {(uploadedFile.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                  <button 
                    className="text-gray-400 hover:text-gray-600"
                    onClick={() => setUploadedFile(null)}
                  >
                    <X size={16} />
                  </button>
                </div>
                
                {isExtracting ? (
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-xs text-gray-600 mb-1">
                        <span>Uploading document</span>
                        <span>{uploadProgress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-indigo-600 h-2 rounded-full" 
                          style={{ width: `${uploadProgress}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    {uploadProgress === 100 && (
                      <div>
                        <div className="flex justify-between text-xs text-gray-600 mb-1">
                          <span>Extracting rules</span>
                          <span>{extractionProgress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-600 h-2 rounded-full" 
                            style={{ width: `${extractionProgress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <button
                    className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={extractRulesFromPDF}
                  >
                    Extract Rules
                  </button>
                )}
              </div>
            )}
            
            {/* Extracted Rules Preview */}
            {extractedRules.length > 0 && (
              <div className="mt-6">
                <h4 className="text-lg font-medium text-gray-800 mb-3">Extracted Rules</h4>
                <div className="max-h-64 overflow-y-auto">
                  {extractedRules.map((rule, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-md mb-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-800">{rule.rule}</p>
                          <p className="text-sm text-gray-600">{rule.description}</p>
                          <div className="flex mt-1 space-x-2">
                            <span className="text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded">
                              {rule.category}
                            </span>
                            <span className={`text-xs px-2 py-0.5 rounded ${
                              rule.status === 'Passed' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {rule.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="mt-6 flex justify-end space-x-3">
              <button 
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                onClick={() => setShowUploadModal(false)}
              >
                Cancel
              </button>
              <button 
                className={`px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 ${
                  extractedRules.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={extractedRules.length === 0}
                onClick={importExtractedRules}
              >
                Import Rules
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ValidationRules;