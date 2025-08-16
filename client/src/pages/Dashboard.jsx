import React, { useState, useEffect } from 'react';
import { FileText, Database, Calculator } from 'lucide-react';
import Header from '../components/dashboard/Header';
import MessageAlert from '../components/dashboard/MessageAlert';
import PromptTab from '../components/tabs/PromptTab';
import UploadTab from '../components/tabs/UploadTab';
import ComputeTab from '../components/tabs/ComputeTab';
import api from '../services/api';

const Dashboard = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('prompt');
  const [prompt, setPrompt] = useState('');
  const [promptVersion, setPromptVersion] = useState('v1');
  const [studentId, setStudentId] = useState('S000');
  const [jsonData, setJsonData] = useState('');
  const [csvFile, setCsvFile] = useState(null);
  const [sqiResult, setSqiResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const showMessage = (text, type = 'info') => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => setMessage(''), 2000);
  };


  useEffect(() => {
    loadLatestPrompt();
  }, []);

  const loadLatestPrompt = async () => {
    try {
      const data = await api.getLatestPrompt();
      setPrompt(data.text);
      setPromptVersion(data.version);
    } catch (err) {
      console.log('No existing prompt found');
    }
  };

  const handleSavePrompt = async () => {
    setLoading(true);
    try {
      await api.savePrompt(prompt, promptVersion);
      showMessage('Prompt saved successfully!', 'success');
    } catch (err) {
      showMessage(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleUploadJSON = async () => {
    if (!jsonData.trim()) {
      showMessage('Please enter JSON data', 'error');
      return;
    }

    setLoading(true);
    try {
      const data = JSON.parse(jsonData);
      await api.uploadJSON(studentId, data.attempts || data);
      showMessage('JSON data uploaded successfully!', 'success');
      setJsonData('');
    } catch (err) {
      showMessage(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleUploadCSV = async () => {
    if (!csvFile) {
      showMessage('Please select a CSV file', 'error');
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', csvFile);
      formData.append('student_id', studentId);
      
      await api.uploadCSV(formData);
      showMessage('CSV uploaded successfully!', 'success');
      setCsvFile(null);
    } catch (err) {
      showMessage(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleComputeSQI = async () => {
    setLoading(true);
    try {
      const result = await api.computeSQI(studentId);
      setSqiResult(result);
      showMessage('SQI computed successfully!', 'success');
    } catch (err) {
      showMessage(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPayload = async () => {
    try {
      const payload = await api.getSummaryPayload(studentId);
      const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `summary_customizer_input_${studentId}.json`;
      a.click();
      URL.revokeObjectURL(url);
      showMessage('Payload downloaded successfully!', 'success');
    } catch (err) {
      showMessage(err.message, 'error');
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    showMessage('Copied to clipboard!', 'success');
  };

  const tabs = [
    { id: 'prompt', name: 'Diagnostic Agent Prompt', icon: FileText },
    { id: 'upload', name: 'Upload Data', icon: Database },
    { id: 'compute', name: 'Compute SQI', icon: Calculator },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} onLogout={onLogout} />
      <MessageAlert message={message} messageType={messageType} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {tab.name}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="space-y-6">
          {activeTab === 'prompt' && (
            <PromptTab
              prompt={prompt}
              setPrompt={setPrompt}
              promptVersion={promptVersion}
              setPromptVersion={setPromptVersion}
              onSavePrompt={handleSavePrompt}
              loading={loading}
            />
          )}

          {activeTab === 'upload' && (
            <UploadTab
              studentId={studentId}
              setStudentId={setStudentId}
              jsonData={jsonData}
              setJsonData={setJsonData}
              csvFile={csvFile}
              setCsvFile={setCsvFile}
              onUploadJSON={handleUploadJSON}
              onUploadCSV={handleUploadCSV}
              loading={loading}
            />
          )}

          {activeTab === 'compute' && (
            <ComputeTab
              studentId={studentId}
              setStudentId={setStudentId}
              sqiResult={sqiResult}
              onComputeSQI={handleComputeSQI}
              onDownloadPayload={handleDownloadPayload}
              onCopyToClipboard={copyToClipboard}
              loading={loading}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;