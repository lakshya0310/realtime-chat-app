import Avatar from "../common/Avatar";

function NewChatModal({

    show,

    users,

    search,

    setSearch,

    onlineUsers,

    onClose,

    onSelectUser,

}) {

    if (!show) return null;

    const filteredUsers = users.filter((user) =>
        user.username
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    return (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

            <div className="bg-white rounded-xl p-6 w-[420px] max-h-[500px] flex flex-col">

                <h2 className="text-2xl font-bold mb-4">

                    Start New Chat

                </h2>

                <input

                    type="text"

                    placeholder="Search users..."

                    value={search}

                    onChange={(e) =>
                        setSearch(e.target.value)
                    }

                    className="border rounded px-3 py-2 mb-4 outline-none"

                />

                <div className="flex-1 overflow-y-auto">

                    {

                        filteredUsers.length === 0 ? (

                            <p className="text-gray-500">

                                No users found

                            </p>

                        ) : (

                            filteredUsers.map((userItem) => (

                                <div

                                    key={userItem._id}

                                    onClick={() =>
                                        onSelectUser(userItem)
                                    }

                                    className="flex items-center justify-between p-3 hover:bg-gray-100 rounded cursor-pointer"

                                >

                                    <div className="flex items-center gap-3">

                                        <Avatar
                                            user={userItem}
                                            size="w-10 h-10"
                                        />

                                        <div>

                                            <p className="font-semibold">

                                                {userItem.username}

                                            </p>

                                            <p className="text-sm text-gray-500">

                                                {userItem.email}

                                            </p>

                                        </div>

                                    </div>

                                    <span
                                        className={`w-3 h-3 rounded-full ${
                                            onlineUsers.includes(userItem._id)
                                                ? "bg-green-500"
                                                : "bg-gray-400"
                                        }`}
                                    />

                                </div>

                            ))

                        )

                    }

                </div>

                <button

                    onClick={onClose}

                    className="mt-5 bg-red-500 text-white py-2 rounded"

                >

                    Close

                </button>

            </div>

        </div>

    );

}

export default NewChatModal;
