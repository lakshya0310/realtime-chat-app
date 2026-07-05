function Avatar({

    user,

    size = "w-10 h-10",

}) {

    if (user?.avatar) {

        return (

            <img

                src={`${import.meta.env.VITE_API_URL}${user.avatar}`}

                alt={user.username}

                className={`${size} rounded-full object-cover`}

            />

        );

    }

    const initials = user?.username
        ?.slice(0, 2)
        .toUpperCase();

    return (

        <div
            className={`${size}
                rounded-full
                bg-blue-600
                text-white
                flex
                items-center
                justify-center
                font-bold`}
        >

            {initials}

        </div>

    );

}

export default Avatar;
