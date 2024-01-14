import { Link } from "react-router-dom";
import { TeamUsersResponse, UserResponse } from "../@types/myTypes";
import React from "react";
import useAuth from "../hooks/useAuth";

export default function TeamHeader(
    { team, setModal, setTeamId, generateLink, removeUser }:
        {
            team: TeamUsersResponse<UserResponse>,
            setModal: React.Dispatch<React.SetStateAction<boolean>>,
            setTeamId: React.Dispatch<React.SetStateAction<number>>,
            generateLink: () => void,
            removeUser: (user: UserResponse) => void
        }
) {

    const { user } = useAuth();

    return (
        <header className="w-full py-5 px-10 bg-gray-100">
            <div className="flex items-center justify-between">
                <div className="flex gap-x-5">
                    <div className="w-20 h-20 rounded-full overflow-hidden">
                        <img className="w-full h-full object-cover object-center" src={team.image_url.split('*')[0]} alt="Group Image" />
                    </div>
                    <div className="space-y-4">
                        <h1 className="font-bold text-2xl">{team.name}</h1>
                        <p>members: {team.members.length}</p>
                    </div>
                </div>
                <div className="cursor-pointer flex flex-col items-center justify-center gap-y-1 group relative w-10 h-10">
                    <div className="w-1 h-1 rounded-full bg-black"></div>
                    <div className="w-1 h-1 rounded-full bg-black"></div>
                    <div className="w-1 h-1 rounded-full bg-black"></div>
                    {
                        team.created_by.id === user?.id ?
                            <div>
                                <div className=" bg-white shadow-xl absolute top-0 -left-[300%] hidden group-hover:flex w-[150px] group-hover:flex-col group-hover:gap-y-4">
                                    <Link className="pt-4 text-xs font-medium w-full text-center" to={`/team/edit/${team.id}`}>Edit Your Group</Link>
                                    <hr />
                                    <button onClick={generateLink} className="text-blue-600 font-medium text-xs w-full">Invite to team</button>
                                    <hr />
                                    <button onClick={() => { setModal(true); setTeamId(team.id) }} className="pb-4 text-red-600 font-medium text-xs w-full">Delete Group</button>
                                </div>
                            </div>
                        :
                        <div className="bg-white shadow-xl absolute top-0 -left-[300%] hidden group-hover:flex w-[150px] group-hover:flex-col group-hover:gap-y-4">
                                <button onClick={() => {if(user) removeUser(user)}} className="py-4 text-red-600 font-medium text-xs w-full">Leave Group</button>
                        </div>
                    }
                </div>
            </div>
        </header>
    )
}