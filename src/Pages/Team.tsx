import { useEffect, useState } from "react"
import axiosInstance from "../utils/axios";
import { ApiResponse, ApiTeamResponse, TeamUsersResponse } from "../@types/myTypes";
import createAlert from "../helpers/createAlert";
import { AxiosError } from "axios";
import Alert from "../components/Alert";
import TeamHeader from '../components/TeamHeader';

export default function Team() {
    
    const [team, setTeam] = useState<TeamUsersResponse<number>>();
    const [alert, setAlert] = useState({ msg: '', visible: false, type: false });

    useEffect(() => {

        async function getTeam() {

            try {
                const { data } = await axiosInstance.get<ApiTeamResponse<number>>('/users/user/team');
                
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
            {alert.visible ? <Alert type={alert.type} msg={alert.msg}></Alert> : null}
        </section>
    )
}