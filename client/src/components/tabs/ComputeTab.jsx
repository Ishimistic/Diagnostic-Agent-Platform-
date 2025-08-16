import React from 'react';
import { Calculator, Download, Copy } from 'lucide-react';

const ComputeTab = ({ 
  studentId, 
  setStudentId, 
  sqiResult, 
  onComputeSQI, 
  onDownloadPayload, 
  onCopyToClipboard, 
  loading 
}) => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="mb-4">
          <h2 className="text-lg font-medium text-gray-900 mb-2">Compute Student Quality Index</h2>
          <p className="text-sm text-gray-600">Calculate SQI and generate payload for Summary Customizer Agent</p>
        </div>

        {/* Student ID */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Student ID</label>
            <input
              type="text"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              className="w-40 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="S001"
            />
          </div>

          <div className="flex gap-4">
           {/* Computing SQI button*/}
            <button
              onClick={onComputeSQI}
              disabled={loading || !studentId}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
              <Calculator className="h-4 w-4" />
              {loading ? 'Computing...' : 'Compute SQI'}
            </button>

            {sqiResult && (
              // Download JSON Button
              <button
                onClick={onDownloadPayload}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Download JSON
              </button>
            )}
          </div>
        </div>
      </div>

      {/* SQI Results */}
      {sqiResult && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="mb-4 flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">SQI Results</h3>
            {/* Copy JSON button */}
            <button
              onClick={() => onCopyToClipboard(JSON.stringify(sqiResult, null, 2))}
              className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm"
            >
              <Copy className="h-4 w-4" />
              Copy JSON
            </button>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="text-sm text-blue-600 font-medium">Student ID</div>
                <div className="text-2xl font-bold text-blue-900">{sqiResult.student_id}</div>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <div className="text-sm text-green-600 font-medium">Overall SQI</div>
                <div className="text-2xl font-bold text-green-900">{sqiResult.overall_sqi}%</div>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <div className="text-sm text-purple-600 font-medium">Concepts</div>
                <div className="text-2xl font-bold text-purple-900">{sqiResult.concept_scores?.length || 0}</div>
              </div>
            </div>

            {sqiResult.ranked_concepts_for_summary && sqiResult.ranked_concepts_for_summary.length > 0 && (
              <div>
                <h4 className="text-md font-medium text-gray-900 mb-3">Top Ranked Concepts for Summary</h4>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Topic</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Concept</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Weight</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reasons</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {sqiResult.ranked_concepts_for_summary.slice(0, 5).map((concept, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{concept.topic}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{concept.concept}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{concept.weight}</td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {concept.reasons?.join(', ') || 'N/A'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ComputeTab;