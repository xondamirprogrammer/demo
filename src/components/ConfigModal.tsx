import React from 'react';

interface ConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConfigModal: React.FC<ConfigModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-slate-800 rounded-2xl p-8 max-w-sm w-full text-center border border-slate-700 shadow-lg">
        <h3 className="text-2xl font-bold text-amber-400">Agent Not Available</h3>
        <p className="mt-4 text-slate-300">
          This AI assistant is not yet configured. Only the Uzum Market Assistant is currently connected to a live Voiceflow agent.
        </p>
        <button 
          onClick={onClose}
          className="mt-6 w-full text-lg font-semibold rounded-lg bg-slate-600 hover:bg-slate-500 transition-colors duration-300 py-3 px-6"
        >
          Got It
        </button>
      </div>
    </div>
  );
};