import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";

function MessageList({ messages, currentUser }) {

    const bottomRef = useRef(null);

    useEffect(() => {

        bottomRef.current?.scrollIntoView({
            behavior: "smooth",
        });

    }, [messages]);

    return (

        <div className="flex-1 overflow-y-auto p-5">

            {messages.map((message) => (

                <MessageBubble
                    key={message._id}
                    message={message}
                    currentUser={currentUser}
                />

            ))}

            <div ref={bottomRef}></div>

        </div>

    );

}

export default MessageList;
