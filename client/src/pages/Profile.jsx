import { useState } from "react";
import { uploadAvatar } from "../services/profileService";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import Avatar from "../components/common/Avatar";

function Profile() {

    const { user, updateUser } = useAuth();

    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);

    const handleUpload = async () => {

        if (!file) return;

        const formData = new FormData();

        formData.append("avatar", file);

        try {

            setUploading(true);

            const updatedUser =
                await uploadAvatar(formData);

            updateUser(updatedUser);

            alert("Avatar updated!");

            setFile(null);

        } catch (err) {

            console.error(err);

            alert("Upload failed");

        } finally {

            setUploading(false);

        }

    };

    return (

        <div className="min-h-screen bg-gray-100 flex justify-center items-center">

            <div
                className="
                    bg-white
                    rounded-xl
                    shadow-lg

                    w-full
                    max-w-md

                    mx-4

                    p-6
                    md:p-8
                "
            >

                <Link
                    to="/chat"
                    className="
                        text-blue-600
                        text-sm
                        md:text-base
                        hover:underline
                    "
                >
                    ← Back
                </Link>

                <h1 className="text-2xl md:text-3xl font-bold mt-4 mb-6">

                    Profile

                </h1>

                <div className="flex justify-center mb-6">

                    <Avatar
                        user={user}
                        size="w-28 h-28 md:w-36 md:h-36"
                    />

                </div>

                <div className="mb-6">

                    <input
                        type="file"
                        accept="image/*"
                        className="w-full text-sm"
                        onChange={(e) => {

                            setFile(e.target.files[0]);

                        }}
                    />

                    <button
                        onClick={handleUpload}
                        disabled={!file || uploading}
                        className="
                            mt-4
                            w-full

                            bg-blue-600
                            hover:bg-blue-700

                            text-white

                            py-2
                            md:py-3

                            rounded-lg

                            text-sm
                            md:text-base

                            disabled:bg-gray-400
                            disabled:cursor-not-allowed
                        "
                    >

                        {

                            uploading

                                ? "Uploading..."

                                : "Upload Avatar"

                        }

                    </button>

                </div>

                <div className="space-y-5">

                    <div>

                        <p className="text-gray-500">

                            Username

                        </p>

                        <h2 className="text-lg md:text-xl break-all">

                            {user.username}

                        </h2>

                    </div>

                    <div>

                        <p className="text-gray-500">

                            Email

                        </p>

                        <h2 className="text-lg md:text-xl break-all">

                            {user.email}

                        </h2>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Profile;
