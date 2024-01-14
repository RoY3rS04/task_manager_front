import { ChangeEvent, FormEvent, useState } from "react";
import useAuth from "../hooks/useAuth"
import axiosInstance from '../utils/axios';
import Alert from "../components/Alert";
import createAlert from "../helpers/createAlert";
import { AxiosError } from "axios";
import { ApiResponse, ApiUserResponse } from "../@types/myTypes";

export default function Profile() {

    const { user } = useAuth();
    const [name, setName] = useState(user?.name);
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [image, setImage] = useState(user?.image_url.split('*')[0]);
    const [alert, setAlert] = useState({msg: '', type: false, visible: false})

    function handleImageChange(e: ChangeEvent<HTMLInputElement>) {

        if (e.target.files) {
            setImage(URL.createObjectURL(e.target.files[0]));
        }

    }

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const info = new FormData(e.target as HTMLFormElement);

        try {
            const { data } = await axiosInstance.patch('/users/', info);

            createAlert(setAlert, { type: data.ok, msg: data.msg, visible: true });
        } catch (error) {
            if (error instanceof AxiosError) {
                createAlert(setAlert, {
                    type: false,
                    msg: (error.response?.data as ApiUserResponse).msg,
                    visible: true
                })
            }
        }
    }

    async function handleDelete() {
        
        try {
            const { data } = await axiosInstance.delete<ApiUserResponse>('/users', {
                headers: {
                    password
                }
            });

            localStorage.removeItem('token');
            createAlert(setAlert, { type: data.ok, visible: true, msg: data.msg });
            window.location.href = '/login';

        } catch (error) {
            if (error instanceof AxiosError) {
                createAlert(setAlert, { type: false, visible: true, msg: (error.response?.data as ApiResponse).msg }); 
            }
        }

    }

    return (
        <section className="w-full h-full flex items-center justify-center p-2">
            <div className="w-full flex flex-col items-center">
                <h1 className="text-3xl font-bold text-center mb-5">Profile</h1>
                <div className="w-[100px] h-[100px] relative">
                    <div className="overflow-hidden w-full h-full rounded-full">
                        <img className="w-full h-full object-center object-cover" src={image} alt="User Image" />
                    </div>
                    <label className="absolute bottom-0 right-3 cursor-pointer" htmlFor="image">
                        <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M149.1 64.8L138.7 96H64C28.7 96 0 124.7 0 160V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H373.3L362.9 64.8C356.4 45.2 338.1 32 317.4 32H194.6c-20.7 0-39 13.2-45.5 32.8zM256 192a96 96 0 1 1 0 192 96 96 0 1 1 0-192z"/></svg>
                    </label>
                </div>
                <form onSubmit={handleSubmit} className="space-y-5 md:w-full w-[400px]">
                    <div className="flex flex-col gap-y-2">
                        <label htmlFor="name">Name</label>
                        <input
                            id="name"
                            name="name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            className="py-2 px-3 rounded border"
                            type="text"
                        />
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <label htmlFor="password">Password</label>
                        <input 
                            id="password" 
                            name="password" 
                            value={password} 
                            onChange={e => setPassword(e.target.value)}
                            className="py-2 px-3 rounded border"
                            type="password"
                        />
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <label htmlFor="new_password">New Password</label>
                        <input
                            id="new_password"
                            name="new_password"
                            value={newPassword}
                            onChange={e => setNewPassword(e.target.value)}
                            className="py-2 px-3 rounded border"
                            type="password"
                        />
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <input
                            id="image"
                            name="image"
                            className="py-2 px-3 rounded border"
                            onChange={handleImageChange}
                            type="file"
                            hidden />
                    </div>
                    <div className="flex gap-x-3">
                        <button className="py-2 px-3 bg-blue-600 rounded-lg text-white w-full text-lg font-semibold my-2">Update Info</button>
                        <button type="button" onClick={handleDelete} className="py-2 px-3 bg-red-600 rounded-lg text-white w-full text-lg font-semibold my-2">Delete User</button>
                    </div>
                    {alert.visible ? <Alert type={alert.type} msg={alert.msg}></Alert> : null}
                </form>
            </div>
        </section>
    )
}