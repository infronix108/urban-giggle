import { useRef } from "react";

export default function VoiceInputButton({ onResult }: { onResult: (text: string) => void }) {
  const recognitionRef = useRef<any>(null);

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
    recognitionRef.current.onresult = (event: any) => {
      const text = event.results[0][0].transcript;
      onResult(text);
    };
    recognitionRef.current.start();
  };

  return (
    <button
      type="button"
      onClick={handleVoice}
      className="p-2 rounded-full bg-gradient-to-br from-blue-500 via-fuchsia-500 to-purple-500 shadow-lg hover:scale-110 transition-transform text-white"
      title="Voice Input"
      aria-label="Voice Input"
    >
      <span role="img" aria-label="mic">🎤</span>
    </button>
  );
}
