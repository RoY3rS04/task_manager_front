import { useContext } from "react";
import UserContext from "../context/userProvider";
import { UserState } from "../@types/myTypes";

export default function useAuth(): UserState {
    return useContext(UserContext);
}
