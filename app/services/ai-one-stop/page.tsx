"use client"

import { useState, useEffect, useRef } from "react"
import PremiumAiAvatar from "@/app/components/PremiumAiAvatar";
import TypingIndicator from "@/app/components/TypingIndicator";
import PremiumBadge from "@/app/components/PremiumBadge";
import SuggestionChip from "@/app/components/SuggestionChip";
import PremiumRoleDropdown from "@/app/components/PremiumRoleDropdown";
import VoiceInputButton from "@/app/components/VoiceInputButton";
import FileUploadButton from "@/app/components/FileUploadButton";
import Image from "next/image";
import { cn } from "@/lib/utils";

// Mock API for session and chat count
async function fetchSessionAndChatsLeft() {
  // Replace with actual API call
  return { email: "user@infronix.com", chats_left: 5 };
}
async function decrementChatsLeft() {
  // Replace with actual API call
  return { chats_left: Math.max(0, Math.floor(Math.random() * 5)) };
}

// Role sets for each service
const paidRoles = [
  { label: "PhD Doctor", emoji: "🧑‍🔬" },
  { label: "Chartered Accountant", emoji: "💼" },
  { label: "Electrician", emoji: "🔌" },
  { label: "Lawyer", emoji: "⚖️" },
  { label: "Student Mentor", emoji: "🎓" },
  { label: "Startup Consultant", emoji: "🚀" },
];
const freeRoles = [
  { label: "Career Consultant", emoji: "🧭" },
  { label: "Job Consultant", emoji: "🧑‍💻" },
];

export default function AiOneStopPage() {
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [chatsLeft, setChatsLeft] = useState(5);
  const [sessionEmail, setSessionEmail] = useState<string>("");
  const [service, setService] = useState<"paid" | "free">("paid");

  // Dynamically choose roles based on service
  const roles = service === "paid" ? paidRoles : freeRoles;

  useEffect(() => {
    // Reset role/messages and chat count on service switch
    setSelectedRole("");
    setMessages([]);
    if (service === "paid") {
      fetchSessionAndChatsLeft().then(({ chats_left }) => setChatsLeft(chats_left));
    } else {
      setChatsLeft(Infinity); // unlimited
    }
  }, [service]);

  useEffect(() => {
    if (service === "paid") {
      fetchSessionAndChatsLeft().then(({ email, chats_left }) => {
        setSessionEmail(email);
        setChatsLeft(chats_left);
      });
    } else {
      setSessionEmail("");
      setChatsLeft(Infinity);
    }
  }, []);

  // Chat scroll ref
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom on new message
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Handle file upload (demo: just show file name as message)
  const handleFile = (file: File) => {
    setMessages((prev) => [...prev, { role: "user", content: `📎 Uploaded: ${file.name}` }]);
  };

  // Voice input handler
  const handleVoiceResult = (text: string) => {
    setInput(text);
  };

  const handleSendMessage = async () => {
    if (!input.trim() || (service === "paid" && chatsLeft === 0)) return;
    setMessages((prev) => [...prev, { role: "user", content: input }]);
    setInput("");
    setIsTyping(true);
    setTimeout(async () => {
      setMessages((prev) => [...prev, { role: "assistant", content: `AI response to: ${input}` }]);
      setIsTyping(false);
      if (service === "paid") {
        const { chats_left } = await decrementChatsLeft();
        setChatsLeft(chats_left);
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-950 via-fuchsia-950/60 to-purple-950/90">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-lg shadow-2xl border-b border-white/10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <PremiumAiAvatar thinking={isTyping} />
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white">Infronix AI</h1>
              <div className="text-sm text-blue-200 font-medium">Your intelligent expert, tailored to your needs</div>
            </div>
            <PremiumBadge />
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full shadow border border-white/10">
              <span className={service === "paid" ? "text-blue-400 font-bold" : "text-gray-300"}>
                Paid Service
              </span>
              <label className="relative inline-flex items-center cursor-pointer mx-2">
                <input type="checkbox" checked={service === "free"} onChange={() => setService(service === "paid" ? "free" : "paid")}
                  className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:bg-gradient-to-r peer-checked:from-blue-500 peer-checked:to-purple-500 transition-all"></div>
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow transform peer-checked:translate-x-5 transition-all" />
              </label>
              <span className={service === "free" ? "text-blue-400 font-bold" : "text-gray-300"}>
                Free Service
              </span>
            </div>
            <div className="ml-4 px-4 py-1 rounded-full bg-white/10 text-green-400 font-semibold shadow border border-white/10 text-sm flex items-center gap-2">
              <span className="text-lg">🟢</span> {service === "paid" ? `${chatsLeft} Free Chats Left` : "Unlimited Chats"}
            </div>
          </div>
        </div>
      </header>

      {/* Role Selector with overlay logic */}
      <main className="flex-1 flex flex-col lg:flex-row container mx-auto px-4 py-12 gap-6 relative">
        <div className="lg:w-1/4 flex flex-col gap-8">
          <div className="bg-white/10 rounded-2xl shadow-xl p-6 mb-8">
            <label htmlFor="role" className="block text-sm font-semibold text-blue-200 mb-2">Select Your Role to Start</label>
            <PremiumRoleDropdown
              value={selectedRole}
              onChange={setSelectedRole}
              roles={roles}
            />
            {!selectedRole && (
              <div className="mt-4 text-xs text-gray-400">Please select a role to proceed</div>
            )}
          </div>
          {/* Optional: Recent chat history mock */}
          <div className="bg-white/5 rounded-2xl shadow p-4 min-h-[120px] text-xs text-gray-400">No recent chats</div>
        </div>
        <div className="lg:w-3/4 flex flex-col relative">
          {!selectedRole && (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/60 backdrop-blur rounded-2xl">
              <div className="text-lg text-gray-300 font-semibold mb-4">Please select a role to proceed</div>
            </div>
          )}
          {/* Chat UI */}
          <div className={cn("flex-1 flex flex-col gap-2 p-6 rounded-2xl shadow-2xl glassmorphism border border-white/10", !selectedRole ? 'blur-sm pointer-events-none select-none' : '')}>
            <div className="mb-2 text-blue-200 font-medium text-sm">{selectedRole && `Infronix AI is pretuned as your Personal ${selectedRole}`}</div>
            <div ref={chatContainerRef} className="flex-1 overflow-y-auto space-y-4 max-h-[400px] min-h-[150px] pr-2">
              {messages.map((msg, idx) => (
                <div key={idx} className={cn(
                  "flex gap-3 items-start",
                  msg.role === "user" ? "justify-end" : ""
                )}>
                  {msg.role === "assistant" && (
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-white/10 flex items-center justify-center">
                      <Image src="/logo.jpg" alt="Infronix Logo" width={40} height={40} className="object-cover w-full h-full rounded-full" />
                    </div>
                  )}
                  <div className={cn(
                    "p-3 rounded-xl shadow-lg",
                    msg.role === "user"
                      ? "bg-gradient-to-br from-blue-500/30 to-purple-500/30 text-white ml-auto"
                      : "bg-white/10 text-blue-100"
                  )}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isTyping && <TypingIndicator />}
            </div>
            <div className="mt-4 flex items-center gap-2">
              <VoiceInputButton onResult={handleVoiceResult} />
              <FileUploadButton onFile={handleFile} />
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleSendMessage()}
                placeholder={service === "paid" && chatsLeft === 0 ? "No chats left" : "Type your message..."}
                disabled={!selectedRole || (service === "paid" && chatsLeft === 0)}
                className={cn(
                  "flex-1 px-4 py-3 rounded-xl bg-white/10 text-white border-2 focus:outline-none transition-all",
                  service === "paid" && chatsLeft === 0 ? "opacity-60 cursor-not-allowed" : "border-blue-500 focus:ring-2 focus:ring-blue-400 glow-input"
                )}
              />
              <button
                onClick={handleSendMessage}
                disabled={!selectedRole || (service === "paid" && chatsLeft === 0) || !input.trim()}
                className={cn(
                  "px-6 py-3 rounded-xl font-bold text-white shadow-lg transition-all",
                  (service === "paid" && chatsLeft === 0) || !selectedRole || !input.trim()
                    ? "bg-gray-600/40 opacity-60 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-500 via-fuchsia-500 to-purple-500 hover:scale-105 glow-btn"
                )}
              >Send</button>
            </div>
            {service === "paid" && chatsLeft === 0 && (
              <div className="mt-4 text-center text-red-300 font-semibold bg-white/10 rounded-xl px-4 py-2 shadow">
                You’ve used your 5 free chats. Upgrade to continue.
              </div>
            )}
          </div>
        </div>
      </main>
      <footer className="py-6 text-center text-xs text-gray-400">Crafted by Infronix • Powered by Smart AI</footer>
    </div>
  );
}
