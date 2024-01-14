import React, { DragEvent, createContext, useEffect, useState } from "react";
import { ApiResponse, ApiTaskResponse, ApiTasksResponse, ApiTeamResponse, TaskResponse, UserResponse } from "../@types/myTypes";
import axiosInstance from "../utils/axios";
import createAlert from "../helpers/createAlert";
import Alert from "../components/Alert";
import { AxiosError } from "axios";
import TaskCard from "../components/TaskCard";
import useAuth from "../hooks/useAuth";
import Modal from "../components/Modal";

export const TeamContext = createContext<UserResponse[]>([]);
export const TaskContext = createContext({
    assignTaskUser: (taskId: number, userId: number) => {},
    removeTaskUser: (taskId: number, userId: number) => { },
    setModal: (val: boolean) => {},
    setTaskId: (val: number) => {},
    completeTask: (task: TaskResponse<UserResponse>) => {}
});

export default function Tasks() {

    const [tasks, setTasks] = useState<TaskResponse<UserResponse>[]>();
    const [alert, setAlert] = useState({ msg: '', type: false, visible: false });
    const [teamUsers, setTeamUsers] = useState<UserResponse[]>([]);
    const [modal, setModal] = useState(false);
    const [taskId, setTaskId] = useState(0);
    const { user } = useAuth();
    const [reload, setReload] = useState(false);
    const [originalTasks, setOriginalTasks] = useState<TaskResponse<UserResponse>[]>();

    useEffect(() => {

        setReload(false);
        async function getUserTasks() {

            try {
                const { data } = await axiosInstance.get<ApiTasksResponse<UserResponse>>('/tasks', {
                    headers: {
                        with_users: true
                    }
                });

                if (data.tasks) {
                    setTasks(data.tasks);
                    setOriginalTasks(data.tasks);
                }

            } catch (error) {
                if (error instanceof AxiosError) {
                    createAlert(setAlert, {msg: (error.response?.data as ApiResponse).msg, visible: true, type: false});
                }
            }

        }

        async function getTeamUsers() {

            try {
                const { data } = await axiosInstance.get<ApiTeamResponse<UserResponse>>('/users/user/team', {
                    headers: {
                        with_users: true
                    }
                });

                if (data.team) {
                    setTeamUsers(data.team.members.filter(u => u.id !== user?.id));
                }
            } catch (error) {
                if (error instanceof AxiosError) {
                    createAlert(setAlert, {msg: (error.response?.data as ApiResponse).msg, visible: true, type: false});
                }
            }

        }

        getUserTasks();
        getTeamUsers();

    }, [reload]);

    async function assignTaskUser(taskId: number, userId: number) {

        try {
            const { data } = await axiosInstance.post<ApiResponse>('/tasks/users', {
                task_id: taskId,
                user_id: userId
            });

            createAlert(setAlert, { msg: data.msg, type: data.ok, visible: true });
            setReload(true);
        } catch (error) {
            if (error instanceof AxiosError) {
                createAlert(setAlert, { msg: (error.response?.data as ApiResponse).msg, type: false, visible: true });

            }
        }

    }

    async function removeTaskUser(taskId: number, userId: number) {
        try {
            const { data } = await axiosInstance.delete<ApiResponse>(`/tasks/${taskId}/users/${userId}`);

            createAlert(setAlert, { msg: data.msg, type: data.ok, visible: true });
            setReload(true);
        } catch (error) {
            if (error instanceof AxiosError) {
                createAlert(setAlert, { msg: (error.response?.data as ApiResponse).msg, type: false, visible: true });
            }
        }
    }

    async function deleteTask() {

        try {
            const { data } = await axiosInstance.delete<ApiTaskResponse<number>>(`/tasks/${taskId}`);

            setModal(false);
            setTaskId(0);

            createAlert(setAlert, { msg: data.msg, type: data.ok, visible: true });
            setReload(true);
        } catch (error) {
            if (error instanceof AxiosError) {
                createAlert(setAlert, { msg: (error.response?.data as ApiResponse).msg, visible: true, type: false });
            }
        }
    }

    async function completeTask(task: TaskResponse<UserResponse>) {

        const completed = !task.completed_at;

        try {
            const { data } = await axiosInstance.patch<ApiTaskResponse<number>>(`/tasks/complete/${task.id}`, {
                completed
            });

            createAlert(setAlert, { msg: data.msg, type: data.ok, visible: true });
            setReload(true);
        } catch (error) {
            if (error instanceof AxiosError) {
                createAlert(setAlert, {msg: (error.response?.data as ApiResponse).msg, type: false, visible: true})
            }
        }
    }

    function sortTasks(sortBy: string) {

        switch (sortBy) {
            case 'Done': {
                setTasks(originalTasks?.filter(task => task.completed_at));
                break;
            }
            case 'Pending': {
                setTasks(originalTasks?.filter(task => !task.completed_at));
                break;
            }
            case 'All': {
                setTasks(originalTasks);
                break;
            }
            default: {
                createAlert(setAlert, { msg: 'Invalid option', type: false, visible: true });
            }
        }

    }

    return (
        <section className="h-full p-5 space-y-10">
            <TeamContext.Provider value={teamUsers}>
                <TaskContext.Provider value={
                    {
                        assignTaskUser,
                        removeTaskUser,
                        setModal,
                        setTaskId,
                        completeTask
                    }
                }>
                    <h1 className="text-center font-bold text-2xl">Your Tasks</h1>
                    <div className="flex items-center gap-x-2">
                        <span className="text-sm font-bold">Sort by:</span>
                        <button onClick={() => sortTasks('Done')} className="py-2 px-3 rounded-md text-white font-medium text-xs bg-green-600">Done</button>
                        <button onClick={() => sortTasks('Pending')} className="py-2 px-3 rounded-md text-white font-medium text-xs bg-red-600">Pending</button>
                        <button onClick={() => sortTasks('All')} className="py-2 px-3 rounded-md text-white font-medium text-xs bg-blue-600">All</button>
                    </div>
                    {alert.visible ? <Alert type={alert.type} msg={alert.msg}></Alert> : null}
                    <div className="grid grid-cols-3 gap-4 lg:grid-cols-2 sm:flex sm:flex-col">
                        {tasks ? tasks.map(task => <TaskCard key={task.id} task={task}></TaskCard>) : null}
                    </div>
                </TaskContext.Provider>
            </TeamContext.Provider>
            {
                modal ?
                    <Modal>
                        <div className="absolute top-0 bottom-0 right-0 left-0 z-10 flex items-center justify-center">
                            <div className="p-5 shadow-xl bg-white rounded-sm relative flex gap-y-3 flex-col">
                                <h3 className="text-center text-sm font-medium">Are you sure you want to remove this task?</h3>
                                <button onClick={() => { setModal(false); setTaskId(0) }} className="rounded-full bg-white w-8 h-8 absolute -top-2 -right-2 text-red-600 font-bold border">x</button>
                                <button onClick={deleteTask} className="bg-red-600 font-medium text-white rounded-md py-2 px-3 w-full">Delete Task</button>
                            </div>
                        </div>
                    </Modal>
                : null
            }
        </section>
    )
}