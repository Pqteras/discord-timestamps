import { useState, useRef } from "react";
import DisplayOutput from "./components/DisplayOutput";
import Inputs from "./components/Inputs";
import { Analytics } from "@vercel/analytics/react";
import { PiClockCountdownBold } from "react-icons/pi";
import { RiRefreshLine } from "react-icons/ri";
import "./style/app.css";
import "./style/font.css";
import { motion } from "motion/react";

function App() {
  const inputRef = useRef();
  const [timestamp, setTimestamp] = useState("");

  const handleTimestampGeneration = (date, time, style) => {
    const dateTime = new Date(`${date}T${time}`).getTime() / 1000;
    const discordTimestamp = `<t:${dateTime}:${style}>`;
    setTimestamp(discordTimestamp);
  };

  const handleReset = () => {
    inputRef.current.reset();
    setTimestamp("");
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 overflow-hidden relative selection:bg-purple-500/30">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center p-8 sm:p-10 gap-8 bg-black/40 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-2xl max-w-lg w-full"
      >
        <header className="flex flex-col items-center gap-3">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.1,
            }}
            className="p-4 bg-linear-to-br from-yellow-400/20 to-orange-500/20 rounded-2xl border border-yellow-500/20 shadow-lg mb-2"
          >
            <PiClockCountdownBold className="text-5xl text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]" />
          </motion.div>
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-linear-to-r from-white to-white/70">
              DiscordStamps
            </h1>
            <p className="text-white/40 text-sm mt-1 font-medium">
              Create dynamic timestamps for Discord
            </p>
          </div>
        </header>

        <div className="w-full flex flex-col gap-6">
          <Inputs
            generatedTimestamp={handleTimestampGeneration}
            ref={inputRef}
          />

          <div className="w-full h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />

          <DisplayOutput timestamp={timestamp} />

          <motion.button
            whileHover={{
              scale: 1.02,
              backgroundColor: "rgba(255, 255, 255, 0.1)",
            }}
            whileTap={{ scale: 0.98 }}
            onClick={handleReset}
            className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-white/10 bg-white/5 text-white/80 font-semibold hover:text-white transition-all shadow-lg hover:shadow-xl hover:border-white/20 group"
          >
            <RiRefreshLine className="text-xl transition-transform group-hover:-rotate-180 duration-500" />
            Reset to current time
          </motion.button>
        </div>
      </motion.div>
      <Analytics />
    </div>
  );
}

export default App;
