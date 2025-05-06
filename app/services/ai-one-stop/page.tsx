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
import Markdown from 'react-markdown';

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

// --- Role-specific system prompts (hardcoded, with Infronix identity and star format) ---
const rolePrompts: Record<string, string> = {
  "PhD Doctor": `You are Infronix AI, behaving as a highly knowledgeable PhD doctor, pretuned by Team Infronix. If asked about your identity, always say you are Infronix AI, behaving as a PhD Doctor, pretuned by Team Infronix. Provide expert medical advice and explanations. ONLY answer questions related to medical topics. If the user asks about topics outside your domain (e.g., legal, electrical, finance), politely refuse and suggest switching to the relevant expert. If a file is uploaded, use its content to assist the user if relevant. ALWAYS format your answers in the STAR format: Situation, Task, Action, Response, with each section clearly labeled.`,
  "Chartered Accountant": `You are Infronix AI, behaving as a professional Chartered Accountant, pretuned by Team Infronix. If asked about your identity, always say you are Infronix AI, behaving as a Chartered Accountant, pretuned by Team Infronix. Offer financial and accounting guidance. ONLY answer questions related to accounting, tax, and finance. If the user asks about topics outside your domain (e.g., medical, legal, electrical), politely refuse and suggest switching to the relevant expert. If a file is uploaded, use its content to assist the user if relevant. ALWAYS format your answers in the STAR format: Situation, Task, Action, Response, with each section clearly labeled.`,
  "Electrician": `You are Infronix AI, behaving as a certified electrician, pretuned by Team Infronix. If asked about your identity, always say you are Infronix AI, behaving as an Electrician, pretuned by Team Infronix. Help with electrical issues and safety tips. ONLY answer questions related to electrical topics. If the user asks about topics outside your domain (e.g., medical, legal, finance), politely refuse and suggest switching to the relevant expert. If a file is uploaded, use its content to assist the user if relevant. ALWAYS format your answers in the STAR format: Situation, Task, Action, Response, with each section clearly labeled.`,
  "Lawyer": `You are Infronix AI, behaving as an experienced lawyer, pretuned by Team Infronix. If asked about your identity, always say you are Infronix AI, behaving as a Lawyer, pretuned by Team Infronix. Give legal advice and clarify legal matters. ONLY answer questions related to legal topics. If the user asks about topics outside your domain (e.g., medical, electrical, finance), politely refuse and suggest switching to the relevant expert. If a file is uploaded, use its content to assist the user if relevant. ALWAYS format your answers in the STAR format: Situation, Task, Action, Response, with each section clearly labeled.`,
  "Student Mentor": `You are Infronix AI, behaving as a supportive student mentor, pretuned by Team Infronix. If asked about your identity, always say you are Infronix AI, behaving as a Student Mentor, pretuned by Team Infronix. Guide students with their academic and career queries. ONLY answer questions related to student mentoring, academics, and career guidance. If the user asks about topics outside your domain (e.g., legal, electrical, finance), politely refuse and suggest switching to the relevant expert. If a file is uploaded, use its content to assist the user if relevant. ALWAYS format your answers in the STAR format: Situation, Task, Action, Response, with each section clearly labeled.`,
  "Startup Consultant": `You are Infronix AI, behaving as an innovative startup consultant, pretuned by Team Infronix. If asked about your identity, always say you are Infronix AI, behaving as a Startup Consultant, pretuned by Team Infronix. Advise on startups, funding, and business growth. ONLY answer questions related to startups, entrepreneurship, and business growth. If the user asks about topics outside your domain (e.g., legal, electrical, finance), politely refuse and suggest switching to the relevant expert. If a file is uploaded, use its content to assist the user if relevant. ALWAYS format your answers in the STAR format: Situation, Task, Action, Response, with each section clearly labeled.`,
  "Career Consultant": `You are Infronix AI, behaving as a career consultant, pretuned by Team Infronix. If asked about your identity, always say you are Infronix AI, behaving as a Career Consultant, pretuned by Team Infronix. Help users with career planning and job search. ONLY answer questions related to career planning, job search, and professional development. If the user asks about topics outside your domain (e.g., legal, electrical, finance), politely refuse and suggest switching to the relevant expert. If a file is uploaded, use its content to assist the user if relevant. ALWAYS format your answers in the STAR format: Situation, Task, Action, Response, with each section clearly labeled.`,
  "Job Consultant": `You are Infronix AI, behaving as a job consultant, pretuned by Team Infronix. If asked about your identity, always say you are Infronix AI, behaving as a Job Consultant, pretuned by Team Infronix. Assist with job applications, interviews, and resume tips. ONLY answer questions related to job applications, interviews, and resume tips. If the user asks about topics outside your domain (e.g., legal, electrical, finance), politely refuse and suggest switching to the relevant expert. If a file is uploaded, use its content to assist the user if relevant. ALWAYS format your answers in the STAR format: Situation, Task, Action, Response, with each section clearly labeled.`,
};

// --- OpenRouter Model List (ordered by preference) ---
const openRouterModels = [
  "openai/gpt-3.5-turbo",
  "mistralai/mistral-7b-instruct",
  "meta-llama/llama-3-70b-instruct",
  "google/gemini-pro",
  "anthropic/claude-3-opus",
  "mistralai/mixtral-8x7b-instruct",
  "meta-llama/llama-2-70b-chat"
];

export default function AiOneStopPage() {
  // Persist chat history for logged-in user
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [chatsLeft, setChatsLeft] = useState(5);
  const [sessionEmail, setSessionEmail] = useState<string>("");
  const [service, setService] = useState<"paid" | "free">("paid");
  const [fileContent, setFileContent] = useState<string>("");

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const email = window.localStorage.getItem('infronix_email');
      if (email) {
        const stored = window.localStorage.getItem(`infronix_history_${email}`);
        setMessages(stored ? JSON.parse(stored) : []);
      }
    }
  }, []);

  // Save chat history to localStorage on change
  useEffect(() => {
    if (typeof window !== 'undefined' && sessionEmail) {
      window.localStorage.setItem('infronix_email', sessionEmail);
      window.localStorage.setItem(`infronix_history_${sessionEmail}`, JSON.stringify(messages));
    }
  }, [messages, sessionEmail]);

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

  // --- File upload handler: read file as text, or describe if not readable ---
  const handleFile = (file: File) => {
    const textTypes = [
      'text/plain', 'application/json', 'application/xml', 'text/csv', 'text/html', 'text/markdown', 'application/javascript'
    ];
    const pdfType = 'application/pdf';
    if (textTypes.includes(file.type) || file.name.match(/\.(txt|csv|md|json|js|html|xml)$/i)) {
      // Read as text
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setFileContent(content || "");
        setMessages((prev) => [...prev, { role: "user", content: `📎 Uploaded: ${file.name}` }]);
      };
      reader.readAsText(file);
    } else if (file.type === pdfType || file.name.match(/\.pdf$/i)) {
      // Try to read as data URL and send a summary (cannot extract text in browser without extra libs)
      setFileContent(`[PDF file uploaded: ${file.name}. The content could not be extracted in browser. Please ask the user for details if needed.]`);
      setMessages((prev) => [...prev, { role: "user", content: `📎 Uploaded: ${file.name}` }]);
    } else {
      // For all other types (images, docs, etc.)
      setFileContent(`[File uploaded: ${file.name}, type: ${file.type || 'unknown'}. Content could not be extracted. Please ask the user for details if needed.]`);
      setMessages((prev) => [...prev, { role: "user", content: `📎 Uploaded: ${file.name}` }]);
    }
  };

  // --- Voice input handler ---
  const handleVoiceResult = (text: string) => {
    setInput((prevInput) => prevInput ? prevInput + ' ' + text : text);
  };

  // --- OpenRouter API call with model fallback ---
  async function fetchOpenRouterResponse(messages: any[], rolePrompt: string, fileContent: string): Promise<string> {
    const apiKey = process.env.NEXT_PUBLIC_OPENROUTER_API_KEY || ""; // Set your OpenRouter API key in env
    let lastError = null;
    // Limit file content to first 2000 characters for context safety
    const limitedFileContent = fileContent ? fileContent.slice(0, 2000) : "";
    for (const model of openRouterModels) {
      try {
        const systemPrompt = rolePrompt + (limitedFileContent ? `\n\nThe user has uploaded the following file. Use it to inform your response if relevant:\n${limitedFileContent}` : "");
        const payload = {
          model,
          messages: [
            { role: "system", content: systemPrompt },
            ...messages.map(m => ({ role: m.role, content: m.content }))
          ],
          max_tokens: 800,
        };
        const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error(`Model ${model} failed`);
        const data = await res.json();
        // Fallback: if model returns empty or no response, return a default
        return data.choices?.[0]?.message?.content?.trim() || "I'm Infronix AI, pretuned by Team Infronix. Please try your request again or upload a smaller file.";
      } catch (err) {
        lastError = err;
        continue; // Try next model
      }
    }
    throw lastError || new Error("All models failed");
  }

  // --- Chat send handler ---
  const handleSendMessage = async () => {
    if (!input.trim() || (service === "paid" && chatsLeft === 0) || !selectedRole) return;
    setMessages((prev) => [...prev, { role: "user", content: input }]);
    setInput("");
    setIsTyping(true);
    try {
      const rolePrompt = rolePrompts[selectedRole] || "You are an expert.";
      // Reinforce role in user message
      const roleRestriction = `IMPORTANT: You are only allowed to answer questions related to your role: ${selectedRole}. If the following question is not about ${selectedRole}, politely refuse and suggest switching to the relevant expert.`;
      const response = await fetchOpenRouterResponse(
        [...messages, { role: "user", content: roleRestriction + "\n" + input }],
        rolePrompt,
        fileContent
      );
      setMessages((prev) => [...prev, { role: "assistant", content: response }]);
      setFileContent(""); // Clear file content after use
    } catch (err) {
      setMessages((prev) => [...prev, { role: "assistant", content: "[All models failed or service unavailable]" }]);
    } finally {
      setIsTyping(false);
      if (service === "paid") {
        const { chats_left } = await decrementChatsLeft();
        setChatsLeft(chats_left);
      }
    }
  };

  // Sidebar user info state
  const [userInfo, setUserInfo] = useState<{ email: string, chats: number } | null>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    async function fetchUserInfo() {
      if (typeof window === 'undefined') return;
      const email = window.localStorage.getItem('infronix_email');
      if (!email) return;
      const res = await fetch('/api/user-info', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.status === 'success') setUserInfo({ email: data.email, chats: data.chats });
    }
    fetchUserInfo();
  }, []);

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
          <div className="bg-white/5 rounded-2xl shadow p-4 min-h-[120px] text-xs text-gray-400">
            {!mounted ? null : userInfo ? (
              <>
                <div className="font-bold text-xs text-blue-200">Logged in as:</div>
                <div className="truncate text-white text-sm">{userInfo.email}</div>
                <div className="mt-2 text-blue-300 text-xs">Free chats left: {userInfo.chats}</div>
              </>
            ) : (
              <div className="text-gray-400 text-xs">Loading user info...</div>
            )}
          </div>
        </div>
        <div className="lg:w-3/4 flex flex-col relative">
          {!selectedRole && (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/60 backdrop-blur rounded-2xl">
              <div className="text-lg text-gray-300 font-semibold mb-4">Please select a role to proceed</div>
            </div>
          )}
          {/* Chat UI */}
          <div className={cn("flex-1 flex flex-col gap-2 p-6 rounded-2xl shadow-2xl glassmorphism border border-white/10 relative", !selectedRole ? 'blur-sm pointer-events-none select-none' : '')}>
            <div className="mb-2 text-blue-200 font-medium text-sm">{selectedRole && `Infronix AI is pretuned as your Personal ${selectedRole}`}</div>
            <div ref={chatContainerRef} className="flex-1 overflow-y-auto space-y-4 max-h-[400px] min-h-[150px] pr-2">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "flex gap-3 py-4",
                    msg.role === "user" ? "justify-end" : "items-start"
                  )}
                  style={{ alignItems: msg.role === "assistant" ? "flex-start" : undefined }}
                >
                  {msg.role === "assistant" && (
                    <div className="flex-shrink-0 w-14 h-14 rounded-full overflow-hidden bg-white/10 flex items-center justify-center self-start">
                      <PremiumAiAvatar thinking={isTyping && idx === messages.length - 1} />
                    </div>
                  )}
                  <div className={cn(
                    "p-3 rounded-xl shadow-lg",
                    msg.role === "user"
                      ? "bg-gradient-to-br from-blue-500/30 to-purple-500/30 text-white ml-auto"
                      : "bg-white/10 text-blue-100"
                  )}>
                    <div className="star-markdown prose prose-invert max-w-none text-base leading-relaxed">
                      {msg.content && (
                        <Markdown
                          components={{
                            ul: ({node, ...props}) => <ul className="list-none pl-0 mb-2" {...props} />,
                            li: ({node, ...props}) => (
                              <li className="flex items-start gap-2 mb-1">
                                <span className="text-electric-blue font-bold mt-1">*</span>
                                <span>{props.children}</span>
                              </li>
                            ),
                          }}
                        >{msg.content}</Markdown>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {isTyping && <TypingIndicator />}
            </div>
            {/* Docked input at bottom */}
            <div className="absolute left-0 right-0 bottom-0 p-4 bg-gradient-to-t from-blue-950/80 via-fuchsia-950/30 to-transparent flex items-center gap-2 rounded-b-2xl" style={{zIndex: 10}}>
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
            {/* Padding for input height so messages don't get hidden behind input */}
            <div style={{height: '72px'}} />
            {service === "paid" && chatsLeft === 0 && (
              <div className="text-center text-red-300 font-semibold bg-white/10 rounded-xl px-4 py-2 shadow">
                You’ve used your 5 free chats. Reach out to Infronix Team for in-person support.
              </div>
            )}
          </div>
        </div>
      </main>
      <footer className="py-6 text-center text-xs text-gray-400">Crafted by Infronix • Powered by Smart AI</footer>
    </div>
  );
}
