import { TaskResponse, UserResponse } from "../@types/myTypes";

export default function TaskCard({ task }: { task: TaskResponse<UserResponse> }) {

    function generateColor() {
        let color = '#';

        for (let i = 0; i < 6; i++) {
            const num = Math.random();

            color += num === 1 ? 1 : Math.floor(num * 10);
        }

        return color;
    }

    return (
        <article className="rounded-md shadow-md p-3 relative">
            <div className="space-y-2">
                <h2 className="font-medium text-lg">{task.title}</h2>
                <p className="text-sm">{task.description}</p>
            </div>
            <div>
                <p>Created by: {task.created_by.name}</p>
            </div>
            <span style={{backgroundColor: generateColor()}} className="absolute left-0 top-0 h-1 w-full rounded-tl-md rounded-tr-md"></span>
        </article>
    )
}