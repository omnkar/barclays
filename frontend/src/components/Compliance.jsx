import React, { useState } from 'react';
import { 
  ShieldCheck, 
  AlertCircle, 
  Clock, 
  FileText, 
  Filter, 
  Download, 
  Search, 
  ChevronDown, 
  CheckCircle, 
  XCircle, 
  AlertTriangle 
} from 'lucide-react';

const Compliance = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Sample compliance items
  const complianceItems = [
    {
      id: 1,
      category: 'Regulatory',
      title: 'KYC Verification',
      status: 'completed',
      dueDate: '2025-03-15',
      lastUpdated: '2025-03-10',
      assignedTo: 'Sarah Johnson',
      riskLevel: 'low',
      description: 'Customer identification and verification process completed successfully.'
    },
    {
      id: 2,
      category: 'Legal',
      title: 'Securities Disclosure Documentation',
      status: 'pending',
      dueDate: '2025-04-10',
      lastUpdated: '2025-03-25',
      assignedTo: 'Michael Chen',
      riskLevel: 'medium',
      description: 'Pending final review of securities disclosures for Series B funding round.'
    },
    {
      id: 3,
      category: 'Internal',
      title: 'Credit Committee Approval',
      status: 'overdue',
      dueDate: '2025-03-20',
      lastUpdated: '2025-03-01',
      assignedTo: 'David Williams',
      riskLevel: 'high',
      description: 'Credit committee approval required for loan terms exceeding standard limits.'
    },
    {
      id: 4,
      category: 'Regulatory',
      title: 'OFAC Sanctions Screening',
      status: 'completed',
      dueDate: '2025-03-05',
      lastUpdated: '2025-03-04',
      assignedTo: 'Sarah Johnson',
      riskLevel: 'low',
      description: 'All parties screened against OFAC sanctions list with no matches found.'
    },
    {
      id: 5,
      category: 'Legal',
      title: 'Signature Verification',
      status: 'in-progress',
      dueDate: '2025-04-05',
      lastUpdated: '2025-03-28',
      assignedTo: 'Lisa Rodriguez',
      riskLevel: 'medium',
      description: 'Verifying authorized signatories against corporate resolutions.'
    },
    {
      id: 6,
      category: 'Internal',
      title: 'Risk Exposure Assessment',
      status: 'completed',
      dueDate: '2025-03-15',
      lastUpdated: '2025-03-12',
      assignedTo: 'Thomas Clark',
      riskLevel: 'low',
      description: 'Assessment of counterparty risk exposure within approved limits.'
    },
  ];

  // Compliance metrics
  const metrics = [
    { title: 'Completed', count: 3, color: 'bg-green-500', icon: <CheckCircle size={20} /> },
    { title: 'In Progress', count: 1, color: 'bg-blue-500', icon: <Clock size={20} /> },
    { title: 'Pending', count: 1, color: 'bg-yellow-500', icon: <AlertTriangle size={20} /> },
    { title: 'Overdue', count: 1, color: 'bg-red-500', icon: <XCircle size={20} /> },
  ];

  // Risk metrics
  const riskMetrics = [
    { level: 'Low', count: 3, color: 'bg-green-100 text-green-800' },
    { level: 'Medium', count: 2, color: 'bg-yellow-100 text-yellow-800' },
    { level: 'High', count: 1, color: 'bg-red-100 text-red-800' },
  ];

  // Filter compliance items based on search term
  const filteredItems = complianceItems.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get status badge styling
  const getStatusBadge = (status) => {
    switch(status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Get risk level badge styling
  const getRiskBadge = (risk) => {
    switch(risk) {
      case 'low':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'high':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="px-6 py-8 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Compliance</h1>
          <div className="flex space-x-3">
            <button className="flex items-center px-4 py-2 text-sm bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50">
              <Filter size={16} className="mr-2" />
              Filter
            </button>
            <button className="flex items-center px-4 py-2 text-sm bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50">
              <Download size={16} className="mr-2" />
              Export
            </button>
            <button className="flex items-center px-4 py-2 text-sm bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700">
              <ShieldCheck size={16} className="mr-2" />
              Run Compliance Check
            </button>
          </div>
        </div>

        {/* Compliance Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {metrics.map((metric, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
              <div className="flex items-center">
                <div className={`p-2 rounded-full ${metric.color.replace('bg-', 'bg-opacity-20 ')} ${metric.color.replace('bg-', 'text-')}`}>
                  {metric.icon}
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">{metric.count}</h3>
                  <p className="text-sm text-gray-500">{metric.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === 'overview'
                    ? 'border-b-2 border-indigo-500 text-indigo-600'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('regulatory')}
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === 'regulatory'
                    ? 'border-b-2 border-indigo-500 text-indigo-600'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Regulatory
              </button>
              <button
                onClick={() => setActiveTab('legal')}
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === 'legal'
                    ? 'border-b-2 border-indigo-500 text-indigo-600'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Legal Documentation
              </button>
              <button
                onClick={() => setActiveTab('internal')}
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === 'internal'
                    ? 'border-b-2 border-indigo-500 text-indigo-600'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Internal Policy
              </button>
              <button
                onClick={() => setActiveTab('audit')}
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === 'audit'
                    ? 'border-b-2 border-indigo-500 text-indigo-600'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Audit Trail
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-medium text-gray-900">Compliance Tasks Overview</h2>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search compliance items..."
                      className="pl-10 pr-3 py-2 w-64 text-sm border border-gray-300 rounded-md"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
                  </div>
                </div>

                {/* Risk Level Summary */}
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Risk Distribution</h3>
                  <div className="flex space-x-4">
                    {riskMetrics.map((risk, index) => (
                      <div key={index} className="flex items-center">
                        <span className={`inline-block w-3 h-3 rounded-full ${risk.color.split(' ')[0]}`}></span>
                        <span className="text-sm text-gray-600 ml-2">{risk.level}: {risk.count}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Compliance Items List */}
                <div className="space-y-4">
                  {filteredItems.map((item) => (
                    <div key={item.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow transition-shadow">
                      <div className="p-4">
                        <div className="flex items-start">
                          <div className={`flex-shrink-0 p-1 rounded-full ${
                            item.status === 'completed' ? 'text-green-500' :
                            item.status === 'overdue' ? 'text-red-500' : 'text-yellow-500'
                          }`}>
                            {item.status === 'completed' ? <CheckCircle size={24} /> : 
                             item.status === 'overdue' ? <AlertCircle size={24} /> : <Clock size={24} />}
                          </div>
                          <div className="ml-3 flex-grow">
                            <div className="flex justify-between">
                              <h3 className="text-lg font-medium text-gray-900">{item.title}</h3>
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(item.status)}`}>
                                {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                              </span>
                            </div>
                            <div className="mt-1">
                              <span className="inline-flex items-center mr-3 px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                                {item.category}
                              </span>
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRiskBadge(item.riskLevel)}`}>
                                {item.riskLevel.charAt(0).toUpperCase() + item.riskLevel.slice(1)} Risk
                              </span>
                            </div>
                            <p className="mt-2 text-sm text-gray-600">{item.description}</p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 px-4 py-3 border-t border-gray-200 flex justify-between items-center">
                        <div className="flex items-center text-xs text-gray-500">
                          <Clock size={14} className="mr-1" />
                          Due: {new Date(item.dueDate).toLocaleDateString()}
                          <span className="mx-2">|</span>
                          <span>Assigned to: {item.assignedTo}</span>
                        </div>
                        <div className="flex">
                          <button className="text-xs text-indigo-600 font-medium hover:text-indigo-800 mr-3">
                            View Details
                          </button>
                          <button className="text-xs bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700">
                            Update Status
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab !== 'overview' && (
              <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                <div className="text-center">
                  <FileText size={40} className="mx-auto text-gray-400 mb-3" />
                  <h3 className="text-lg font-medium text-gray-900 mb-1">
                    {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Section
                  </h3>
                  <p className="text-sm text-gray-500">
                    This section is under development. Check back soon for updates.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Compliance Activity</h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="p-1 rounded-full bg-blue-100 text-blue-600">
                <CheckCircle size={16} />
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-600">
                  <span className="font-medium text-gray-900">Sarah Johnson</span> completed <span className="font-medium text-gray-900">KYC Verification</span>
                </p>
                <p className="text-xs text-gray-500">Today at 10:30 AM</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="p-1 rounded-full bg-yellow-100 text-yellow-600">
                <Clock size={16} />
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-600">
                  <span className="font-medium text-gray-900">Lisa Rodriguez</span> started <span className="font-medium text-gray-900">Signature Verification</span>
                </p>
                <p className="text-xs text-gray-500">Yesterday at 2:15 PM</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="p-1 rounded-full bg-red-100 text-red-600">
                <AlertCircle size={16} />
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-600">
                  <span className="font-medium text-gray-900">Credit Committee Approval</span> is now overdue
                </p>
                <p className="text-xs text-gray-500">Yesterday at 11:45 AM</p>
              </div>
            </div>
          </div>
          <button className="mt-4 text-sm text-indigo-600 font-medium hover:text-indigo-800">
            View all activity
          </button>
        </div>
      </div>
    </div>
  );
};

export default Compliance;