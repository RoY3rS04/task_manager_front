import { ReactNode, createContext, useEffect, useState } from "react";
import axiosInstance from "../utils/axios";
import { ApiUserResponse } from "../@types/myTypes";

const UserContext = createContext({});

const UserProvider = ({ children }: {children?: ReactNode}) => {

    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function verifyToken() {
            const token = localStorage.getItem('token');

            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const {data} = await axiosInstance.get<ApiUserResponse>('/users/auth/self');

                if (data.user) {
                    setUser(data.user);
                }

                setLoading(false);
            } catch (error) {
                setUser({});
                setLoading(false);
            }
        }

        verifyToken();
    }, [])

    return (
        <UserContext.Provider value={{user, loading}}>
            {children}
        </UserContext.Provider>
    )
}

export {
    UserProvider
}

export default UserContext;