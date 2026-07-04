import { useState, useRef } from "react";
import EmojiPicker from "emoji-picker-react";
import { Paperclip } from "lucide-react";

function MessageInput({ onSend, onTyping, onStopTyping, onFileSelect }) {

    const [text, setText] = useState("");
    const [showPicker, setShowPicker] = useState(false);
    const fileInputRef = useRef(null);

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
    const handleEmojiClick = (emojiData) => {

    setText((prev) => prev + emojiData.emoji);

    onTyping();

    clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
        onStopTyping();
    }, 1000);

    setShowPicker(false);

};
    return (

        <div className="relative border-t bg-white p-4">

    {

        showPicker && (

            <div className="absolute bottom-20 left-4">

                <EmojiPicker
                    onEmojiClick={handleEmojiClick}
                />

            </div>

        )

    }

    <form
        onSubmit={handleSubmit}
        className="flex"
    >
    <input

    type="file"

    ref={fileInputRef}

    hidden

    accept="image/*,.pdf,.doc,.docx"

    onChange={(e) => {

        if (!e.target.files[0]) return;

        onFileSelect(e.target.files[0]);

    }}

/>

<button

    type="button"

    onClick={() => fileInputRef.current.click()}

    className="mr-2"

>

    <Paperclip />

</button>

        <button
            type="button"
            onClick={() =>
                setShowPicker(!showPicker)
            }
            className="mr-2 text-2xl"
        >
            😊
        </button>

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

</div>

    );

}

export default MessageInput;
