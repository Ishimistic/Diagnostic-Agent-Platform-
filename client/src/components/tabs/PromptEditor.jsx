import React from "react";

const PromptEditor = ({ prompt, setPrompt }) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Diagnostic Agent Prompt
        </label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={6}
          className="mt-1 block w-full border rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="Enter diagnostic generation prompt here..."
        />
      </div>

      {/* Version Input */}
      {/* <div>
        <label className="block text-sm font-medium text-gray-700">
          Version
        </label>
        <input
          type="text"
          value={promptVersion}
          onChange={(e) => setPromptVersion(e.target.value)}
          className="mt-1 block w-40 border rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div> */}
    </div>
  );
};

export default PromptEditor;
