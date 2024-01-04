import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import axiosInstance from "../utils/axios";
import Alert from "../components/Alert";
import { ApiResponse } from "../@types/myTypes";
import { AxiosError } from "axios";

export default function VerifyAccount() {
    
    const { token } = useParams();
    const [alertVisible, setAlertVisible] = useState(false);
    const [msg, setMsg] = useState('');
    const [alertType, setAlertType] = useState(false);

    useEffect(() => {

        async function verify() {

            try {
            
                const { data } = await axiosInstance.get<ApiResponse>(`/users/auth/confirm/${token}`);
                
                setAlertType(data.ok);
                setMsg(data.msg);
                setAlertVisible(true);

                setTimeout(() => {
                    setAlertType(false);
                    setMsg('');
                    setAlertVisible(false);
                }, 3000)

            } catch (error) {
                
                if (error instanceof AxiosError) {
                    setAlertType(false);
                    setMsg((error.response?.data as ApiResponse).msg);
                    setAlertVisible(true);

                    setTimeout(() => {
                        setAlertType(false);
                        setMsg('');
                        setAlertVisible(false);
                    }, 3000)
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
                {alertVisible ? <Alert type={alertType} msg={msg}></Alert> : null} 
            </div>
        </main>
    )
}