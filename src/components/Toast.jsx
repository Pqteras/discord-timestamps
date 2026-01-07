import { useEffect } from "react";
import { motion } from "motion/react";
import { FaCheckCircle } from "react-icons/fa";

const Toast = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-x-0 bottom-8 z-100 mx-auto w-fit max-w-sm px-6 py-3 bg-white/10 backdrop-blur-xl border border-white/20 text-white rounded-full shadow-2xl flex items-center gap-3"
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <FaCheckCircle className="text-green-400 text-xl" />
      <span className="font-medium text-sm sm:text-base">{message}</span>
    </motion.div>
  );
};

export default Toast;
