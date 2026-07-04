import Avatar from "../common/Avatar";

function ChatHeader({ conversation, currentUser, isTyping }) {

    const otherUser = conversation.participants.find(
        (user) => user._id !== currentUser.id
    );

    return (

        <div className="border-b bg-white px-6 py-4">

            <div className="flex items-center gap-3">

                <Avatar
                    user={otherUser}
                    size="w-12 h-12"
                />

                <div>

                    <h2 className="text-2xl font-semibold">

                        {otherUser.username}

                    </h2>

                    {

                        isTyping ? (

                            <p className="text-green-600 text-sm">

                                Typing...

                            </p>

                        ) : (

                            <p className="text-gray-500 text-sm">

                                Online

                            </p>

                        )

                    }

                </div>

            </div>

        </div>

    );

}

export default ChatHeader;
