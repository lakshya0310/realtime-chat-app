import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

import { getConversations,createConversation} from "../services/conversationService";
import { getMessages } from "../services/messageService";
import { uploadFile } from "../services/uploadService";
import { getUsers } from "../services/userService";

import socket from "../socket/socket";

import ConversationList from "../components/chat/ConversationList";
import EmptyChat from "../components/chat/EmptyChat";
import ChatHeader from "../components/chat/ChatHeader";
import MessageList from "../components/chat/MessageList";
import MessageInput from "../components/chat/MessageInput";
import NewChatModal from "../components/chat/NewChatModal";
import Avatar from "../components/common/Avatar";


function Chat() {

    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const [conversations, setConversations] = useState([]);
    const [selectedConversation, setSelectedConversation] = useState(null);
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [showNewChatModal, setShowNewChatModal] = useState(false);
    const [users, setUsers] = useState([]);
    const [userSearch, setUserSearch] = useState("");
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);


	useEffect(() => {

    const handleResize = () => {

        setIsMobile(
            window.innerWidth < 768
        );

    };

    window.addEventListener(
        "resize",
        handleResize
    );

    return () => {

        window.removeEventListener(
            "resize",
            handleResize
        );

    };

}, []);
    // Load conversations
    useEffect(() => {
        loadConversations();
        loadUsers();
    }, []);

    // Load messages
    useEffect(() => {

        if (!selectedConversation) return;

        loadMessages();
        socket.emit("markAsRead", {
    conversationId: selectedConversation._id,
});

    }, [selectedConversation]);

    // Socket listeners
    useEffect(() => {

        const updateConversation = (message) => {

            setConversations((prev) => {

                const updated = prev.map((conversation) => {

                    if (conversation._id !== message.conversation)
                        return conversation;

                    return {
                        ...conversation,
                        lastMessage: {
    ...message,
    text:
        message.text ||
        (message.fileType?.startsWith("image")
            ? "📷 Image"
            : "📎 File"),
},
                        updatedAt: new Date().toISOString(),
                    };

                });

                updated.sort(
                    (a, b) =>
                        new Date(b.updatedAt) -
                        new Date(a.updatedAt)
                );

                return updated;

            });

        };

        const handleReceiveMessage = (message) => {
        	console.log("Received socket message:", message);

            if (
                selectedConversation &&
                message.conversation === selectedConversation._id
            ) {

                setMessages((prev) => [...prev, message]);

            }

            updateConversation(message);

        };

        const handleMessageSent = (message) => {

            if (
                selectedConversation &&
                message.conversation === selectedConversation._id
            ) {

                setMessages((prev) => [...prev, message]);

            }

            updateConversation(message);

        };

        const handleOnlineUsers = (users) => {

            setOnlineUsers(users);

        };
        const handleTyping = () => {

    setIsTyping(true);

};

const handleStopTyping = () => {

    setIsTyping(false);

};
const handleMessagesRead = ({ conversationId, userId }) => {

    setMessages((prev) =>
        prev.map((message) => {

            // Ignore messages from other conversations
            const msgConversationId =
    typeof message.conversation === "string"
        ? message.conversation
        : message.conversation?._id;

if (msgConversationId !== conversationId) {
    return message;
}

            // If already marked as read, do nothing
            if (message.readBy?.includes(userId)) {
                return message;
            }

            return {

                ...message,

                readBy: [
                    ...(message.readBy || []),
                    userId,
                ],

            };

        })
    );

};
const handleMessageDelivered = ({ messageId, userId }) => {

    setMessages((prev) =>
        prev.map((message) => {

            if (message._id !== messageId)
                return message;

            return {

                ...message,

                deliveredTo: [
                    ...(message.deliveredTo || []),
                    userId,
                ],

            };

        })
    );

};


socket.on("typing", handleTyping);
socket.on("stopTyping", handleStopTyping);
socket.on("messagesRead", handleMessagesRead);
socket.on(
    "messageDelivered",
    handleMessageDelivered
);
        socket.on("receiveMessage", handleReceiveMessage);
        socket.on("messageSent", handleMessageSent);
        socket.on("onlineUsers", handleOnlineUsers);

        return () => {

            socket.off("receiveMessage", handleReceiveMessage);
            socket.off("messageSent", handleMessageSent);
            socket.off("onlineUsers", handleOnlineUsers);
            socket.off("typing", handleTyping);
	    socket.off("stopTyping", handleStopTyping);
	    socket.off("messagesRead", handleMessagesRead);
	    socket.off(
    "messageDelivered",
    handleMessageDelivered
);

        };

    }, [selectedConversation]);
    

    const loadConversations = async () => {

        try {

            const data = await getConversations();

            setConversations(data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    };
    const loadUsers = async () => {

    try {

        const users = await getUsers();
        setUsers(users);


    } catch (error) {

        console.error(error);

    }

};
const handleCreateConversation = async (receiver) => {

    try {

        const conversation =
            await createConversation(receiver._id);

        await loadConversations();

        setSelectedConversation(conversation);

        setShowNewChatModal(false);

        setUserSearch("");

    } catch (error) {

        console.error(error);

    }

};

    const loadMessages = async () => {

        try {

            const data = await getMessages(
                selectedConversation._id
            );

            setMessages(data);

        } catch (error) {

            console.error(error);

        }

    };

    const handleLogout = () => {

        socket.disconnect();

        logout();

        navigate("/");

    };

    const handleSend = async (text) => {

        if (!selectedConversation) return;

        const otherUser = selectedConversation.participants.find(
            (p) => p._id !== user.id
        );

        socket.emit("sendMessage", {

            conversationId: selectedConversation._id,

            receiverId: otherUser._id,

            text,

        });

    };
    
    const handleTypingEmit = () => {

    if (!selectedConversation) return;

    const otherUser = selectedConversation.participants.find(
        (p) => p._id !== user.id
    );

    socket.emit("typing", {
        receiverId: otherUser._id,
    });

};

const handleStopTypingEmit = () => {

    if (!selectedConversation) return;

    const otherUser = selectedConversation.participants.find(
        (p) => p._id !== user.id
    );

    socket.emit("stopTyping", {
        receiverId: otherUser._id,
    });

};
const filteredConversations = conversations.filter((conversation) => {

    const otherUser = conversation.participants.find(
        (participant) => participant._id !== user.id
    );

    return otherUser?.username
        .toLowerCase()
        .includes(search.toLowerCase());

});
const handleFileUpload = async (file) => {

    if (!selectedConversation) return;

    const otherUser =
        selectedConversation.participants.find(
            (p) => p._id !== user.id
        );

    const formData = new FormData();

    formData.append(
        "conversationId",
        selectedConversation._id
    );

    formData.append(
        "receiverId",
        otherUser._id
    );

    formData.append(
        "file",
        file
    );

    try {

        // Upload the file.
        // The backend will emit Socket.io events,
        // so we DON'T manually add the message.
        await uploadFile(formData);

    } catch (err) {

        console.error(err);

    }

};
    if (!user) {

        return (

            <div className="h-screen flex items-center justify-center text-2xl">

                Loading...

            </div>

        );

    }

    return (

        <div className="h-screen flex">

            {/* Sidebar */}

            <aside
    className={`

        ${
            isMobile && selectedConversation
                ? "hidden"
                : "flex"
        }

        w-80
        bg-slate-900
        text-white
        flex-col

    `}
>

                <div className="p-5 border-b border-slate-700">

                    <h1 className="text-3xl font-bold">

                        Chats

                    </h1>
                    <button
    onClick={() => setShowNewChatModal(true)}
    className="
        mt-4
        w-full
        bg-blue-600
        hover:bg-blue-700
        py-2
        rounded
        font-medium
    "
>
    + New Chat
</button>

                    <div className="mt-4">

    <p className="text-gray-300">

        Welcome,

    </p>

    <div className="flex items-center gap-3 mt-3">

   <Avatar
    user={user}
    size="w-12 h-12"
/>
    <div>

        <p className="font-semibold">

            {user.username}

        </p>

        <button

            onClick={() => navigate("/profile")}

            className="text-sm text-blue-300"

        >

            View Profile

        </button>

    </div>

</div>


</div>

                </div>
                <div className="mt-4">

    <input
        type="text"
        placeholder="Search conversations..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full rounded bg-slate-800 px-3 py-2 text-white placeholder-gray-400 outline-none"
    />

</div>

                <div className="flex-1 overflow-y-auto">

                    {

                        loading ?

                        (

                            <p className="p-4">

                                Loading conversations...

                            </p>

                        )

                        :

                        (

                            <ConversationList

                                conversations={filteredConversations}

                                currentUser={user}

                                selectedConversation={selectedConversation}

                                onSelect={setSelectedConversation}

                                onlineUsers={onlineUsers}

                            />

                        )

                    }

                </div>

                <div className="p-5">

                    <button

                        onClick={handleLogout}

                        className="w-full bg-red-500 hover:bg-red-600 py-3 rounded"

                    >

                        Logout

                    </button>

                </div>

            </aside>

            {/* Chat Area */}

           <main
    className={`

        flex-1
        flex
        flex-col
        bg-gray-100

        ${
            isMobile &&
            !selectedConversation
                ? "hidden"
                : "flex"
        }

    `}
>
                {

                    selectedConversation ?

                    (

                        <>

                            <ChatHeader

                                conversation={selectedConversation}

                                currentUser={user}
                                isTyping={isTyping}
                                isMobile={isMobile}
    				onBack={() => setSelectedConversation(null)}

                            />

                            <MessageList

                                messages={messages}

                                currentUser={user}

                            />

                            <MessageInput

                                onSend={handleSend}
                                onTyping={handleTypingEmit}

    				onStopTyping={handleStopTypingEmit}
    				onFileSelect={handleFileUpload}

                            />

                        </>

                    )

                    :

                    (

                        <EmptyChat />

                    )

                }

            </main>
            <NewChatModal
    show={showNewChatModal}
    users={users}
    search={userSearch}
    setSearch={setUserSearch}
    onlineUsers={onlineUsers}
    onClose={() => {
        setShowNewChatModal(false);
        setUserSearch("");
    }}
    onSelectUser={handleCreateConversation}
/>

        </div>

    );

}

export default Chat;
