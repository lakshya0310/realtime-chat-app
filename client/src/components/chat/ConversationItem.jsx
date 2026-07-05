import Avatar from "../common/Avatar";

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

                p-3
                md:p-4

                cursor-pointer

                border-b

                transition-colors

                ${
                    selected
                        ? "bg-slate-800"
                        : "hover:bg-slate-800"
                }

            `}

        >

            <div className="flex items-center gap-3">

                {/* Avatar */}

                <div className="relative">

                    <Avatar
                        user={otherUser}
                        size="w-12 h-12"
                    />

                    {

                        isOnline && (

                            <span
                                className="
                                    absolute
                                    bottom-0
                                    right-0
                                    w-3
                                    h-3
                                    rounded-full
                                    bg-green-500
                                    border-2
                                    border-slate-900
                                "
                            />

                        )

                    }

                </div>

                {/* Username + Last Message */}

                <div className="flex-1 overflow-hidden">

                    <h3 className="font-medium md:font-semibold text-white text-sm md:text-base">

                        {otherUser.username}

                    </h3>

                    <p className="text-xs md:text-sm text-gray-400 truncate">

                        {

                            conversation.lastMessage?.text ||

                            "No messages yet"

                        }

                    </p>

                </div>

            </div>

        </div>

    );

}

export default ConversationItem;
