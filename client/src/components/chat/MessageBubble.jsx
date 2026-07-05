import Avatar from "../common/Avatar";

function MessageBubble({ message, currentUser }) {

    const isMine = message.sender._id === currentUser.id;

    return (

        <div
            className={`

    flex

    mb-2
    md:mb-4

    ${
        isMine
            ? "justify-end"
            : "justify-start"
    }

`}
        >

            {/* Avatar (only for received messages) */}

            {

                !isMine && (

                    <div className="mr-2 self-end">

                        <Avatar
                            user={message.sender}
                            size="w-8 h-8"
                        />

                    </div>

                )

            }

            {/* Message Bubble */}

            <div
                className={`
    max-w-[85%]
    sm:max-w-xs
    md:max-w-md

    px-3
    md:px-4

    py-2

    rounded-lg

    shadow

    ${
        isMine
            ? "bg-blue-600 text-white"
            : "bg-white"
    }
`}
            >

                {/* Text Message */}

                {message.text && (

                    <p className="mb-2 text-sm md:text-base break-words">

                        {message.text}

                    </p>

                )}

                {/* Image */}

                {message.file &&
                    message.fileType?.startsWith("image") && (

                    <img
                        src={`http://localhost:5000${message.file}`}
                        alt="Uploaded"
                        className="
        mt-2
        rounded-lg
        w-full
        max-w-[260px]
        sm:max-w-xs
        md:max-w-sm
        object-contain
        max-h-80
        cursor-pointer
        hover:opacity-95
        transition
    "
                    />

                )}

                {/* Other Files */}

                {message.file &&
                    !message.fileType?.startsWith("image") && (

                    <a
    href={`http://localhost:5000${message.file}`}
    target="_blank"
    rel="noreferrer"
    className={`
        mt-2
        flex
        items-center
        gap-2
        rounded-lg
        border
        px-3
        py-2
        text-sm
        transition
        ${
            isMine
                ? "border-blue-400 hover:bg-blue-500"
                : "border-gray-300 hover:bg-gray-100"
        }
    `}
>

    📎

    <span className="truncate">

        Download File

    </span>

</a>

                )}

                {/* Footer */}

                <div className="flex justify-between items-center mt-2">

                    <p
                        className={`

    text-[10px]
    md:text-xs

    ${
        isMine
            ? "text-blue-100"
            : "text-gray-400"
    }

`}
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
                                className={`

    text-[10px]
    md:text-xs

    ml-2

    ${
        message.readBy?.length > 0
            ? "text-blue-300"
            : "text-gray-300"
    }

`}
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
