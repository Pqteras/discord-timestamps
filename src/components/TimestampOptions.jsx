import { RiBrush2Line } from "react-icons/ri";

const TimestampOptionsDropdown = ({ onSelect }) => {
  return (
    <div className="flex justify-between items-center w-full">
      <label htmlFor="timestamp-style" className="text-2xl flex items-center gap-1">
        <RiBrush2Line className="text-3xl text-purple-500"/>
        STYLE
      </label>
      <select
        name="timestamp-style"
        id="timestamp-style"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded block p-2.5 w-[150px]"
        onChange={(e) => onSelect(e.target.value)}
      >
        <option value="R">Relative Time</option>
        <option value="t">Short Time</option>
        <option value="T">Long Time</option>
        <option value="d">Short Date</option>
        <option value="D">Long Date</option>
        <option value="f">Short Date/Time</option>
        <option value="F">Long Date/Time</option>
      </select>
    </div>
  );
}

export default TimestampOptionsDropdown;
