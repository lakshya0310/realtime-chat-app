function ConversationItem({

    conversation,

    currentUser,

    selected,

    onSelect,

    onlineUsers,

}) {

    const otherUser = conversation.participants.find(
        (user) => user._id !== currentUser.id
    );

    const isOnline = onlineUsers.includes(otherUser._id);

    return (

        <div

            onClick={() => onSelect(conversation)}

            className={`

                p-4

                cursor-pointer

                border-b

                ${
                    selected
                        ? "bg-slate-800"
                        : "hover:bg-slate-800"
                }

            `}

        >

            <div className="flex items-center justify-between">

                <h3 className="font-semibold">

                    {otherUser.username}

                </h3>

                <span

                    className={`

                        h-3

                        w-3

                        rounded-full

                        ${
                            isOnline
                                ? "bg-green-500"
                                : "bg-gray-500"
                        }

                    `}

                ></span>

            </div>

            <p className="text-sm text-gray-400 truncate">

                {

                    conversation.lastMessage?.text ||

                    "No messages yet"

                }

            </p>

        </div>

    );

}

export default ConversationItem;
