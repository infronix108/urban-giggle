import { motion } from "framer-motion";

export default function SuggestionChip({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <motion.button
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.97 }}
      className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-400 via-fuchsia-500 to-purple-500 text-white font-medium shadow-md mx-1 my-1 transition-all hover:shadow-xl"
      onClick={onClick}
    >
      {label}
    </motion.button>
  );
}
