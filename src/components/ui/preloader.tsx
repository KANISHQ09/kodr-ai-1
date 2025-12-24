import { motion } from "framer-motion";

export default function Preloader() {
  return (
    <div className="fixed inset-0 bg-background z-[100] flex items-center justify-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full"
      />
    </div>
  );
}