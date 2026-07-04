import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

function Profile() {

    const { user } = useAuth();

    return (

        <div className="min-h-screen bg-gray-100 flex justify-center items-center">

            <div className="bg-white p-8 rounded-xl shadow-lg w-[450px]">

                <Link
                    to="/chat"
                    className="text-blue-600"
                >
                    ← Back
                </Link>

                <h1 className="text-3xl font-bold mt-4 mb-6">

                    Profile

                </h1>

                <div className="flex justify-center mb-6">

                    <img

                        src={
                            user.avatar
                                ? `http://localhost:5000${user.avatar}`
                                : "https://placehold.co/150x150?text=Avatar"
                        }

                        alt="Avatar"

                        className="w-36 h-36 rounded-full object-cover border"

                    />

                </div>

                <div className="space-y-4">

                    <div>

                        <p className="text-gray-500">

                            Username

                        </p>

                        <h2 className="text-xl">

                            {user.username}

                        </h2>

                    </div>

                    <div>

                        <p className="text-gray-500">

                            Email

                        </p>

                        <h2 className="text-xl">

                            {user.email}

                        </h2>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Profile;
