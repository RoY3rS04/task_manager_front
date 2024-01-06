import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { Link, Navigate, Outlet } from "react-router-dom";
import clsx from "clsx";

export default function Protected() {

    const { user, loading } = useAuth();
    const [subTeamMenu, setSubTeamMenu] = useState(false);
    const [subTaskMenu, setSubTaskMenu] = useState(false);

    if (loading) {
        return 'Loading...';
    }

    return (
        <>
            {
                user?.id ?
                    <main className="h-screen w-screen flex">
                        <aside className="w-[20%] h-full border-r-[0.5px] border-gray-200 flex flex-col items-center space-y-10 p-2">
                            <h2 className="font-bold text-xl text-blue-600">Task Manager</h2>
                            <nav>
                                <ul className="space-y-10 flex flex-col items-center">
                                    <li className="flex gap-x-3 items-center hover:text-blue-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512"><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/></svg>
                                        <Link className="font-medium" to='/profile'>Profile</Link>
                                    </li>
                                    <li className="space-y-5">
                                        <div className="flex gap-x-3 items-center group/main">
                                            <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M152.1 38.2c9.9 8.9 10.7 24 1.8 33.9l-72 80c-4.4 4.9-10.6 7.8-17.2 7.9s-12.9-2.4-17.6-7L7 113C-2.3 103.6-2.3 88.4 7 79s24.6-9.4 33.9 0l22.1 22.1 55.1-61.2c8.9-9.9 24-10.7 33.9-1.8zm0 160c9.9 8.9 10.7 24 1.8 33.9l-72 80c-4.4 4.9-10.6 7.8-17.2 7.9s-12.9-2.4-17.6-7L7 273c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l22.1 22.1 55.1-61.2c8.9-9.9 24-10.7 33.9-1.8zM224 96c0-17.7 14.3-32 32-32H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H256c-17.7 0-32-14.3-32-32zm0 160c0-17.7 14.3-32 32-32H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H256c-17.7 0-32-14.3-32-32zM160 416c0-17.7 14.3-32 32-32H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H192c-17.7 0-32-14.3-32-32zM48 368a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/></svg>
                                            <button onClick={() => setSubTaskMenu(prev => !prev)} className="font-medium group-hover/main:text-blue-600">Tasks</button>
                                        </div>
                                        <div className={clsx('flex flex-col gap-y-3',{'hidden': !subTaskMenu})}>
                                            <Link className="text-sm group flex gap-x-2 items-center" to='/tasks'><span className="group-hover:text-blue-600 font-bold text-xl">{'->'}</span> Your Tasks</Link>
                                            <Link className="text-sm group flex gap-x-2 items-center" to='/tasks/create'><span className="group-hover:text-blue-600 font-bold text-xl">{'->'}</span> Create Task</Link>
                                        </div>
                                    </li>
                                    <li className="space-y-5">
                                        <div className="flex gap-x-3 items-center group/main">
                                            <svg xmlns="http://www.w3.org/2000/svg" height="16" width="20" viewBox="0 0 640 512"><path d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192h42.7c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0H21.3C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7h42.7C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3H405.3zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3C128 411.7 187.7 352 261.3 352H378.7C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7H154.7c-14.7 0-26.7-11.9-26.7-26.7z"/></svg>
                                            <button onClick={() => setSubTeamMenu(prev => !prev)} className="font-medium group-hover/main:text-blue-600">TeamWork</button>
                                        </div>
                                        <div className={clsx('flex flex-col gap-y-3',{'hidden': !subTeamMenu})}>
                                            <Link className="group text-sm flex gap-x-2 items-center" to='/team'><span className="group-hover:text-blue-600 font-bold text-xl">{'->'}</span> Your TeamWork</Link>
                                            <Link className="text-sm group flex gap-x-2 items-center" to='/team/create'><span className="group-hover:text-blue-600 font-bold text-xl">{'->'}</span> Create TeamWork</Link>
                                        </div>
                                    </li>
                                </ul>
                            </nav>
                        </aside>
                        <div className="flex-1 h-full">
                            <Outlet></Outlet>
                        </div>
                    </main>
                : <Navigate to='/login'></Navigate>
            }
        </>
    )
}