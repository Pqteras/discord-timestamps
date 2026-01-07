import { useState, useRef, useEffect } from "react";
import { RiBrush2Line, RiArrowDownSLine } from "react-icons/ri";
import { motion, AnimatePresence } from "motion/react";

const options = [
  { value: "R", label: "Relative Time", example: "21 years ago" },
  { value: "t", label: "Short Time", example: "03:15" },
  { value: "T", label: "Long Time", example: "03:15:00" },
  { value: "d", label: "Short Date", example: "14/03/2004" },
  { value: "D", label: "Long Date", example: "14 March 2004" },
  { value: "f", label: "Short Date/Time", example: "14 March 2004 03:15" },
  {
    value: "F",
    label: "Long Date/Time",
    example: "Sunday, 14 March 2004 03:15",
  },
];

const TimestampOptionsDropdown = ({ onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    setSelectedOption(option);
    onSelect(option.value);
    setIsOpen(false);
  };

  return (
    <div className="flex justify-between items-center w-full relative z-50">
      <label className="text-xl sm:text-2xl flex items-center gap-2 font-semibold text-white/90">
        <div className="p-2 bg-purple-500/20 rounded-lg backdrop-blur-md border border-purple-500/30">
          <RiBrush2Line className="text-xl sm:text-2xl text-purple-400" />
        </div>
        Example
      </label>

      <div className="relative w-40 sm:w-48" ref={dropdownRef}>
        <motion.button
          whileHover={{
            scale: 1.02,
            backgroundColor: "rgba(255, 255, 255, 0.08)",
          }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl backdrop-blur-md text-white text-sm sm:text-base font-medium shadow-lg hover:border-white/20 transition-colors"
        >
          <span className="truncate">{selectedOption.label}</span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <RiArrowDownSLine className="text-lg text-white/50" />
          </motion.div>
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute top-full right-0 mt-2 w-56 p-1.5 bg-[#1a1a1a]/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden z-60"
            >
              <div className="max-h-55 overflow-y-auto custom-scrollbar flex flex-col gap-0.5">
                {options.map((option) => (
                  <motion.button
                    key={option.value}
                    onClick={() => handleSelect(option)}
                    className={`flex flex-col items-start px-3 py-2 rounded-lg text-left transition-colors ${
                      selectedOption.value === option.value
                        ? "bg-purple-500/20 text-purple-300"
                        : "text-white/70 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <span className="text-sm font-medium">{option.label}</span>
                    <span className="text-xs opacity-50">{option.example}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TimestampOptionsDropdown;
