import { UserResponse } from "../@types/myTypes";

export default function TaskUserInfo({user, styles}: {user: UserResponse, styles?: string}) {

    return (
        <div className="border-b-[1px] bg-white border-gray-200 p-2 flex items-center gap-x-3">
            <div className="w-8 h-8 rounded-full overflow-hidden">
                <img className="w-full h-full object-cover object-center" src={user?.image_url.split('*')[0]} alt="User image" />
            </div>
            <span className="font-medium text-sm">{user?.name}</span>
        </div>
    )
}