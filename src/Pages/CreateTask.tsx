import { FormEvent, useState } from "react"
import Alert from "../components/Alert"
import axiosInstance from "../utils/axios";
import { ApiResponse, ApiTaskResponse } from "../@types/myTypes";
import createAlert from "../helpers/createAlert";
import { AxiosError } from "axios";

export default function CreateTask() {

    const [alert, setAlert] = useState({ visible: false, msg: '', type: false });

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const info = new FormData(e.target as HTMLFormElement);

        try {
            const { data } = await axiosInstance.post<ApiTaskResponse<number>>('/tasks/', info);

            createAlert(setAlert, { msg: data.msg, type: data.ok, visible: true });
        } catch (error) {
            if (error instanceof AxiosError) {
                createAlert(setAlert, { msg: (error.response?.data as ApiResponse).msg, visible: true, type: false });
            }
        }
    }

    return (
        <section className="w-full h-full flex items-center justify-center p-2">
            <div className="space-y-5 sm:w-full md:w-[40%]">
                <h1 className="text-4xl font-bold text-center">Create Your Tasks!</h1>
                <form onSubmit={handleSubmit} className="w-full flex flex-col items-center gap-y-3">
                    <div className="flex flex-col gap-y-2 w-full">
                        <label htmlFor="title" className="font-medium text-lg">Title</label>
                        <input id="title" name="title" type="text" className="py-2 px-3 rounded border" />
                    </div>
                    <div className="flex flex-col gap-y-2 w-full">
                        <label htmlFor="description" className="font-medium text-lg">Description</label>
                        <textarea maxLength={255} id="description" name="description" className="py-2 px-3 rounded border max-h-[100px]">
                        </textarea>
                    </div>
                    <button className="py-2 px-3 bg-blue-600 rounded-lg text-white w-full text-lg font-bold my-2">
                        Create Task
                    </button>
                    {alert.visible ? <Alert type={alert.type} msg={alert.msg}></Alert> : null}
                </form>
            </div>
        </section>
    )
}