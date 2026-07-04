import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

import { getConversations } from "../services/conversationService";
import { getMessages } from "../services/messageService";

import socket from "../socket/socket";

import ConversationList from "../components/chat/ConversationList";
import EmptyChat from "../components/chat/EmptyChat";
import ChatHeader from "../components/chat/ChatHeader";
import MessageList from "../components/chat/MessageList";
import MessageInput from "../components/chat/MessageInput";

function Chat() {

    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const [conversations, setConversations] = useState([]);
    const [selectedConversation, setSelectedConversation] = useState(null);
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [isTyping, setIsTyping] = useState(false);

    // Load conversations
    useEffect(() => {
        loadConversations();
    }, []);

    // Load messages
    useEffect(() => {

        if (!selectedConversation) return;

        loadMessages();

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
                        lastMessage: message,
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

socket.on("typing", handleTyping);
socket.on("stopTyping", handleStopTyping);
        socket.on("receiveMessage", handleReceiveMessage);
        socket.on("messageSent", handleMessageSent);
        socket.on("onlineUsers", handleOnlineUsers);

        return () => {

            socket.off("receiveMessage", handleReceiveMessage);
            socket.off("messageSent", handleMessageSent);
            socket.off("onlineUsers", handleOnlineUsers);
            socket.off("typing", handleTyping);
	    socket.off("stopTyping", handleStopTyping);

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

            <aside className="w-80 bg-slate-900 text-white flex flex-col">

                <div className="p-5 border-b border-slate-700">

                    <h1 className="text-3xl font-bold">

                        Chats

                    </h1>

                    <p className="mt-2 text-gray-300">

                        Welcome, {user.username}

                    </p>

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

                                conversations={conversations}

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

            <main className="flex-1 flex flex-col bg-gray-100">

                {

                    selectedConversation ?

                    (

                        <>

                            <ChatHeader

                                conversation={selectedConversation}

                                currentUser={user}
                                isTyping={isTyping}

                            />

                            <MessageList

                                messages={messages}

                                currentUser={user}

                            />

                            <MessageInput

                                onSend={handleSend}
                                onTyping={handleTypingEmit}

    				onStopTyping={handleStopTypingEmit}

                            />

                        </>

                    )

                    :

                    (

                        <EmptyChat />

                    )

                }

            </main>

        </div>

    );

}

export default Chat;
