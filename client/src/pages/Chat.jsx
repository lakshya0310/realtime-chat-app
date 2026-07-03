import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { getConversations } from "../services/conversationService";
import socket from "../socket/socket";

import ConversationList from "../components/chat/ConversationList";
import EmptyChat from "../components/chat/EmptyChat";

function Chat() {

    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const [conversations, setConversations] = useState([]);
    const [selectedConversation, setSelectedConversation] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadConversations();
    }, []);

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

    const handleLogout = () => {

        socket.disconnect();

        logout();

        navigate("/");

    };

    // Wait until auth context finishes loading
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

                    {loading ? (

                        <p className="p-4">
                            Loading conversations...
                        </p>

                    ) : (

                        <ConversationList
                            conversations={conversations}
                            currentUser={user}
                            selectedConversation={selectedConversation}
                            onSelect={setSelectedConversation}
                        />

                    )}

                </div>

                <div className="p-5">

                    <button
                        onClick={handleLogout}
                        className="bg-red-500 hover:bg-red-600 w-full py-3 rounded"
                    >
                        Logout
                    </button>

                </div>

            </aside>

            {/* Main Chat Area */}

            <main className="flex-1 bg-gray-100">

                {selectedConversation ? (

                    <div className="h-full flex items-center justify-center">

                        <h1 className="text-3xl font-semibold">
                            Conversation Selected
                        </h1>

                    </div>

                ) : (

                    <EmptyChat />

                )}

            </main>

        </div>

    );

}

export default Chat;
