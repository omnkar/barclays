import React, { useState } from 'react';
import { AlertCircle, Check, FileText, Download, Send } from 'lucide-react';

const ResultSection = () => {
  const [selectedTab, setSelectedTab] = useState('summary');

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  // Data extracted from the provided termsheets
  const extractedData = [
    { field: 'Issuer', value: 'TechInnovate Corp' },
    { field: 'Security', value: '6.25% Fixed Rate Bond due 2028-06-30' },
    { field: 'ISIN', value: 'INE012A07901' },
    { field: 'Principal Amount', value: 'INR 50,000,000' },
    { field: 'Currency', value: 'INR' },
    { field: 'Coupon Rate', value: '6.25% p.a.' },
    { field: 'Coupon Frequency', value: 'Annual' },
    { field: 'Maturity Date', value: '2028-06-30' },
    { field: 'Day Count', value: 'Actual/365' },
    { field: 'Price', value: '101.50' },
    { field: 'Settlement Date', value: '2025-04-03' },
    { field: 'Accrued Interest', value: 'INR 431,506.85' },
    { field: 'Total Consideration', value: 'INR 51,181,506.85' },
    { field: 'Buyer', value: 'XYZ Securities' },
    { field: 'Seller', value: 'Global Alpha Investments Ltd.' },
  ];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Termsheet Validation Results</h2>
        <div className="px-3 py-1 bg-gray-200 rounded-full text-sm font-medium text-gray-700">
          Document ID: GAI/20250401/BOND/012
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
          <div className="flex bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
            <div className="mr-4 flex-shrink-0">
              <Check className="h-6 w-6 text-green-500" />
            </div>
            <div>
              <h4 className="text-md font-medium text-green-800">Counterparty Details Verified</h4>
              <p className="mt-1 text-sm text-green-700">
                The buyer (XYZ Securities) and seller (Global Alpha Investments Ltd.) details match across both termsheets.
              </p>
            </div>
          </div>
          
          <div className="flex bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
            <div className="mr-4 flex-shrink-0">
              <Check className="h-6 w-6 text-green-500" />
            </div>
            <div>
              <h4 className="text-md font-medium text-green-800">Financial Terms Match</h4>
              <p className="mt-1 text-sm text-green-700">
                All financial terms including price (101.50), principal amount (INR 50,000,000), and total consideration (INR 51,181,506.85) are consistent across documents.
              </p>
            </div>
          </div>
          
          <div className="flex bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
            <div className="mr-4 flex-shrink-0">
              <AlertCircle className="h-6 w-6 text-yellow-500" />
            </div>
            <div>
              <h4 className="text-md font-medium text-yellow-800">Regulatory Clauses Review Recommended</h4>
              <p className="mt-1 text-sm text-yellow-700">
                The regulatory clauses appear truncated in both documents. Please verify the complete Foreign Exchange Management Act (FEMA) cross-border transaction requirements.
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
            <h4 className="font-medium text-gray-800 mb-3">Corporate Bond Transaction Summary</h4>
            <p className="text-gray-700 mb-2">
              Transaction analysis of TechInnovate Corp 6.25% Fixed Rate Bond due June 30, 2028 (ISIN: INE012A07901) between Global Alpha Investments Ltd. (seller) and XYZ Securities (buyer).
            </p>
            
            <h4 className="font-medium text-gray-800 mt-4 mb-2">Key Findings</h4>
            <ul className="list-disc pl-5 text-gray-700 space-y-1">
              <li>Trade date confirmed as April 1, 2025</li>
              <li>Settlement scheduled for April 3, 2025 (T+2)</li>
              <li>Price verified at 101.50 per 100 nominal</li>
              <li>Accrued interest calculated correctly at INR 431,506.85</li>
              <li>Total consideration of INR 51,181,506.85 is consistent</li>
              <li>Internal references are correctly recorded by both parties</li>
              <li>Both termsheets reference identical regulatory compliance requirements</li>
            </ul>
            
            <h4 className="font-medium text-gray-800 mt-4 mb-2">Recommendations</h4>
            <p className="text-gray-700">
              Complete verification of FEMA compliance is recommended as the regulatory clause appears to be truncated in both documents. KYC and AML compliance has been verified for both parties.
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
            className="absolute top-0 h-6 w-6 bg-white border-2 border-green-500 rounded-full -mt-1.5 shadow-md"
            style={{ left: '20%' }}
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
          Send for Approval
        </button>
      </div>
    </div>
  );
};

export default ResultSection;