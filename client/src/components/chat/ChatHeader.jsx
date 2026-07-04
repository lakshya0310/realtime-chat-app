function ChatHeader({ conversation, currentUser }) {

    const otherUser = conversation.participants.find(
        (user) => user._id !== currentUser.id
    );

    return (

        <div className="border-b bg-white px-6 py-4">

            <h2 className="text-2xl font-semibold">

                {otherUser.username}

            </h2>

        </div>

    );

}

export default ChatHeader;
