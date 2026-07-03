import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as loginService } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import socket from "../socket/socket";

function Login() {

    const navigate = useNavigate();
    const auth = useAuth();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        setError("");

        try {

            const data = await loginService(formData);

	// Save authentication information
	auth.login(data.token, data.user);

	// Connect the socket
	socket.connect();

	// Authenticate the socket
	socket.emit("join", data.token);

	// Redirect to chat
	navigate("/chat");

        } catch (err) {

            setError(
                err.response?.data?.message || "Login Failed"
            );

        }

        setLoading(false);

    };

    return (

        <div className="min-h-screen flex items-center justify-center bg-slate-900">

            <form
                onSubmit={handleSubmit}
                className="bg-white rounded-xl p-8 w-96 shadow-lg"
            >

                <h1 className="text-3xl font-bold mb-6 text-center">
                    Login
                </h1>

                {error &&

                    <p className="text-red-500 mb-4">
                        {error}
                    </p>

                }

                <input

                    name="email"

                    type="email"

                    placeholder="Email"

                    className="border w-full p-3 rounded mb-4"

                    onChange={handleChange}

                />

                <input

                    name="password"

                    type="password"

                    placeholder="Password"

                    className="border w-full p-3 rounded mb-4"

                    onChange={handleChange}

                />

                <button

                    disabled={loading}

                    className="bg-blue-600 hover:bg-blue-700 text-white w-full p-3 rounded"

                >

                    {loading ? "Logging In..." : "Login"}

                </button>

                <p className="mt-4 text-center">

                    Don't have an account?

                    <Link

                        to="/register"

                        className="text-blue-600 ml-2"

                    >

                        Register

                    </Link>

                </p>

            </form>

        </div>

    );

}

export default Login;
