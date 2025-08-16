import React from 'react';
import { Upload } from 'lucide-react';

const UploadTab = ({ 
  studentId, 
  setStudentId, 
  jsonData, 
  setJsonData, 
  csvFile, 
  setCsvFile, 
  onUploadJSON, 
  onUploadCSV, 
  loading 
}) => {
  return (
    <div className="space-y-6">
      {/* Student ID Input */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Student ID</label>
          <input
            type="text"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            className="w-40 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="S000"
          />
        </div>
      </div>

      {/* JSON Upload */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="mb-4">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Upload JSON Data</h3>
          <p className="text-sm text-gray-600">Paste student attempt data in JSON format</p>
        </div>

        <div className="space-y-4">
          <textarea
            value={jsonData}
            onChange={(e) => setJsonData(e.target.value)}
            className="w-full h-48 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
            placeholder='[{"topic": "Borrowing Costs", "concept": "Definitions", ...}]'
          />
          <button
            onClick={onUploadJSON}
            disabled={loading || !jsonData.trim()}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
          >
            <Upload className="h-4 w-4" />
            {loading ? 'Uploading...' : 'Upload JSON'}
          </button>
        </div>
      </div>

      {/* CSV Upload */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="mb-4">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Upload CSV File</h3>
          <p className="text-sm text-gray-600">Select a CSV file with student attempt data</p>
        </div>

        <div className="space-y-4">
          <input
            type="file"
            accept=".csv"
            onChange={(e) => setCsvFile(e.target.files[0])}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          <button
            onClick={onUploadCSV}
            disabled={loading || !csvFile}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
          >
            <Upload className="h-4 w-4" />
            {loading ? 'Uploading...' : 'Upload CSV'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadTab;