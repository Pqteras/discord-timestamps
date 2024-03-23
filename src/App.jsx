import { useState, useRef } from 'react';
import DisplayOutput from './components/DisplayOutput';
import Inputs from './components/Inputs'
import { Analytics } from "@vercel/analytics/react"
import './style/app.scss'

function App() {
  const inputRef = useRef();
  const [timestamp, setTimestamp] = useState('');

  const handleTimestampGeneration = (date, time, style) => {
    console.log(date, time, style);
    const dateTime = new Date(`${date}T${time}`).getTime() / 1000;
    const discordTimestamp = `<t:${dateTime}:${style}>`;
    setTimestamp(discordTimestamp)
  };

  const handleReset = () => inputRef.current.reset();
  
  return (
    <>
      <div className="flex flex-col items-center justify-center my-8 mx-auto px-5 py-6 box-border gap-10 bg-violet-600 rounded-[10px] font-bold max-w-full sm:max-w-[800px]">
        <header className='text-2xl sm:text-4xl flex items-center gap-2 flex-wrap'>
          <img src="../timestamp.svg" alt="Logo" className="h-12 w-12 sm:h-[45px] sm:w-[45px]" />
          Discord Timestamps
        </header>
        <Inputs generatedTimestamp={handleTimestampGeneration} ref={inputRef}/>
        <DisplayOutput timestamp={timestamp}/>
        <button
          onClick={handleReset}
          className='justify-center border px-2 py-1 rounded'
        >
          Reset to current time
        </button>
      </div>
      <Analytics />
    </>
  )
}

export default App