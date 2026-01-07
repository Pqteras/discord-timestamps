import { useState, useEffect, useImperativeHandle, forwardRef } from "react";
import TimestampOptionsDropdown from "./TimestampOptions";
import { LuClock, LuCalendar } from "react-icons/lu";
import { motion } from "motion/react";

const Inputs = forwardRef(({ generatedTimestamp }, ref) => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [timestampStyle, setTimestampStyle] = useState("R");

  const handleStyleSelect = (select) => setTimestampStyle(select);
  const handleDateChange = (e) => setDate(e.target.value);
  const handleTimeChange = (e) => setTime(e.target.value);

  useEffect(() => {
    if (date && time) generatedTimestamp(date, time, timestampStyle);
  }, [date, time, timestampStyle, generatedTimestamp]);

  const resetInputsToCurrentTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const date = `${year}-${month.toString().padStart(2, "0")}-${day
      .toString()
      .padStart(2, "0")}`;
    const time = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
    setDate(date);
    setTime(time);
  };

  useImperativeHandle(ref, () => ({
    reset: resetInputsToCurrentTime,
  }));

  const inputClasses =
    "w-35 sm:w-40 px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 backdrop-blur-md transition-all shadow-sm uppercase font-mono text-sm sm:text-base";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex gap-6 items-center flex-wrap flex-col w-full"
    >
      {/* Date Input */}
      <div className="flex justify-between items-center w-full group">
        <label
          htmlFor="date"
          className="text-xl sm:text-2xl flex items-center gap-2 font-semibold text-white/90"
        >
          <div className="p-2 bg-red-500/20 rounded-lg backdrop-blur-md border border-red-500/30 group-hover:bg-red-500/30 transition-colors">
            <LuCalendar className="text-xl sm:text-2xl text-red-400" />
          </div>
          Date
        </label>
        <input
          type="date"
          name="date"
          id="date"
          value={date}
          onChange={handleDateChange}
          onClick={(e) => e.target.showPicker && e.target.showPicker()}
          className={inputClasses}
          style={{ colorScheme: "dark" }}
        />
      </div>

      {/* Time Input */}
      <div className="flex justify-between items-center w-full group">
        <label
          htmlFor="time"
          className="text-xl sm:text-2xl flex items-center gap-2 font-semibold text-white/90"
        >
          <div className="p-2 bg-green-500/20 rounded-lg backdrop-blur-md border border-green-500/30 group-hover:bg-green-500/30 transition-colors">
            <LuClock className="text-xl sm:text-2xl text-green-400" />
          </div>
          Time
        </label>
        <input
          type="time"
          name="time"
          id="time"
          value={time}
          onChange={handleTimeChange}
          onClick={(e) => e.target.showPicker && e.target.showPicker()}
          className={inputClasses}
          style={{ colorScheme: "dark" }}
        />
      </div>

      <TimestampOptionsDropdown onSelect={handleStyleSelect} />
    </motion.div>
  );
});

Inputs.displayName = "Inputs";

export default Inputs;
