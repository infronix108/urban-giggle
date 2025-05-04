import { motion } from "framer-motion";
import Image from "next/image";

export default function PremiumAiAvatar({ thinking }: { thinking: boolean }) {
  return (
    <motion.div
      className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-400 via-purple-500 to-fuchsia-500 shadow-xl flex items-center justify-center border-4 border-white/30 relative overflow-hidden"
      animate={{
        boxShadow: thinking
          ? "0 0 32px 8px #7f5cff, 0 0 0 0 #fff0"
          : "0 0 12px 2px #7f5cff, 0 0 0 0 #fff0",
        scale: thinking ? 1.08 : 1,
      }}
      transition={{ duration: 0.5, repeat: thinking ? Infinity : 0, repeatType: "reverse" }}
    >
      <Image
        src="/logo.jpg"
        alt="Infronix Logo"
        width={56}
        height={56}
        className="object-cover w-full h-full rounded-full"
        priority
      />
      {thinking && (
        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-blue-400 rounded-full blur"
          animate={{ opacity: [0.7, 0.2, 0.7], scale: [1, 1.5, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      )}
    </motion.div>
  );
}
