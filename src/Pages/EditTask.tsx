import { FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import axiosInstance from "../utils/axios";
import { ApiResponse, ApiTaskResponse, TaskResponse } from "../@types/myTypes";
import { AxiosError } from "axios";
import createAlert from "../helpers/createAlert";
import Alert from "../components/Alert";

export default function EditTask() {

    const { id } = useParams();
    const [task, setTask] = useState<TaskResponse<number>>();
    const [alert, setAlert] = useState({ msg: '', type: false, visible: false });
    const [info, setInfo] = useState({ description: '', title: '' });

    useEffect(() => {

        const getTask = async () => {

            try {
                const { data } = await axiosInstance.get<ApiTaskResponse<number>>(`/tasks/${id}`);

                if (data.task) {
                    setTask(data.task);
                    setInfo({ title: data.task.title, description: data.task.description });
                }
            } catch (error) {
                if (error instanceof AxiosError) {
                    createAlert(setAlert, {msg: (error.response?.data as ApiResponse).msg, type: false, visible: true})
                }
            }

        }

        getTask();
    }, [])

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        try {
            const { data } = await axiosInstance.patch<ApiTaskResponse<number>>(`/tasks/${id}`, info);

            await createAlert(setAlert, { msg: data.msg, visible: true, type: data.ok });

            location.href = '/tasks';
        } catch (error) {
            if (error instanceof AxiosError) {
                createAlert(setAlert, { msg: (error.response?.data as ApiResponse).msg, visible: true, type: false });
            }
        }
    }

    return (
        <section className="flex items-center justify-center h-full">
            <div className="w-[50%] space-y-5">
                <h1 className="text-4xl font-bold text-center">Update Your Task</h1>
                <form onSubmit={handleSubmit} className="w-full flex flex-col items-center gap-y-3">
                    <div className="flex flex-col gap-y-2 w-full">
                        <label htmlFor="title" className="font-medium text-lg">Title</label>
                        <input onChange={(e) => setInfo({description: info.description, title: e.target.value})} id="title" name="title" type="text" className="py-2 px-3 rounded border" value={info.title}/>
                    </div>
                    <div className="flex flex-col gap-y-2 w-full">
                        <label htmlFor="description" className="font-medium text-lg">Description</label>
                        <textarea onChange={(e) => setInfo({description: e.target.value, title: info.title})} maxLength={255} id="description" name="description" className="py-2 px-3 rounded border max-h-[100px]" value={info.description}>
                        </textarea>
                    </div>
                    <button className="py-2 px-3 bg-blue-600 rounded-lg text-white w-full text-lg font-bold my-2">
                        Update Task
                    </button>
                    {alert.visible ? <Alert type={alert.type} msg={alert.msg}></Alert> : null}
                </form>
            </div>
        </section>
    )
}