function ChatHeader({ conversation, currentUser,isTyping }) {

    const otherUser = conversation.participants.find(
        (user) => user._id !== currentUser.id
    );

    return (

        <div className="border-b bg-white px-6 py-4">

            <h2 className="text-2xl font-semibold">

                {otherUser.username}

            </h2>
	{

    	isTyping && (

        	<p className="text-green-600 text-sm">

        	    Typing...

        	</p>

    		)

	}
        </div>

    );

}

export default ChatHeader;
