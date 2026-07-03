import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../services/authService";

function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");

        if (formData.password !== formData.confirmPassword) {
            return setError("Passwords do not match");
        }

        try {

            await register({
                username: formData.username,
                email: formData.email,
                password: formData.password,
            });

            navigate("/");

        } catch (err) {

            setError(
                err.response?.data?.message || "Registration Failed"
            );

        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-900">

            <form
                onSubmit={handleSubmit}
                className="bg-white rounded-xl p-8 w-96 shadow-lg"
            >

                <h1 className="text-3xl font-bold text-center mb-6">
                    Register
                </h1>

                {error && (
                    <p className="text-red-500 mb-4">{error}</p>
                )}

                <input
                    name="username"
                    placeholder="Username"
                    className="border w-full p-3 rounded mb-3"
                    onChange={handleChange}
                />

                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    className="border w-full p-3 rounded mb-3"
                    onChange={handleChange}
                />

                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    className="border w-full p-3 rounded mb-3"
                    onChange={handleChange}
                />

                <input
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm Password"
                    className="border w-full p-3 rounded mb-5"
                    onChange={handleChange}
                />

                <button
                    className="bg-green-600 hover:bg-green-700 text-white w-full p-3 rounded"
                >
                    Register
                </button>

                <p className="text-center mt-4">
                    Already have an account?

                    <Link
                        to="/"
                        className="text-blue-600 ml-2"
                    >
                        Login
                    </Link>

                </p>

            </form>

        </div>
    );

}

export default Register;
