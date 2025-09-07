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
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://cdn.voiceflow.com/widget-next/bundle.mjs';
    
    script.onload = () => {
      window.voiceflow.chat.load({
        verify: { projectID: '6685959199292a00072b2d69' },
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
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, [onConfigError]);

  const launchUzumAgent = useCallback(() => {
    if (!isLoaded) {
      console.error("Voiceflow agent is not loaded yet");
      onConfigError();
      return;
    }

    if (!window.voiceflow || !window.voiceflow.chat) {
      console.error("Voiceflow chat widget is not available");
      onConfigError();
      return;
    }

    try {
      window.voiceflow.chat.open();
    } catch (error) {
      console.error("Error opening Voiceflow chat:", error);
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