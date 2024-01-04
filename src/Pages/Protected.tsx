import useAuth from "../hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

export default function Protected() {

    const { user, loading } = useAuth();

    if (loading) {
        return 'Loading...';
    }

    return (
        <>
            {
                user?.id ?
                    <main>
                        hi
                        <Outlet></Outlet>
                    </main>
                : <Navigate to='/login'></Navigate>
            }
        </>
    )
}