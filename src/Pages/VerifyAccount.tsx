import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import axiosInstance from "../utils/axios";
import Alert from "../components/Alert";
import { ApiResponse } from "../@types/myTypes";
import { AxiosError } from "axios";
import createAlert from "../helpers/createAlert";

export default function VerifyAccount() {
    
    const { token } = useParams();
    const [alert, setAlert] = useState({type: false, msg: '', visible: false});

    useEffect(() => {

        async function verify() {

            try {
            
                const { data } = await axiosInstance.get<ApiResponse>(`/users/auth/confirm/${token}`);

                createAlert(setAlert, { msg: data.msg, type: data.ok, visible: true });
            } catch (error) {
                
                if (error instanceof AxiosError) {
                    createAlert(setAlert, {
                        msg: (error.response?.data as ApiResponse).msg,
                        type: false,
                        visible: true
                    });
                }
            }
        }

        verify();

    }, []);

    return (
        <main className="w-full h-screen flex justify-around items-center p-4">
            <h1 className="text-5xl font-[Poppins] font-bold text-blue-700">Task Manager</h1>
            <div>
                <p className="font-[Poppins] text-lg">Verifying your account...</p>
                {alert.visible ? <Alert type={alert.type} msg={alert.msg}></Alert> : null} 
            </div>
        </main>
    )
}