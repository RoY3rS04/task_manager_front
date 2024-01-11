import { useEffect, useState } from "react";
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

    useEffect(() => {

        const getTask = async () => {

            try {
                const { data } = await axiosInstance.get<ApiTaskResponse<number>>(`/tasks/${id}`);

                if (data.task) {
                    setTask(data.task);
                }

                console.log(data.task);
            } catch (error) {
                if (error instanceof AxiosError) {
                    createAlert(setAlert, {msg: (error.response?.data as ApiResponse).msg, type: false, visible: true})
                }
            }

        }

        getTask();
    }, [])

    return (
        <div>
            {task ? Object.values(task).map(val => val) : null}
            {alert.visible ? <Alert msg={alert.msg} type={alert.type}></Alert> : null}
        </div>
    )
}