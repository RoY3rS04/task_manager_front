import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { Link, Navigate, Outlet } from "react-router-dom";
import clsx from "clsx";
import Navigation from "../components/Navigation";

export default function Protected() {

    const { user, loading } = useAuth();
    const [subTeamMenu, setSubTeamMenu] = useState(false);
    const [subTaskMenu, setSubTaskMenu] = useState(false);
    const [menu, setMenu] = useState(false);

    if (loading) {
        return 'Loading...';
    }

    return (
        <>
            {
                user?.id ?
                    <main className="h-screen w-screen flex">
                        <div className={clsx('bg-black h-full w-full absolute top-0 left-0 z-10', {
                            'opacity-0 hidden': !menu,
                            'opacity-30 block': menu
                        })}>

                        </div>
                        <div onClick={() => setMenu(true)} className="space-y-1 md:block hidden absolute top-4 left-4 cursor-pointer">
                            <div className="h-1 rounded-sm w-5 bg-gray-500"></div>
                            <div className="h-1 rounded-sm w-5 bg-gray-500"></div>
                            <div className="h-1 rounded-sm w-5 bg-gray-500"></div>
                        </div>
                        <aside className="w-[20%] h-full border-r-[0.5px] border-gray-200 flex flex-col items-center space-y-10 p-2 md:hidden">
                            <Navigation teamMenuState={{subTeamMenu, setSubTeamMenu}} taskMenuState={{subTaskMenu, setSubTaskMenu}}></Navigation>
                        </aside>
                        <div className="flex-1 h-full">
                            <Outlet></Outlet>
                        </div>
                        {menu ?
                                    <div className="bg-white absolute top-0 left-0 z-10 w-[300px] flex flex-col gap-y-4 p-4 items-center h-screen">
                                        <Navigation teamMenuState={{ subTeamMenu, setSubTeamMenu }} taskMenuState={{ subTaskMenu, setSubTaskMenu }}>
                                            <button onClick={() => setMenu(false)} type="button" className="text-2xl font-bold text-red-600 absolute top-0 right-2">x</button>
                                        </Navigation>
                                    </div>
                            : null
                        }
                    </main>
                : <Navigate to='/login'></Navigate>
            }
        </>
    )
}