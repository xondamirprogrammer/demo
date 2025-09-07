import React, { useState } from 'react';
import { ShoppingCart, Building, GraduationCap } from 'lucide-react';
import { AIAssistantCard } from './components/AIAssistantCard';
import { ConfigModal } from './components/ConfigModal';
import { useVoiceflow } from './hooks/useVoiceflow';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const {
    launchUzumAgent,
    launchMyGovAgent,
    launchLearningAgent
  } = useVoiceflow(() => setIsModalOpen(true));

  const assistants = [
    {
      icon: <ShoppingCart className="w-8 h-8 text-blue-400" strokeWidth={2} />,
      title: "Uzum Market Assistant",
      description: "Find products, track your orders, and get help with deliveries on Uzbekistan's favorite marketplace.",
      buttonColor: "bg-blue-500",
      onTest: launchUzumAgent
    },
    {
      icon: <Building className="w-8 h-8 text-green-400" strokeWidth={2} />,
      title: "my.gov.uz Guide",
      description: "Navigate public services with ease. Get help with applications, find information, and understand procedures.",
      buttonColor: "bg-green-500",
      onTest: launchMyGovAgent
    },
    {
      icon: <GraduationCap className="w-8 h-8 text-purple-400" strokeWidth={2} />,
      title: "Learning Center Assistant",
      description: "Explore courses, get help with enrollment, and find answers to all your questions about our programs.",
      buttonColor: "bg-purple-500",
      onTest: launchLearningAgent
    }
  ];

  return (
    <div className="radial-gradient-background text-white">
      {/* Hero Section */}
      <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto text-center">
          {/* Header Text */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-200 to-slate-400">
            AI Agent demos
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg sm:text-xl text-slate-400">
            Test our AI-powered assistants for Uzbekistan's top services. Click any assistant to start a conversation instantly.
          </p>

          {/* AI Agent Cards Container */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-10">
            {assistants.map((assistant, index) => (
              <AIAssistantCard
                key={index}
                icon={assistant.icon}
                title={assistant.title}
                description={assistant.description}
                buttonColor={assistant.buttonColor}
                onTest={assistant.onTest}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Configuration Modal */}
      <ConfigModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}

export default App;