import { motion } from "framer-motion";

export default function RoleCard({ label, emoji, selected, onClick }: { label: string; emoji: string; selected: boolean; onClick: () => void }) {
  return (
    <motion.button
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.97 }}
      className={`flex flex-col items-center justify-center p-4 rounded-2xl shadow-lg border-2 transition-all duration-200 cursor-pointer min-w-[90px] min-h-[90px] text-lg font-semibold ${selected ? 'bg-gradient-to-br from-blue-500 via-fuchsia-500 to-purple-600 text-white border-blue-400 shadow-2xl' : 'bg-white/10 text-blue-900 border-transparent'} mx-2`}
      onClick={onClick}
    >
      <span className="text-3xl mb-2">{emoji}</span>
      {label}
    </motion.button>
  );
}
