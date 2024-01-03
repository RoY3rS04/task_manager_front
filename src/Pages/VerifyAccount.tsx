import { useEffect } from "react"
import { useParams } from "react-router-dom";
import axiosInstance from "../utils/axios";

export default function VerifyAccount() {
    
    const { token } = useParams();

    useEffect(() => {

        async function verify() {

            try {
            
                const {data} = await axiosInstance.get(`/users/auth/confirm/${token}`);

                console.log(data);
            } catch (error) {
                console.log(error);
            }
        }

        verify();

    });

    return (
        <main className="w-full h-screen flex justify-around items-center p-4">
            <h1 className="text-5xl font-[Poppins] font-bold text-blue-700">Task Manager</h1>
            <div>
                <p className="font-[Poppins] text-lg">Verifying your account...</p>
            </div>
        </main>
    )
}