import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import axiosInstance from "../utils/axios";
import { ApiResponse } from "../@types/myTypes";
import { AxiosError } from "axios";
import createAlert from "../helpers/createAlert";
import Alert from "../components/Alert";

export default function JoinToTeam() {

    const { token } = useParams();
    const [alert, setAlert] = useState({ msg: '', visible: false, type: false });

    useEffect(() => {

        async function joinToTeam() {

            try {
                const { data } = await axiosInstance.post<ApiResponse>(`/teams/${token}/users`);

                await createAlert(setAlert, { msg: data.msg, type: data.ok, visible: true });

                location.href = '/team';
            } catch (error) {
                if (error instanceof AxiosError) {
                    createAlert(setAlert, { msg: (error.response?.data as ApiResponse).msg, type: false, visible: true });
                }
            }

        }

        joinToTeam();

    }, [])

    return (
        <section className="p-4 space-y-5">
            <h2 className="text-2xl font-medium text-center">Joining to team...</h2>
            {alert.visible ? <Alert msg={alert.msg} type={alert.type}></Alert> : null}
        </section>
    )
}