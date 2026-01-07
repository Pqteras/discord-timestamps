import { useState } from "react";
import { formatDiscordTimestamp } from "../utils/converters";
import { motion, AnimatePresence } from "motion/react";
import { LuCopy, LuCheck } from "react-icons/lu";
import Toast from "./Toast";

function DisplayOutput({ timestamp }) {
  const formattedTimestamp = timestamp ? formatDiscordTimestamp(timestamp) : "";
  const [isToastVisible, setToastVisible] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(timestamp).then(
      () => {
        setToastVisible(true);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      },
      (err) => {
        console.error("Could not copy text: ", err);
      }
    );
  };

  const handleClose = () => setToastVisible(false);

  return (
    <div className="w-full mt-4 min-h-35 flex items-center justify-center">
      <AnimatePresence mode="wait">
        {formattedTimestamp ? (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="w-full p-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl flex flex-col items-center gap-4 shadow-xl"
          >
            <div className="text-center w-full">
              <span className="text-sm text-white/50 uppercase tracking-widest font-semibold mb-2 block">
                Preview
              </span>
              <motion.h3
                key={formattedTimestamp}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xl sm:text-2xl font-bold text-white bg-black/20 py-3 px-6 rounded-lg inline-block border border-white/5"
              >
                {formattedTimestamp}
              </motion.h3>
            </div>

            <div className="w-full flex items-center gap-2 bg-[#1e1e1e] p-1.5 pr-2 rounded-xl border border-white/10 shadow-inner group transition-colors hover:border-white/20">
              <div className="flex-1 px-3 py-2 font-mono text-sm sm:text-base text-gray-300 truncate selection:bg-purple-500/30">
                {timestamp}
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={copyToClipboard}
                className={`p-2.5 rounded-lg transition-all duration-300 ${
                  isCopied
                    ? "bg-green-500 text-white shadow-[0_0_15px_rgba(34,197,94,0.4)]"
                    : "bg-purple-600 text-white hover:bg-purple-500 shadow-[0_0_15px_rgba(147,51,234,0.3)] hover:shadow-[0_0_20px_rgba(147,51,234,0.5)]"
                }`}
              >
                {isCopied ? <LuCheck size={20} /> : <LuCopy size={20} />}
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center p-8 border-2 border-dashed border-white/10 rounded-2xl w-full"
          >
            <p className="text-white/40 text-lg font-medium">
              Interact with the controls above to generate a timestamp
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isToastVisible && (
          <Toast message="Copied to clipboard!" onClose={handleClose} />
        )}
      </AnimatePresence>
    </div>
  );
}

export default DisplayOutput;
