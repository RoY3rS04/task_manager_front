import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import axiosInstance from "../utils/axios";
import { ApiResponse, ApiTeamResponse, TeamResponse } from "../@types/myTypes";
import { AxiosError } from "axios";
import createAlert from "../helpers/createAlert";
import Alert from "../components/Alert";

export default function EditTeam() {

    const { id } = useParams();
    const [team, setTeam] = useState<TeamResponse<number>>();
    const [alert, setAlert] = useState({ msg: '', type: false, visible: false });
    const [info, setInfo] = useState({ name: '', img_url: '' });

    useEffect(() => {

        const getTeam = async () => {

            try {
                const { data } = await axiosInstance.get<ApiTeamResponse<number>>(`/teams/${id}`, {
                    headers: {
                        with_users: false
                    }
                });

                if (data.team) {
                    setTeam(data.team);
                    setInfo({ name: data.team.name, img_url: data.team.image_url.split('*')[0] });
                }
            } catch (error) {
                if (error instanceof AxiosError) {
                    createAlert(setAlert, {msg: (error.response?.data as ApiResponse).msg, type: false, visible: true})
                }
            }

        }

        getTeam();
    }, [])

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const info = new FormData(e.target as HTMLFormElement)

        try {
            const { data } = await axiosInstance.patch<ApiTeamResponse<number>>(`/teams/${id}`, info);

            await createAlert(setAlert, { msg: data.msg, visible: true, type: data.ok });

            location.href = '/team';
        } catch (error) {
            if (error instanceof AxiosError) {
                createAlert(setAlert, { msg: (error.response?.data as ApiResponse).msg, visible: true, type: false });
            }
        }
    }

    function handleImageChange(e: ChangeEvent<HTMLInputElement>) {

        if (e.target.files) {
            setInfo({img_url: URL.createObjectURL(e.target.files[0]), name: info.name });
        }

    }

    return (
        <section className="flex items-center justify-center h-full">
            <div className="w-[50%] space-y-5">
                <h1 className="text-4xl font-bold text-center">Update Your Team</h1>
                <form onSubmit={handleSubmit} className="w-full flex flex-col items-center gap-y-3">
                    <div className="w-[100px] h-[100px] relative">
                        <div className="overflow-hidden w-full h-full rounded-full">
                            <img className="w-full h-full object-cover object-center" src={info.img_url} alt="User Image" />
                        </div>
                        <label className="absolute bottom-0 right-3 cursor-pointer" htmlFor="image">
                            <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M149.1 64.8L138.7 96H64C28.7 96 0 124.7 0 160V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H373.3L362.9 64.8C356.4 45.2 338.1 32 317.4 32H194.6c-20.7 0-39 13.2-45.5 32.8zM256 192a96 96 0 1 1 0 192 96 96 0 1 1 0-192z"/></svg>
                        </label>
                    </div>
                    <div className="flex flex-col gap-y-2 w-full">
                        <label htmlFor="name" className="font-medium text-lg">Name</label>
                        <input onChange={(e) => setInfo({img_url: info.img_url, name: e.target.value})} id="name" name="name" type="text" className="py-2 px-3 rounded border" value={info.name}/>
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
                        Update Team
                    </button>
                    {alert.visible ? <Alert type={alert.type} msg={alert.msg}></Alert> : null}
                </form>
            </div>
        </section>
    )
}