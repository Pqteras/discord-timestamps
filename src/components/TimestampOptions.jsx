function TimestampOptionsDropdown({ onSelect }) {
    return (
        <div className="flex justify-between items-center w-full">
            <label htmlFor="timestamp-style" className="block text-xl font-medium">Style</label>
            <select
                name="timestamp-style"
                id="timestamp-style"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                onChange={e => onSelect(e.target.value)}
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

export default TimestampOptionsDropdown