import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Sidebar from './components/SideBar';
import Header from './components/Header';
import StatsCard from './components/StatsCard';
import UploadSection from './components/UploadSection';
import ResultsSection from './components/ResultSection';
import ValidationRules from './components/ValidationRules';
import TermSheet from './components/TermSheet';
import Analytics from './components/Analytics';
import Compliance from './components/Compliance';

function App() {
  const [files, setFiles] = useState([]);
  const [isProcessed, setIsProcessed] = useState(false);

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const handleProcess = () => {
    setIsProcessed(true);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <div className="flex-1 overflow-y-auto p-6">
          <Routes>
            <Route
              path="/dashboard"
              element={
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <StatsCard 
                      title="Processed Today" 
                      value="142" 
                      trend="↑ 12% from yesterday" 
                      icon="📊"
                      color="#4F46E5"
                    />
                    <StatsCard 
                      title="Validation Rate" 
                      value="92.4%" 
                      trend="↑ 3.2% from last week" 
                      icon="✓"
                      color="#10B981"
                    />
                    <StatsCard 
                      title="Avg. Processing Time" 
                      value="47s" 
                      trend="↓ 22% from last month" 
                      icon="⏱"
                      color="#F59E0B"
                    />
                    <StatsCard 
                      title="Compliance Risk" 
                      value="Medium" 
                      trend="↓ 8% from last week" 
                      icon="⚠️"
                      color="#EF4444"
                    />
                  </div>
                  <div className="bg-white rounded-lg shadow-md mb-8">
                    <UploadSection onFileChange={handleFileChange} onProcess={handleProcess} />
                  </div>
                  {isProcessed && (
                    <div className="bg-white rounded-lg shadow-md">
                      <ResultsSection />
                    </div>
                  )}
                </>
              }
            />
            <Route path="/validationrules" element={<div className="bg-white rounded-lg shadow-md p-6"><ValidationRules /></div>} />
            <Route path="/termsheets" element={<div className="bg-white rounded-lg shadow-md p-6"><TermSheet/></div>} />
            <Route path="/analytics" element={<div className="bg-white rounded-lg shadow-md p-6"><Analytics/></div>} />
            <Route path="/compliance" element={<div className="bg-white rounded-lg shadow-md p-6"><Compliance/></div>} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;