import React from 'react';

declare global {
  interface Window {
    voiceflow: {
      chat: {
        load: (config: any) => Promise<void>;
        open: () => void;
        hide: () => void;
      };
    };
  }
}

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
  const handleButtonClick = () => {
    if (title === "my.gov.uz Guide") {
      // Redirect to the my.gov.uz integration URL
      window.open("https://integrate-my-gov-uz-urfr.bolt.host", "_blank");
    } else if (title === "Uzum Market Assistant") {
      // Only trigger Voiceflow for Uzum Market Assistant
      // Load Voiceflow script if not already loaded
      if (!window.voiceflow) {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://cdn.voiceflow.com/widget-next/bundle.mjs';
        
        script.onload = () => {
          window.voiceflow.chat.load({
            verify: { projectID: '68bd062130b7a96c20248343' },
            url: 'https://general-runtime.voiceflow.com',
            versionID: 'production',
            voice: {
              url: "https://runtime-api.voiceflow.com"
            }
          }).then(() => {
            console.log('Voiceflow agent loaded successfully');
            window.voiceflow.chat.open();
          }).catch((error) => {
            console.error('Failed to load Voiceflow agent:', error);
          });
        };
        
        script.onerror = () => {
          console.error('Failed to load Voiceflow script');
        };
        
        document.head.appendChild(script);
      } else {
        // Voiceflow already loaded, just open the chat
        window.voiceflow.chat.open();
      }
    } else {
      // For other assistants, use the original onTest function
      onTest();
    }
  };

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
          onClick={handleButtonClick}
          className={`w-full text-lg font-semibold rounded-lg ${buttonColor.replace('bg-', 'bg-').replace('/10', '-600')} hover:${buttonColor.replace('bg-', 'bg-').replace('/10', '-500')} transition-colors duration-300 py-3 px-6`}
        >
          Test
        </button>
      </div>
    </div>
  );
};