import { motion } from "framer-motion";

export default function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 mt-2">
      <span className="text-blue-400 font-medium">AI is thinking</span>
      <motion.span
        className="inline-block w-2 h-2 rounded-full bg-blue-400"
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 0.7, repeat: Infinity }}
      />
      <motion.span
        className="inline-block w-2 h-2 rounded-full bg-blue-400"
        animate={{ y: [0, -2, 0] }}
        transition={{ duration: 0.7, repeat: Infinity, delay: 0.2 }}
      />
      <motion.span
        className="inline-block w-2 h-2 rounded-full bg-blue-400"
        animate={{ y: [0, -1, 0] }}
        transition={{ duration: 0.7, repeat: Infinity, delay: 0.4 }}
      />
    </div>
  );
}
