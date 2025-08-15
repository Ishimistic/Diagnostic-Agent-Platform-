import React, { useState } from "react";
import api from "../../services/api";
import PromptEditor from "./PromptEditor";
import PromptActions from "./PromptActions";
import DiagnosticPreview from "./DiagnosticPreview";

const PromptTab = ({
  prompt,
  setPrompt,
  promptVersion,
  setPromptVersion,
  onSavePrompt,
  loading,
}) => {
  const [diagnostic, setDiagnostic] = useState(null);
  const [genLoading, setGenLoading] = useState(false);

  const handleGenerateDiagnostic = async () => {
    setGenLoading(true);
    try {
      const result = await api.generateDiagnostic(prompt);
      setDiagnostic(result.questions || result);
    } catch (err) {
      alert(err.message);
    } finally {
      setGenLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow-md rounded-xl p-4 space-y-4">
        <PromptEditor
          prompt={prompt}
          setPrompt={setPrompt}
          // promptVersion={promptVersion}
          // setPromptVersion={setPromptVersion}
        />

        <PromptActions
          onSavePrompt={onSavePrompt}
          onGenerateDiagnostic={handleGenerateDiagnostic}
          loading={loading}
          genLoading={genLoading}
        />
      </div>

      <DiagnosticPreview diagnostic={diagnostic} />
    </div>
  );
};

export default PromptTab;
