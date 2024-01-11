import { useContext, useEffect, useState } from "react";
import { TaskResponse, UserResponse } from "../@types/myTypes";
import useAuth from "../hooks/useAuth";
import TaskUserInfo from "./TaskUserInfo";
import { TeamContext } from "../Pages/Tasks";
import { TaskContext } from "../Pages/Tasks";
import clsx from "clsx";
import { Link } from "react-router-dom";

export default function TaskCard({ task }: { task: TaskResponse<UserResponse> }) {

    const { user } = useAuth();
    const teamUsers = useContext(TeamContext);
    const [color, setColor] = useState('');
    const [distance, setDistance] = useState(0);
    const { setTaskId, setModal, completeTask } = useContext(TaskContext);

    useEffect(() => {
        const btnLeftDistance = document.getElementById(`btn-${task.id}`)?.getBoundingClientRect().left;

        if (btnLeftDistance) {
            setDistance(window.innerWidth - btnLeftDistance);
        }

        let color = '#';

        for (let i = 0; i < 6; i++) {
            const num = Math.random();

            color += num === 1 ? 1 : Math.floor(num * 10);
        }

        setColor(color);

    }, [])

    function handleOnChange() {
        completeTask(task);
    }

    return (
        <article className="rounded-md shadow-md p-3 relative">
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <div className="flex gap-x-2 items-center">
                        <h2 className="font-semibold text-lg">{task.title}</h2>
                        <input onChange={handleOnChange} style={{ accentColor: 'greenyellow' }} className="w-5 h-5" type="checkbox" checked={task.completed_at ? true : false} />
                    </div>
                    <p className="text-xs">Created by: <span className="text-sm font-medium">{task.created_by.id === (user as UserResponse).id ? 'You' : task.created_by.name}</span></p>
                </div>
                <p className="text-sm">{task.description}</p>
                <div className="flex items-center justify-between">
                    <div className="flex gap-x-4">
                        <div className="relative group">
                            <button type="button" className="text-white bg-blue-600 py-1 px-2 rounded-md text-sm font-semibold">Asigned Users</button>
                            <div className="rounded-sm space-y-1 absolute top-0 left-[100%] hidden shadow-md group-hover:block z-10 w-[200px]">
                                {
                                    task.users?.length ?
                                        task.users.length > 0 ?
                                            task.users?.map(
                                                user => <TaskUserInfo task={task} assign={false} key={user.id} user={user}></TaskUserInfo>
                                            )
                                        : null
                                        : <div className="p-2 bg-white">
                                            <p className="text-xs min-w-20">No users asigned yet.</p>
                                    </div>
                                }
                            </div>
                        </div>
                        {task.created_by.id === user?.id ? <div id={`btn-${task.id}`} className="relative group">
                            <button type="button" className="text-white bg-green-600 py-1 px-2 rounded-md text-sm font-semibold">Asign Users</button>
                            <div className={clsx('rounded-sm space-y-1 absolute hidden shadow-md group-hover:block z-10 w-[200px]', {
                                'top-0 left-[100%]': distance > 250,
                                'top-7 -left-0': distance < 250
                            })}>
                                {
                                    teamUsers.length > 0 ?
                                        teamUsers.map(
                                            user => <TaskUserInfo task={task} assign key={user.id} user={user}></TaskUserInfo>
                                        )
                                        :
                                        <div className="p-2 bg-white">
                                            <p className="text-xs min-w-20">No users to assign.</p>
                                        </div>
                                }
                            </div>
                        </div> : null}
                    </div>
                    {task.created_by.id === user?.id ? <div className="flex items-center gap-x-3">
                        <Link to={`/task/${task.id}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z" /></svg>
                        </Link>
                        <button onClick={() => { setModal(true); setTaskId(task.id) }} type="button">
                            <svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" /></svg>
                        </button>
                    </div> : null}
                </div>
            </div>
            <span style={{backgroundColor: color}} className="absolute left-0 top-0 h-1 w-full rounded-tl-md rounded-tr-md"></span>
        </article>
    )
}