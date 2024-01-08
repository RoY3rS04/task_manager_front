import { useContext, useEffect, useState } from "react";
import { TaskResponse, UserResponse } from "../@types/myTypes";
import useAuth from "../hooks/useAuth";
import TaskUserInfo from "./TaskUserInfo";
import { TeamContext } from "../Pages/Tasks";
import clsx from "clsx";

export default function TaskCard({ task }: { task: TaskResponse<UserResponse> }) {

    const { user } = useAuth();
    const teamUsers = useContext(TeamContext);
    const [distance, setDistance] = useState(0);

    useEffect(() => {
        const btnLeftDistance = document.getElementById(`btn-${task.id}`)?.getBoundingClientRect().left;

        if (btnLeftDistance) {
            setDistance(window.innerWidth - btnLeftDistance);
        }
    })

    function generateColor() {
        let color = '#';

        for (let i = 0; i < 6; i++) {
            const num = Math.random();

            color += num === 1 ? 1 : Math.floor(num * 10);
        }

        return color;
    }

    return (
        <article className="rounded-md shadow-md p-3 relative">
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <h2 className="font-semibold text-lg">{task.title}</h2>
                    <p className="text-xs">Created by: <span className="text-sm font-medium">{task.created_by.id === (user as UserResponse).id ? 'You' : task.created_by.name}</span></p>
                </div>
                <p className="text-sm">{task.description}</p>
                <div className="flex items-center gap-x-4">
                    <div className="relative group">
                        <button type="button" className="text-white bg-blue-600 py-1 px-2 rounded-md text-sm font-semibold">Asigned Users</button>
                        <div className="rounded-sm space-y-1 absolute top-0 left-[100%] hidden shadow-md group-hover:block z-10 w-[200px]">
                            {
                                task.users?.length ?
                                    task.users.length > 0 ?
                                        task.users?.map(
                                            user => <TaskUserInfo task={task} asign={false} key={user.id} user={user}></TaskUserInfo>
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
                                        user => <TaskUserInfo task={task} asign key={user.id} user={user}></TaskUserInfo>
                                    )
                                    :
                                    <div className="p-2 bg-white">
                                        <p className="text-xs min-w-20">No users to assign.</p>
                                    </div>
                            }
                        </div>
                    </div> : null }
                </div>
            </div>
            <span style={{backgroundColor: generateColor()}} className="absolute left-0 top-0 h-1 w-full rounded-tl-md rounded-tr-md"></span>
        </article>
    )
}