import { useState, useRef } from "react";

function MessageInput({ onSend, onTyping, onStopTyping }) {

    const [text, setText] = useState("");
    const timeoutRef = useRef(null);

    const handleChange = (e) => {

        setText(e.target.value);

        onTyping();

        clearTimeout(timeoutRef.current);

        timeoutRef.current = setTimeout(() => {
            onStopTyping();
        }, 1000);

    };

    const handleSubmit = (e) => {

        e.preventDefault();

        if (!text.trim()) return;

        onSend(text);

        setText("");

        clearTimeout(timeoutRef.current);

        onStopTyping();

    };

    return (

        <form
            onSubmit={handleSubmit}
            className="border-t bg-white p-4 flex"
        >

            <input
                value={text}
                onChange={handleChange}
                placeholder="Type a message..."
                className="flex-1 border rounded px-4 py-2"
            />

            <button
                type="submit"
                className="ml-3 bg-blue-600 text-white px-6 rounded"
            >
                Send
            </button>

        </form>

    );

}

export default MessageInput;
