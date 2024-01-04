import useAuth from "../hooks/useAuth"

export default function Home() {

    const {user} = useAuth();

    return (
        <div className="flex items-center justify-center h-full">
            <h1 className="text-3xl font-bold">Welcome Again { user?.name }</h1>
        </div>
    )
}