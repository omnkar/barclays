import React, { useState } from 'react';
import { AlertCircle, Check, FileText, Download, Send } from 'lucide-react';

const ResultSection = () => {
  const [selectedTab, setSelectedTab] = useState('summary');

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  const extractedData = [
    { field: 'Counterparty', value: 'Goldman Sachs' },
    { field: 'Principal Amount', value: '$5,000,000' },
    { field: 'Interest Rate', value: '4.25%' },
    { field: 'Term', value: '5 Years' },
    { field: 'Maturity Date', value: '2028-11-30' },
  ];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Validation Results</h2>
        <div className="px-3 py-1 bg-gray-200 rounded-full text-sm font-medium text-gray-700">
          Document ID: TS-2023-11-28-00142
        </div>
      </div>

      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`py-3 px-6 font-medium text-sm ${
            selectedTab === 'summary'
              ? 'border-b-2 border-indigo-600 text-indigo-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => handleTabClick('summary')}
        >
          Validation Summary
        </button>
        <button
          className={`py-3 px-6 font-medium text-sm ${
            selectedTab === 'extracted'
              ? 'border-b-2 border-indigo-600 text-indigo-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => handleTabClick('extracted')}
        >
          Extracted Data
        </button>
        <button
          className={`py-3 px-6 font-medium text-sm ${
            selectedTab === 'report'
              ? 'border-b-2 border-indigo-600 text-indigo-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => handleTabClick('report')}
        >
          Full Report
        </button>
      </div>

      {selectedTab === 'summary' && (
        <div className="space-y-4">
          <div className="flex bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
            <div className="mr-4 flex-shrink-0">
              <AlertCircle className="h-6 w-6 text-red-500" />
            </div>
            <div>
              <h4 className="text-md font-medium text-red-800">Mismatch in Counterparty Details</h4>
              <p className="mt-1 text-sm text-red-700">
                The counterparty name in section 3A doesn't match our records. Expected "Goldman Sachs International", found "Goldman Sachs Group".
              </p>
            </div>
          </div>
          
          <div className="flex bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
            <div className="mr-4 flex-shrink-0">
              <Check className="h-6 w-6 text-green-500" />
            </div>
            <div>
              <h4 className="text-md font-medium text-green-800">Interest Rate Verified</h4>
              <p className="mt-1 text-sm text-green-700">
                The interest rate of 4.25% is within acceptable parameters for this type of agreement.
              </p>
            </div>
          </div>
          
          <div className="flex bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
            <div className="mr-4 flex-shrink-0">
              <AlertCircle className="h-6 w-6 text-yellow-500" />
            </div>
            <div>
              <h4 className="text-md font-medium text-yellow-800">Review Recommended</h4>
              <p className="mt-1 text-sm text-yellow-700">
                Some clauses in section 5B use non-standard language. Manual review by legal team is recommended.
              </p>
            </div>
          </div>
        </div>
      )}

      {selectedTab === 'extracted' && (
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Extracted Data</h3>
          <div className="overflow-x-auto bg-white border border-gray-200 rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Field
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Value
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {extractedData.map((data, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {data.field}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {data.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {selectedTab === 'report' && (
        <div>
          <div className="flex items-center mb-4">
            <FileText className="h-6 w-6 text-indigo-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-800">Full Report</h3>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <p className="text-gray-700">This section would contain the full detailed report...</p>
            <p className="text-gray-700 mt-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        </div>
      )}

      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Compliance Risk Assessment</h3>
        <div className="relative h-3 bg-gray-200 rounded-full mb-2">
          <div 
            className="absolute top-0 left-0 h-3 bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 rounded-full"
            style={{ width: '100%' }}
          ></div>
          <div 
            className="absolute top-0 h-6 w-6 bg-white border-2 border-yellow-500 rounded-full -mt-1.5 shadow-md"
            style={{ left: '72%' }}
          ></div>
        </div>
        <div className="flex justify-between text-xs text-gray-600">
          <span>Low</span>
          <span>Medium</span>
          <span>High</span>
        </div>
      </div>

      <div className="flex justify-end mt-8 space-x-4">
        <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none">
          <Download className="h-4 w-4 mr-2" />
          Export Full Report
        </button>
        <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none">
          <Send className="h-4 w-4 mr-2" />
          Send for Review
        </button>
      </div>
    </div>
  );
};

export default ResultSection;