import React from 'react';

interface AIAssistantCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  buttonColor: string;
  onTest: () => void;
}

export const AIAssistantCard: React.FC<AIAssistantCardProps> = ({
  icon,
  title,
  description,
  buttonColor,
  onTest
}) => {
  return (
    <div className="card-hover-effect bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 text-left flex flex-col">
      <div className="flex-shrink-0">
        <div className={`w-14 h-14 rounded-lg ${buttonColor}/10 flex items-center justify-center border ${buttonColor}/20`}>
          {icon}
        </div>
      </div>
      <div className="mt-6 flex-grow">
        <h3 className="text-2xl font-bold text-slate-100">{title}</h3>
        <p className="mt-2 text-slate-400">{description}</p>
      </div>
      <div className="mt-6">
        <button 
          onClick={onTest}
          className={`w-full text-lg font-semibold rounded-lg ${buttonColor.replace('bg-', 'bg-').replace('/10', '-600')} hover:${buttonColor.replace('bg-', 'bg-').replace('/10', '-500')} transition-colors duration-300 py-3 px-6`}
        >
          Test
        </button>
      </div>
    </div>
  );
};