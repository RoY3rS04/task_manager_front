import { TaskResponse, UserResponse } from "../@types/myTypes";
import useAuth from "../hooks/useAuth";

export default function TaskUserInfo({user, asign = true, task}: {user: UserResponse, asign: boolean, task: TaskResponse<UserResponse>}) {

    const {user: auth} = useAuth();

    return (
        <div className="w-full border-b-[1px] bg-white border-gray-200 p-2 flex items-center gap-x-3">
            <div className="min-w-6 max-w-8 min-h-6 max-h-8 rounded-full overflow-hidden">
                <img className="w-full h-full object-cover object-center" src={user?.image_url.split('*')[0]} alt="User image" />
            </div>
            <span className="font-medium text-sm">{user?.name}</span>
            {
                asign ?
                    !task?.users?.map(u => u.id).includes(user.id) ?
                        <button className="py-1 px-2 text-white rounded-sm text-xs bg-orange-400">Asign User</button>
                        : <span className="text-xs">Already assigned</span>
                    : task.created_by.id === auth?.id ? <button className="py-1 px-2 text-white rounded-sm text-xs bg-red-500 flex-1">Remove from Task</button> : null
            }
        </div>
    )
}