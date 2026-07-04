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

                <p>

                    {message.text}

                </p>

                <p
                    className={`text-xs mt-2 ${
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
                <p className="text-xs">

    {

        isMine &&

        (

            message.readBy.length > 0 ?

            "✔✔"

            :

            "✔"

        )

    }

</p>

            </div>

        </div>

    );

}

export default MessageBubble;
