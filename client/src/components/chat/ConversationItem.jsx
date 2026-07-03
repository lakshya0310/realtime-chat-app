function ConversationItem({

    conversation,

    currentUser,

    selected,

    onSelect,

}) {

    const otherUser = conversation.participants.find(

        (user) => user._id !== currentUser.id

    );

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

            <h3 className="font-semibold">

                {otherUser.username}

            </h3>

            <p className="text-sm text-gray-400">

                {

                    conversation.lastMessage?.text ||

                    "No messages yet"

                }

            </p>

        </div>

    );

}

export default ConversationItem;
