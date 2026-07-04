import { useState } from "react";

function MessageInput({ onSend }) {

    const [text, setText] = useState("");

    const handleSubmit = (e) => {

        e.preventDefault();

        if (!text.trim()) return;

        onSend(text);

        setText("");

    };

    return (

        <form
            onSubmit={handleSubmit}
            className="border-t bg-white p-4 flex"
        >

            <input

                value={text}

                onChange={(e) => setText(e.target.value)}

                placeholder="Type a message..."

                className="flex-1 border rounded px-4 py-2"

            />

            <button
                className="ml-3 bg-blue-600 text-white px-6 rounded"
            >

                Send

            </button>

        </form>

    );

}

export default MessageInput;
