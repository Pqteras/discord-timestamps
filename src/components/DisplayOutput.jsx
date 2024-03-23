import { useState, useEffect } from 'react'
import { formatDiscordTimestamp } from '../utils/converters' 
import { AnimatePresence } from 'framer-motion';
import { LuClipboardCopy } from "react-icons/lu";
import Toast from './Toast'

function DisplayOutput({ timestamp }) {
    const [formattedTimestamp, setFormattedTimestamp] = useState('');
    const [isToastVisible, setToastVisible] = useState(false);

    useEffect(() => {
        setFormattedTimestamp(formatDiscordTimestamp(timestamp))
    }, [timestamp])

    const copyToClipboard = () => {
        navigator.clipboard.writeText(timestamp).then(() => {
            setToastVisible(true);
        }, (err) => {
            console.error('Could not copy text: ', err);
        });
    };

    const handleClose = () => setToastVisible(false);

    return (
        <>
            <div className="output-container p-4">
                <h3 className="text-lg font-semibold mb-2">{formattedTimestamp}</h3>
                {timestamp ? (
                        <div className="flex items-stretch gap-2">
                            <span className="font-mono bg-gray-100 p-2 rounded text-black">{timestamp}</span>
                            <button
                                onClick={copyToClipboard}
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors"
                            >
                                <LuClipboardCopy size='1.2rem'/>
                            </button>
                        </div>
                ) : (
                    <p className="text-white text-sm">Enter a date and time to generate a Discord timestamp.</p>
                )}
            </div>
            <AnimatePresence>
                {isToastVisible && <Toast message="Timestamp Copied!" onClose={handleClose} />}
            </AnimatePresence>
        </>
    )
}

export default DisplayOutput;
