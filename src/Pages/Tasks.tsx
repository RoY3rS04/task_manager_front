import { createContext, useEffect, useState } from "react";
import { ApiResponse, ApiTasksResponse, ApiTeamResponse, TaskResponse, UserResponse } from "../@types/myTypes";
import axiosInstance from "../utils/axios";
import createAlert from "../helpers/createAlert";
import Alert from "../components/Alert";
import { AxiosError } from "axios";
import TaskCard from "../components/TaskCard";
import useAuth from "../hooks/useAuth";

export const TeamContext = createContext<UserResponse[]>([]);
export const TaskContext = createContext({
    assignTaskUser: (taskId: number, userId: number) => {},
    removeTaskUser: (taskId: number, userId: number) => {}
});

export default function Tasks() {

    const [tasks, setTasks] = useState<TaskResponse<UserResponse>[]>();
    const [alert, setAlert] = useState({ msg: '', type: false, visible: false });
    const [teamUsers, setTeamUsers] = useState<UserResponse[]>([]);
    const {user} = useAuth();

    useEffect(() => {

        async function getUserTasks() {

            try {
                const { data } = await axiosInstance.get<ApiTasksResponse<UserResponse>>('/tasks', {
                    headers: {
                        with_users: true
                    }
                });

                if (data.tasks) {
                    setTasks(data.tasks);
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

    }, [alert]);

    async function assignTaskUser(taskId: number, userId: number) {

        try {
            const { data } = await axiosInstance.post<ApiResponse>('/tasks/users', {
                task_id: taskId,
                user_id: userId
            });

            createAlert(setAlert, { msg: data.msg, type: data.ok, visible: true });

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

        } catch (error) {
            if (error instanceof AxiosError) {
                createAlert(setAlert, { msg: (error.response?.data as ApiResponse).msg, type: false, visible: true });


            }
        }
    }

    return (
        <section className="p-5 space-y-10">
            <TeamContext.Provider value={teamUsers}>
                <TaskContext.Provider value={
                    {
                        assignTaskUser,
                        removeTaskUser
                    }
                }>
                    <h1 className="text-center font-bold text-2xl">Your Tasks</h1>
                    {alert.visible ? <Alert type={alert.type} msg={alert.msg}></Alert> : null}
                    <div className="grid grid-cols-3 gap-4">
                        {tasks ? tasks.map(task => <TaskCard key={task.id} task={task}></TaskCard>) : null}
                    </div>
                </TaskContext.Provider>
            </TeamContext.Provider>
        </section>
    )
}