import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const storedUser = localStorage.getItem("user");

	if (storedUser) {
    		setUser(JSON.parse(storedUser));
		}

        setLoading(false);

    }, []);

    const login = (token, userData) => {

        const user = {
    	...userData,
    	token,
};

	localStorage.setItem("token", token);
	localStorage.setItem("user", JSON.stringify(user));

	setUser(user);
    };

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setUser(null);

    };

    return (

        <AuthContext.Provider
            value={{
                user,
                login,
                logout,
                loading,
            }}
        >
            {children}
        </AuthContext.Provider>

    );

}

export const useAuth = () => useContext(AuthContext);
