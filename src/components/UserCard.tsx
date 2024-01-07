import { UserResponse } from "../@types/myTypes";

export default function UserCard({user}: {user: UserResponse}) {

    console.log(user.image_url)

    return (
        <div className="p-2 space-y-2 rounded-lg border">
            <div className="flex gap-x-4 items-center">
                <div className="rounded-full overflow-hidden w-10 h-10">
                    <img className="w-full h-full" src={user.image_url.split('*')[0]} alt="User image"/>
                </div>
                <div>
                    <h2 className="font-semibold">{user.name}</h2>
                </div>
            </div>
            <button className="px-3 text-white text-[12px] font-semibold rounded-[10px] py-2 bg-red-600" type="button">Remove User From Team</button>
        </div>
    )
}