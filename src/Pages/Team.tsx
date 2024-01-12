import { useEffect, useState } from "react"
import axiosInstance from "../utils/axios";
import { ApiResponse, ApiTeamResponse, TeamUsersResponse, UserResponse } from "../@types/myTypes";
import createAlert from "../helpers/createAlert";
import { AxiosError } from "axios";
import Alert from "../components/Alert";
import TeamHeader from '../components/TeamHeader';
import UserCard from '../components/UserCard';
import Modal from "../components/Modal";

export default function Team() {
    
    const [team, setTeam] = useState<TeamUsersResponse<UserResponse>>();
    const [alert, setAlert] = useState({ msg: '', visible: false, type: false });
    const [modal, setModal] = useState(false);
    const [teamId, setTeamId] = useState(0);
    const [reload, setReload] = useState(false);

    useEffect(() => {

        setReload(false);
        async function getTeam() {

            try {
                const { data } = await axiosInstance.get<ApiTeamResponse<UserResponse>>('/users/user/team', {
                    headers: {
                        with_users: true
                    }
                });
                
                if (data.team) {
                    setTeam(data.team);
                }

            } catch (error) {
                if (error instanceof AxiosError) {
                    createAlert(setAlert, {visible: true, msg: (error.response?.data as ApiResponse).msg, type: false});
                }
            }

        }

        getTeam();
    }, [reload])

    async function deleteTeam() {

        try {
            const { data } = await axiosInstance.delete<ApiResponse>(`/teams/${teamId}`);

            createAlert(setAlert, { msg: data.msg, type: data.ok, visible: true });

            setModal(false);
            setReload(true);
            setTeam(undefined);
        } catch (error) {
            if (error instanceof AxiosError) {
                createAlert(setAlert, { msg: (error.response?.data as ApiResponse).msg, type: false, visible: true });
            }
        }

    }

    return (
        <section>
            {team ? <TeamHeader info={team} setModal={setModal} setTeamId={setTeamId}></TeamHeader> : null}
            <div className="grid grid-cols-4 gap-3 p-3">
                {
                    team ? team.members
                        .map(user =>
                            user.id !== team.created_by.id ? <UserCard key={user.id} user={user}></UserCard>
                            : null)
                        : null
                }
            </div>
            {
                modal ?
                    <Modal>
                        <div className="absolute top-0 bottom-0 right-0 left-0 z-10 flex items-center justify-center">
                            <div className="p-5 shadow-xl bg-white rounded-sm relative flex gap-y-3 flex-col">
                                <h3 className="text-center font-medium">Are you sure you want to remove this team?</h3>
                                <button onClick={() => { setModal(false); setTeamId(0) }} className="rounded-full bg-white w-8 h-8 absolute -top-2 -right-2 text-red-600 font-bold border">x</button>
                                <button onClick={deleteTeam} className="bg-red-600 font-medium text-white rounded-md py-2 px-3 w-full">Delete Team</button>
                            </div>
                        </div>
                    </Modal>
                : null
            }
            {alert.visible ? <Alert type={alert.type} msg={alert.msg}></Alert> : null}
        </section>
    )
}