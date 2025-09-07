import { useCallback, useEffect, useState } from 'react';

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

export const useVoiceflow = (onConfigError: () => void) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Load Voiceflow script
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://cdn.voiceflow.com/widget-next/bundle.mjs';
    
    script.onload = () => {
      // Initialize Voiceflow with your agent configuration
      window.voiceflow.chat.load({
        verify: { projectID: '68bd062130b7a96c20248343' },
        url: 'https://general-runtime.voiceflow.com',
        versionID: 'production',
        voice: {
          url: "https://runtime-api.voiceflow.com"
        }
      }).then(() => {
        setIsLoaded(true);
        console.log('Voiceflow agent loaded successfully');
      }).catch((error) => {
        console.error('Failed to load Voiceflow agent:', error);
        onConfigError();
      });
    };

    script.onerror = () => {
      console.error('Failed to load Voiceflow script');
      onConfigError();
    };

    document.head.appendChild(script);

    return () => {
      // Cleanup script on unmount
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, [onConfigError]);

  const launchUzumAgent = useCallback(() => {
    console.log('Uzum Market button clicked, isLoaded:', isLoaded);
    
    console.log('Button clicked, isLoaded:', isLoaded);
    
    if (!isLoaded) {
      console.error("Voiceflow agent is not loaded yet, showing config error");
      onConfigError();
      return;
    }

    if (!window.voiceflow || !window.voiceflow.chat) {
      console.error("Voiceflow chat widget is not available, showing config error");
      onConfigError();
      return;
    }

    try {
      console.log('Opening Voiceflow chat widget...');
      window.voiceflow.chat.open();
    } catch (error) {
      console.error("Error opening Voiceflow chat widget:", error);
      onConfigError();
    }
  }, [isLoaded, onConfigError]);

  const launchMyGovAgent = useCallback(() => {
    onConfigError();
  }, [onConfigError]);

  const launchLearningAgent = useCallback(() => {
    onConfigError();
  }, [onConfigError]);

  return {
    launchUzumAgent,
    launchMyGovAgent,
    launchLearningAgent,
    isLoaded
  };
};