import { useEffect, useState } from "react"
import axiosInstance from "../utils/axios";
import { ApiResponse, ApiTeamResponse, TeamUsersResponse, UserResponse } from "../@types/myTypes";
import createAlert from "../helpers/createAlert";
import { AxiosError } from "axios";
import Alert from "../components/Alert";
import TeamHeader from '../components/TeamHeader';
import UserCard from '../components/UserCard';

export default function Team() {
    
    const [team, setTeam] = useState<TeamUsersResponse<UserResponse>>();
    const [alert, setAlert] = useState({ msg: '', visible: false, type: false });

    useEffect(() => {

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

                console.log(data);

            } catch (error) {
                if (error instanceof AxiosError) {
                    createAlert(setAlert, {visible: true, msg: (error.response?.data as ApiResponse).msg, type: false});
                }
            }

        }

        getTeam();
    }, [])

    return (
        <section>
            {team ? <TeamHeader info={team}></TeamHeader> : null}
            <div className="grid grid-cols-4 gap-3 p-3">
                {
                    team ? team.members
                        .map(user =>
                            user.id !== team.created_by.id ? <UserCard key={user.id} user={user}></UserCard>
                            : null)
                        : null
                }
            </div>
            {alert.visible ? <Alert type={alert.type} msg={alert.msg}></Alert> : null}
        </section>
    )
}