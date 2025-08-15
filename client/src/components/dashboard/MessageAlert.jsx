import React from 'react';
import { Check, X, AlertCircle } from 'lucide-react';

const MessageAlert = ({ message, messageType }) => {
  if (!message) return null;

  const getIcon = () => {
    switch (messageType) {
      case 'success':
        return <Check className="h-4 w-4" />;
      case 'error':
        return <X className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getStyles = () => {
    switch (messageType) {
      case 'success':
        return 'bg-green-50 border border-green-200 text-green-700';
      case 'error':
        return 'bg-red-50 border border-red-200 text-red-700';
      default:
        return 'bg-blue-50 border border-blue-200 text-blue-700';
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-4">
      <div className={`rounded-lg p-4 flex items-center gap-2 ${getStyles()}`}>
        {getIcon()}
        <span className="text-sm">{message}</span>
      </div>
    </div>
  );
};

export default MessageAlert;