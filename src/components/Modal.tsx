import { ReactNode } from "react";

export default function Modal({children}: {children: ReactNode}) {
    return (
        <div>
            {children}
        </div>
    )
}