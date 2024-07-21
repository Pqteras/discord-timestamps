import { useState, useEffect } from "react";
import { formatDiscordTimestamp } from "../utils/converters";
import { motion, AnimatePresence } from "framer-motion";
import { LuClipboardCopy } from "react-icons/lu";
import Toast from "./Toast";

function DisplayOutput({ timestamp }) {
  const [formattedTimestamp, setFormattedTimestamp] = useState("");
  const [isToastVisible, setToastVisible] = useState(false);
  const [firstRender, setFirstRender] = useState(true);

  useEffect(() => {
    if (timestamp) {
      setFormattedTimestamp(formatDiscordTimestamp(timestamp));
      setFirstRender(false);
    }
  }, [timestamp]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(timestamp).then(
      () => {
        setToastVisible(true);
      },
      (err) => {
        console.error("Could not copy text: ", err);
      }
    );
  };

  const handleClose = () => setToastVisible(false);

  return (
    <>
      {formattedTimestamp && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ ease: "easeInOut", duration: 0.5 }}
          className="output-container"
        >
          <div className="p-4">
            <motion.h3
              key={`${timestamp}-h3`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                ease: "easeInOut",
                duration: 0.4,
                delay: firstRender ? 0.5 : 0,
              }}
              className="text-lg font-semibold mb-2"
            >
              {formattedTimestamp}
            </motion.h3>
            <div className="flex items-stretch gap-2">
              <motion.span
                key={`${timestamp}-span`}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 10,
                  duration: 0.4,
                  delay: firstRender ? 0.6 : 0.1,
                }}
                className="font-mono bg-gray-100 p-2 rounded text-black"
              >
                {timestamp}
              </motion.span>
              <motion.button
                key={`${timestamp}-btn`}
                initial={{ opacity: 0, x: -69 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 13,
                  delay: firstRender ? 0.7 : 0.4,
                }}
                onClick={copyToClipboard}
                className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-600 transition-colors"
              >
                <LuClipboardCopy size="1.2rem" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
      {!formattedTimestamp && (
        <p className="text-white text-xl">Enter a Date & Time to get started</p>
      )}
      <AnimatePresence>
        {isToastVisible && (
          <Toast message="Timestamp Copied!" onClose={handleClose} />
        )}
      </AnimatePresence>
    </>
  );
}

export default DisplayOutput;
