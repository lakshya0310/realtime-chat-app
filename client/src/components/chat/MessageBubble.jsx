function MessageBubble({ message, currentUser }) {

    const isMine = message.sender._id === currentUser.id;

    return (

        <div
            className={`flex mb-3 ${
                isMine
                    ? "justify-end"
                    : "justify-start"
            }`}
        >

            <div
                className={`max-w-xs px-4 py-2 rounded-lg shadow ${
                    isMine
                        ? "bg-blue-600 text-white"
                        : "bg-white"
                }`}
            >

                {/* Text Message */}

                {message.text && (

                    <p className="mb-2">

                        {message.text}

                    </p>

                )}

                {/* Image */}

                {message.file &&
                    message.fileType?.startsWith("image") && (

                    <img
                        src={`http://localhost:5000${message.file}`}
                        alt="Uploaded"
                        className="rounded-lg max-w-xs mt-2"
                    />

                )}

                {/* Other Files */}

                {message.file &&
                    !message.fileType?.startsWith("image") && (

                    <a
                        href={`http://localhost:5000${message.file}`}
                        target="_blank"
                        rel="noreferrer"
                        className={`underline ${
                            isMine
                                ? "text-white"
                                : "text-blue-600"
                        }`}
                    >

                        📎 Download File

                    </a>

                )}

                {/* Timestamp */}

                <div className="flex justify-between items-center mt-2">

                    <p
                        className={`text-xs ${
                            isMine
                                ? "text-blue-100"
                                : "text-gray-400"
                        }`}
                    >

                        {new Date(
                            message.createdAt
                        ).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                        })}

                    </p>

                    {

                        isMine && (

                            <span
                                className={`text-xs ml-2 ${
                                    message.readBy?.length > 0
                                        ? "text-blue-300"
                                        : "text-gray-300"
                                }`}
                            >

                                {

                                    message.readBy?.length > 0
                                        ? "✔✔"

                                        : message.deliveredTo?.length > 0
                                        ? "✔✔"

                                        : "✔"

                                }

                            </span>

                        )

                    }

                </div>

            </div>

        </div>

    );

}

export default MessageBubble;
