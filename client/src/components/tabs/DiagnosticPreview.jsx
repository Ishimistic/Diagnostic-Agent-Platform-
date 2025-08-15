import React from "react";

const DiagnosticPreview = ({ diagnostic }) => {
  if (!diagnostic) return null;

  return (
    <div className="bg-white shadow-md rounded-xl p-4">
      <h3 className="text-sm font-semibold mb-2">Generated Diagnostic</h3>
      <pre className="bg-gray-100 text-xs p-3 rounded-md overflow-x-auto max-h-96">
        {JSON.stringify(diagnostic, null, 2)}
      </pre>
    </div>
  );
};

export default DiagnosticPreview;
