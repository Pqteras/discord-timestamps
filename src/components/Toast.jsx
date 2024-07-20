import { useEffect } from "react";
import { motion } from "framer-motion";

const Toast = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-x-0 bottom-4 mx-auto w-[200px] p-4 bg-green-500 text-black text-center rounded-lg shadow-lg"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ type: "spring", stiffness: 100, damping: 10 }}
    >
      {message}
    </motion.div>
  );
};

export default Toast;
