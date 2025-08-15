import React from "react";
import { Loader2 } from "lucide-react";

const PromptActions = ({ onSavePrompt, onGenerateDiagnostic, loading, genLoading }) => {
  return (
    <div className="flex gap-4">
      {/* Save Prompt */}
      <button
        onClick={onSavePrompt}
        disabled={loading}
        className={`px-4 py-2 rounded-lg text-white font-medium ${
          loading
            ? "bg-blue-300 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading && <Loader2 className="h-4 w-4 mr-2 inline animate-spin" />}
        Save Prompt
      </button>

      {/* Generate Diagnostic */}
      <button
        onClick={onGenerateDiagnostic}
        disabled={genLoading}
        className={`px-4 py-2 rounded-lg font-medium border ${
          genLoading
            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
            : "bg-white text-gray-700 hover:bg-gray-100"
        }`}
      >
        {genLoading && <Loader2 className="h-4 w-4 mr-2 inline animate-spin" />}
        Generate Diagnostic
      </button>
    </div>
  );
};

export default PromptActions;
