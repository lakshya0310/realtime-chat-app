import { useState, useRef, useEffect } from "react";
import EmojiPicker from "emoji-picker-react";
import { Paperclip } from "lucide-react";

function MessageInput({
    onSend,
    onTyping,
    onStopTyping,
    onFileSelect,
}) {

    const [text, setText] = useState("");
    const [showPicker, setShowPicker] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);

    const timeoutRef = useRef(null);
    const fileInputRef = useRef(null);
    const textareaRef = useRef(null);

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

        if (textareaRef.current) {

            textareaRef.current.style.height = "auto";

            textareaRef.current.style.height =
                textareaRef.current.scrollHeight + "px";

        }

    };

    const handleKeyDown = (e) => {

        if (e.key === "Enter" && !e.shiftKey) {

            e.preventDefault();

            handleSubmit(e);

        }

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!text.trim() && !selectedFile) return;

        if (text.trim()) {

            onSend(text);

        }

        if (selectedFile) {

            await onFileSelect(selectedFile);

        }

        setText("");
        setSelectedFile(null);
        setPreview(null);

        if (textareaRef.current) {

            textareaRef.current.style.height = "auto";

        }

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

        <div
            className="
                relative
                border-t
                bg-white
                p-3
                md:p-4
            "
        >

            {

                showPicker && (

                    <div
                        className="
                            absolute
                            bottom-16
                            left-2
                            md:left-4
                            z-50
                        "
                    >

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
                className="
                    flex
                    items-end
                    gap-2
                "
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

                            setPreview(
                                URL.createObjectURL(file)
                            );

                        } else {

                            setPreview(null);

                        }

                    }}
                />

                <button
                    type="button"
                    onClick={() =>
                        fileInputRef.current.click()
                    }
                    className="
                        text-xl
                        md:text-2xl
                        px-2
                        py-1
                        rounded
                        hover:bg-gray-100
                    "
                >

                    <Paperclip />

                </button>

                <button
                    type="button"
                    onClick={() =>
                        setShowPicker(!showPicker)
                    }
                    className="
                        text-xl
                        md:text-2xl
                        px-2
                        py-1
                        rounded
                        hover:bg-gray-100
                    "
                >

                    😊

                </button>

                <textarea
                    ref={textareaRef}
                    value={text}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Type a message..."
                    rows={1}
                    className="
                        flex-1
                        resize-none
                        border
                        rounded-lg
                        px-3
                        py-2
                        text-sm
                        md:text-base
                        outline-none
                        max-h-32
                        overflow-y-auto
                    "
                />

                <button
                    type="submit"
                    className="
                        bg-blue-600
                        hover:bg-blue-700
                        text-white
                        px-4
                        md:px-6
                        py-2
                        rounded-lg
                        text-sm
                        md:text-base
                    "
                >

                    Send

                </button>

            </form>

        </div>

    );

}

export default MessageInput;
