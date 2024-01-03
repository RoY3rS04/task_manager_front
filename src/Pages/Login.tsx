import { FormEvent } from "react";
import axiosInstance from "../utils/axios";

export default function Login() {

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const info = new FormData(e.target as HTMLFormElement);

        const {data} = await axiosInstance.post('/users/auth/login', info);

        console.log(data);
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
                    <button className="py-2 px-3 bg-blue-600 rounded-lg text-white w-full text-lg font-bold mt-2">
                        Login
                    </button>
                </form>
            </div>
        </main>
    )
}