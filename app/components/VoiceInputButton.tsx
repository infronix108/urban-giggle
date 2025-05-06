import { useRef, useState } from "react";

export default function VoiceInputButton({ onResult }: { onResult: (text: string) => void }) {
  const recognitionRef = useRef<any>(null);
  const [isRecording, setIsRecording] = useState(false);

  const handleVoice = () => {
    // @ts-ignore
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice recognition not supported in this browser.");
      return;
    }
    if (!recognitionRef.current) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.lang = "en-US";
      recognitionRef.current.interimResults = false;
      recognitionRef.current.maxAlternatives = 1;
    }
    // Prevent double start
    if (recognitionRef.current._isStarted) return;

    recognitionRef.current.onstart = () => {
      setIsRecording(true);
      recognitionRef.current._isStarted = true;
    };
    recognitionRef.current.onend = () => {
      setIsRecording(false);
      recognitionRef.current._isStarted = false;
    };
    recognitionRef.current.onerror = () => {
      setIsRecording(false);
      recognitionRef.current._isStarted = false;
    };
    recognitionRef.current.onresult = (event: any) => {
      const text = event.results[0][0].transcript;
      onResult(text);
      recognitionRef.current.stop();
    };
    recognitionRef.current.start();
  };

  return (
    <button
      type="button"
      onClick={handleVoice}
      className={`relative p-2 rounded-full bg-gradient-to-br from-blue-500 via-fuchsia-500 to-purple-500 shadow-lg hover:scale-110 transition-transform text-white focus:outline-none ${isRecording ? 'ring-4 ring-fuchsia-400/60 animate-pulse' : ''}`}
      title="Voice Input"
      aria-label="Voice Input"
    >
      <span role="img" aria-label="mic">🎤</span>
      {isRecording && (
        <span className="absolute -right-2 -top-2 w-3 h-3 rounded-full bg-red-500 animate-pulse border-2 border-white" />
      )}
    </button>
  );
}
