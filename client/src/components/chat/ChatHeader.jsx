import Avatar from "../common/Avatar";

function ChatHeader({

    conversation,

    currentUser,

    isTyping,

    isMobile,

    onBack,

}) {

    const otherUser = conversation.participants.find(
        (user) => user._id !== currentUser.id
    );

    return (

        <div className="border-b bg-white px-4 py-3">

            <div className="flex items-center gap-3">

                {

                    isMobile && (

                        <button
                            onClick={onBack}
                            className="text-2xl font-bold hover:text-blue-600"
                        >

                            ←

                        </button>

                    )

                }

                <Avatar
                    user={otherUser}
                    size="w-12 h-12"
                />

                <div>

                    <h2 className="text-xl font-semibold">

                        {otherUser.username}

                    </h2>

                    {

                        isTyping ? (

                            <p className="text-green-600 text-sm">

                                Typing...

                            </p>

                        ) : (

                            <p className="text-gray-500 text-sm">

                                {

                                    otherUser.isOnline

                                        ? "Online"

                                        : "Offline"

                                }

                            </p>

                        )

                    }

                </div>

            </div>

        </div>

    );

}

export default ChatHeader;
