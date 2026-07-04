function ChatHeader({ conversation, currentUser,isTyping }) {

    const otherUser = conversation.participants.find(
        (user) => user._id !== currentUser.id
    );

    return (

    <div className="border-b bg-white px-6 py-4">

        <div className="flex items-center gap-3">

            <img
                src={
                    otherUser.avatar
                        ? `http://localhost:5000${otherUser.avatar}`
                        : "https://placehold.co/50x50?text=🙂"
                }
                alt="Avatar"
                className="w-12 h-12 rounded-full object-cover"
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

                    ) : null

                }

            </div>

        </div>

    </div>

);

}

export default ChatHeader;
