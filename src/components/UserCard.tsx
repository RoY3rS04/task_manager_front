import { TeamResponse, UserResponse } from "../@types/myTypes";
import useAuth from "../hooks/useAuth";

export default function UserCard({user, removeUser, team}: {user: UserResponse, removeUser: (user: UserResponse) => void, team: TeamResponse<UserResponse>}) {

    const { user: auth } = useAuth();

    return (
        <div className="p-2 space-y-2 rounded-lg shadow-xl border">
            <div className="flex gap-x-4 items-center">
                <div className="rounded-full overflow-hidden w-10 h-10">
                    <img className="w-full h-full object-cover object-center" src={user.image_url.split('*')[0]} alt="User image"/>
                </div>
                <div>
                    <h2 className="font-semibold">{user.name}</h2>
                </div>
            </div>
            {team.created_by.id === auth?.id ? <button onClick={() => removeUser(user)} className="px-3 text-white text-[12px] font-semibold rounded-[10px] py-2 bg-red-600 w-full" type="button">Remove User From Team</button> : null}
        </div>
    )
}