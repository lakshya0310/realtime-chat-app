import MessageBubble from "./MessageBubble";

function MessageList({ messages, currentUser }) {

    return (

        <div className="flex-1 overflow-y-auto p-5">

            {messages.map((message) => (

                <MessageBubble
                    key={message._id}
                    message={message}
                    currentUser={currentUser}
                />

            ))}

        </div>

    );

}

export default MessageList;
