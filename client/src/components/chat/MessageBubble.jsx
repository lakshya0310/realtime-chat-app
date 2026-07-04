function MessageBubble({ message, currentUser }) {

    const isMine = message.sender._id === currentUser.id;

    return (

        <div
            className={`flex mb-3 ${
                isMine ? "justify-end" : "justify-start"
            }`}
        >

            <div
                className={`max-w-xs px-4 py-2 rounded-lg ${
                    isMine
                        ? "bg-blue-600 text-white"
                        : "bg-white"
                }`}
            >

                {message.text}

            </div>

        </div>

    );

}

export default MessageBubble;
