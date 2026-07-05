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

            <div
    className="
        bg-white
        rounded-xl

        w-[95%]
        max-w-md

        max-h-[80vh]

        p-4
        md:p-6

        flex
        flex-col
    "
>

                <h2 className="text-xl md:text-2xl font-bold mb-4">

                    Start New Chat

                </h2>

                <input

                    type="text"

                    placeholder="Search users..."

                    value={search}

                    onChange={(e) =>
                        setSearch(e.target.value)
                    }

                    className="
    border
    rounded-lg

    px-3
    py-2

    text-sm
    md:text-base

    mb-4

    outline-none
"

                />

                <div
    className="
        flex-1
        overflow-y-auto

        space-y-1
    "
>

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

                                    className="
    flex
    items-center
    justify-between

    p-3
    md:p-4

    rounded-lg

    hover:bg-gray-100

    cursor-pointer

    transition
"

                                >

                                    <div className="flex items-center gap-3">

                                        <Avatar
                                            user={userItem}
                                            size="w-10 h-10 md:w-12 md:h-12"
                                        />

                                        <div>

                                            <p className="font-semibold text-sm md:text-base">

                                                {userItem.username}

                                            </p>

                                            <p className="text-xs md:text-sm text-gray-500 break-all">

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

                    className="
    mt-5

    bg-red-500
    hover:bg-red-600

    text-white

    py-2
    md:py-3

    rounded-lg

    text-sm
    md:text-base
"

                >

                    Close

                </button>

            </div>

        </div>

    );

}

export default NewChatModal;
