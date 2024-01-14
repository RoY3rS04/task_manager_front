import { ChangeEvent, FormEvent, useState } from "react"
import axiosInstance from '../utils/axios';
import { ApiResponse, ApiTeamResponse } from "../@types/myTypes";
import createAlert from "../helpers/createAlert";
import { AxiosError } from "axios";
import Alert from "../components/Alert";

export default function CreateTeam() {

    const [image, setImage] = useState('https://ik.imagekit.io/4ztt7kzzm/default_group_image.png?updatedAt=1699391215031');

    const [alert, setAlert] = useState({ type: false, visible: false, msg: '' });

    function handleImageChange(e: ChangeEvent<HTMLInputElement>) {

        if (e.target.files) {
            setImage(URL.createObjectURL(e.target.files[0]));
        }

    }

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const info = new FormData(e.target as HTMLFormElement);

        try {
            
            const { data } = await axiosInstance.post<ApiTeamResponse<number>>('/teams', info);
        
            createAlert(setAlert, { msg: data.msg, type: data.ok, visible: true });
        } catch (error) {
            if (error instanceof AxiosError) {
                createAlert(setAlert, { msg: (error.response?.data as ApiResponse).msg, type: false, visible: true });
            }
        }

    }

    return (
        <section className="w-full h-full flex items-center justify-center p-2">
            <div className="space-y-5 sm:w-full md:w-[40%]">
                <h1 className="text-4xl font-bold text-center">Create Your Own Team!</h1>
                <form onSubmit={handleSubmit} className="w-full flex flex-col items-center gap-y-3">
                    <div className="w-[100px] h-[100px] relative">
                        <div className="overflow-hidden w-full h-full rounded-full">
                            <img src={image} alt="User Image" />
                        </div>
                        <label className="absolute bottom-0 right-3 cursor-pointer" htmlFor="image">
                            <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M149.1 64.8L138.7 96H64C28.7 96 0 124.7 0 160V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H373.3L362.9 64.8C356.4 45.2 338.1 32 317.4 32H194.6c-20.7 0-39 13.2-45.5 32.8zM256 192a96 96 0 1 1 0 192 96 96 0 1 1 0-192z"/></svg>
                        </label>
                    </div>
                    <div className="flex flex-col gap-y-2 w-full">
                        <label htmlFor="name" className="font-medium text-lg">Name</label>
                        <input id="name" name="name" type="text" className="py-2 px-3 rounded border" />
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
                    <button className="py-2 px-3 bg-blue-600 rounded-lg text-white w-full text-lg font-bold my-2">
                        Create Team
                    </button>
                    {alert.visible ? <Alert type={alert.type} msg={alert.msg}></Alert> : null}
                </form>
            </div>
        </section>
    )
}