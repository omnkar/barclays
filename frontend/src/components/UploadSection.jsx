import React, { useState, useRef } from 'react';
import { Upload, File, X, CheckCircle } from 'lucide-react';

const UploadSection = ({ onFileChange, onProcess }) => {
  const [fileList, setFileList] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    setFileList(files);
    if (onFileChange) onFileChange(e);
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    setFileList(files);
    
    // Create a fake event to pass to the parent
    const fakeEvent = { target: { files: e.dataTransfer.files } };
    if (onFileChange) onFileChange(fakeEvent);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const removeFile = (index) => {
    const newFileList = [...fileList];
    newFileList.splice(index, 1);
    setFileList(newFileList);
  };

  const getFileIcon = (fileName) => {
    const extension = fileName.split('.').pop().toLowerCase();
    
    switch (extension) {
      case 'pdf':
        return <div className="h-8 w-8 bg-red-100 text-red-600 rounded flex items-center justify-center">PDF</div>;
      case 'docx':
      case 'doc':
        return <div className="h-8 w-8 bg-blue-100 text-blue-600 rounded flex items-center justify-center">DOC</div>;
      case 'xlsx':
      case 'xls':
        return <div className="h-8 w-8 bg-green-100 text-green-600 rounded flex items-center justify-center">XLS</div>;
      case 'jpg':
      case 'jpeg':
      case 'png':
        return <div className="h-8 w-8 bg-purple-100 text-purple-600 rounded flex items-center justify-center">IMG</div>;
      default:
        return <div className="h-8 w-8 bg-gray-100 text-gray-600 rounded flex items-center justify-center">FILE</div>;
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-2">Upload Term Sheets</h2>
      <p className="text-gray-500 mb-6">Drag and drop files here or click to browse</p>
      
      <div
        className={`border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center transition-colors ${
          isDragging ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-indigo-400'
        }`}
        onDrop={handleFileDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current.click()}
      >
        <div className="h-16 w-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
          <Upload size={28} className="text-indigo-600" />
        </div>
        <p className="text-sm text-gray-600 mb-2">
          <span className="font-medium">Click to upload</span> or drag and drop
        </p>
        <p className="text-xs text-gray-500">Supported formats: PDF, DOCX, XLSX, JPG, PNG</p>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".pdf,.docx,.xlsx,.jpg,.png"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>

      {fileList.length > 0 && (
        <div className="mt-6">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Selected Files ({fileList.length})</h3>
          <div className="space-y-3">
            {fileList.map((file, index) => (
              <div 
                key={index}
                className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border border-gray-200"
              >
                <div className="flex items-center">
                  {getFileIcon(file.name)}
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-700">{file.name}</p>
                    <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(1)} KB</p>
                  </div>
                </div>
                <button 
                  className="text-gray-400 hover:text-gray-600"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(index);
                  }}
                >
                  <X size={18} />
                </button>
              </div>
            ))}
          </div>
          
          <div className="mt-6">
            <button 
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none w-full justify-center"
              onClick={onProcess}
            >
              <CheckCircle size={18} className="mr-2" />
              Process Term Sheets
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadSection;