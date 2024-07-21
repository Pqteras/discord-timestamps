import { useState, useRef } from "react";
import DisplayOutput from "./components/DisplayOutput";
import Inputs from "./components/Inputs";
import { Analytics } from "@vercel/analytics/react";
import { PiClockCountdownBold } from "react-icons/pi";
import "./style/app.scss";
import "./style/font.css";

function App() {
  const inputRef = useRef();
  const [timestamp, setTimestamp] = useState("");

  const handleTimestampGeneration = (date, time, style) => {
    console.log(date, time, style);
    const dateTime = new Date(`${date}T${time}`).getTime() / 1000;
    const discordTimestamp = `<t:${dateTime}:${style}>`;
    setTimestamp(discordTimestamp);
  };

  const handleReset = () => inputRef.current.reset();

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center p-6 mx-4 box-border gap-8 bg-[#191919] rounded-lg font-bold max-w-[400px] sm:w-[400px] w-full">
        <header className="text-3xl sm:text-4xl flex items-center gap-2 flex-wrap">
          <PiClockCountdownBold className="text-5xl text-yellow-500"/>
          DiscordStamps
        </header>
        <Inputs generatedTimestamp={handleTimestampGeneration} ref={inputRef} />
        <DisplayOutput timestamp={timestamp} />
        <button
          onClick={handleReset}
          className="justify-center border px-4 py-3 rounded uppercase hover:-translate-y-1 duration-200 ease-in-out hover:bg-[#212121]"
        >
          Reset to current time
        </button>
      </div>
      <Analytics />
    </div>
  );
}

export default App;
