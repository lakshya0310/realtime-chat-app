import { useState, useRef, useEffect } from "react";
import EmojiPicker from "emoji-picker-react";
import { Paperclip } from "lucide-react";


function MessageInput({ onSend, onTyping, onStopTyping, onFileSelect }) {

    const [text, setText] = useState("");
    const [showPicker, setShowPicker] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const fileInputRef = useRef(null);

    const timeoutRef = useRef(null);
    
	useEffect(() => {

    return () => {

        if (preview) {

            URL.revokeObjectURL(preview);

        }

    };

}, [preview]);
    const handleChange = (e) => {

        setText(e.target.value);

        onTyping();

        clearTimeout(timeoutRef.current);

        timeoutRef.current = setTimeout(() => {
            onStopTyping();
        }, 1000);

    };

    const handleSubmit = async (e) => {

    e.preventDefault();

    // Don't send if there's neither text nor a selected file
    if (!text.trim() && !selectedFile) return;

    // Send text if present
    if (text.trim()) {

        onSend(text);

    }

    // Upload file if one is selected
    if (selectedFile) {

        await onFileSelect(selectedFile);

    }

    // Reset everything
    setText("");
    setSelectedFile(null);
    setPreview(null);

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
    {
    preview && (

        <div className="mb-4">

            <img
                src={preview}
                alt="Preview"
                className="max-h-60 rounded-lg border"
            />

            <button
                type="button"
                onClick={() => {

                    setSelectedFile(null);
                    setPreview(null);

                }}
                className="mt-3 bg-red-500 text-white px-4 py-2 rounded"
            >

                Cancel

            </button>

        </div>

    )
}
{
    selectedFile && !preview && (

        <div className="mb-4 flex justify-between items-center border rounded p-3">

            <span>

                📎 {selectedFile.name}

            </span>

            <button
                type="button"
                onClick={() => {

                    setSelectedFile(null);
                    setPreview(null);

                }}
                className="bg-red-500 text-white px-3 py-1 rounded"
            >

                Cancel

            </button>

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

    const file = e.target.files[0];

    if (!file) return;

    setSelectedFile(file);

    if (file.type.startsWith("image")) {

        setPreview(URL.createObjectURL(file));

    } else {

        setPreview(null);

    }

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
