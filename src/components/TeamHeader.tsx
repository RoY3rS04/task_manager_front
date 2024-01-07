import { TeamUsersResponse, UserResponse } from "../@types/myTypes";

export default function TeamHeader({ info }: { info: TeamUsersResponse<UserResponse> }) {

    return (
        <header className="w-full p-5 bg-gray-100">
            <div className="flex gap-x-5">
                <div className="w-20 h-20 rounded-full overflow-hidden">
                    <img className="w-full h-full object-cover object-center" src={info.image_url.split('*')[0]} alt="Group Image" />
                </div>
                <div className="space-y-4">
                    <h1 className="font-bold text-2xl">{info.name}</h1>
                    <p>members: {info.members.length}</p>
                </div>
            </div>
        </header>
    )
}