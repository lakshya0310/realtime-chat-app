import ConversationItem from "./ConversationItem";

function ConversationList({

    conversations,

    currentUser,

    selectedConversation,

    onSelect,
    
    onlineUsers,
}) {

if (conversations.length === 0) {

    return (

        <div className="h-full flex flex-col items-center justify-center text-gray-400 p-6">

    <div className="text-5xl mb-4">

        💬

    </div>

    <h3 className="text-lg font-semibold">

        No conversations

    </h3>

    <p className="text-sm mt-2 text-center">

        Click "New Chat" to start chatting.

    </p>

</div>

    );

}

return (

    <>

        {conversations.map((conversation) => (

            <ConversationItem
                key={conversation._id}
                conversation={conversation}
                currentUser={currentUser}
                selected={selectedConversation?._id === conversation._id}
                onSelect={onSelect}
                onlineUsers={onlineUsers}
            />

        ))}

    </>

);


}

export default ConversationList;
