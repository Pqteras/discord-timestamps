import { useState, useEffect, useImperativeHandle, forwardRef } from "react"
import TimestampOptionsDropdown from "./TimestampOptions"

const Inputs = forwardRef(({ generatedTimestamp }, ref) => {
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [timestampStyle, setTimestampStyle] = useState('R');

    const handleStyleSelect = (select) => setTimestampStyle(select)
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
        const date = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
        const time = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
        setDate(date);
        setTime(time);
    };

    useImperativeHandle(ref, () => ({
        reset: resetInputsToCurrentTime,
    }));

    return (
        <>
            <div className="flex gap-4 items-center flex-wrap flex-col w-full">
                <div className="flex justify-between items-center w-full flex-wrap">
                    <label htmlFor="date" className="text-xl">Date</label>
                    <input
                        type="date" 
                        name="date"
                        id="date"
                        value={date}
                        onChange={handleDateChange}
                        className="text-black p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="flex justify-between items-center w-full flex-wrap">
                    <label htmlFor="time" className="text-xl">Time</label>
                    <input
                        type="time" 
                        name="time" 
                        id="time"
                        value={time}
                        onChange={handleTimeChange}
                        className="text-black p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <TimestampOptionsDropdown onSelect={handleStyleSelect}/>
            </div>
            
        </>
    )
})

export default Inputs;