import React from "react";
import { Alert } from "../@types/myTypes";

export default function createAlert(
    setAlert: React.Dispatch<React.SetStateAction<Alert>>,
    data: Alert
) {

    setAlert(data);

    setTimeout(() => {
        setAlert({
            msg: '',
            visible: false,
            type: false
        });
    }, 3000)
}