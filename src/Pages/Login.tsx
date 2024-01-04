import { FormEvent, useState } from "react";
import axiosInstance from "../utils/axios";
import { Link } from 'react-router-dom';
import Alert from "../components/Alert";
import { ApiAuthResponse } from "../@types/myTypes";
import { AxiosError } from "axios";

export default function Login() {

    const [alertVisible, setAlertVisible] = useState(false);
    const [msg, setMsg] = useState('');
    const [alertType, setAlertType] = useState(false);

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const info = new FormData(e.target as HTMLFormElement);

        try {
            const { data } = await axiosInstance.post<ApiAuthResponse>('/users/auth/login', info);

            if (data.token) {
                localStorage.setItem('token', data.token);
            }
            
            setMsg(data.msg);
            setAlertType(data.ok);
            setAlertVisible(true);

            setTimeout(() => {
                setMsg('');
                setAlertType(false);
                setAlertVisible(false);
            }, 1500)
        } catch (error) {
            if (error instanceof AxiosError) {
                setMsg((error.response?.data as ApiAuthResponse).msg);
                setAlertType(false);
                setAlertVisible(true);

                setTimeout(() => {
                    setMsg('');
                    setAlertType(false);
                    setAlertVisible(false);
                }, 3000)
            }
        }
    }

    return (
        <main className="w-full min-h-screen flex items-center justify-center">
            <div className="space-y-5 max-w-[40%]">
                <h1 className="text-[40px] font-[Poppins] font-bold text-center">Welcome to Task Manager please login to continue</h1>
                <form onSubmit={handleSubmit} className="w-full flex flex-col gap-y-3">
                    <div className="flex flex-col gap-y-2">
                        <label htmlFor="email" className="font-medium text-lg">Email</label>
                        <input id="email" name="email" type="text" className="py-2 px-3 rounded border" />
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <label htmlFor="password" className="font-medium text-lg">Password</label>
                        <input id="password" name="password" type="password" className="py-2 px-3 rounded border" />
                    </div>
                    <button className="py-2 px-3 bg-blue-600 rounded-lg text-white w-full text-lg font-bold my-2">
                        Login
                    </button>
                </form>
                <Link to='/register'>Don't have an account yet? Click here</Link>
                {alertVisible ? <Alert type={alertType} msg={msg}></Alert> : null}
            </div>
        </main>
    )
}