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

        <p className="p-5 text-center text-gray-400">

            No conversations found

        </p>

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
