import { ReactNode } from "react";

export default function Modal({children}: {children: ReactNode}) {
    return (
        <div className="w-full">
            {children}
        </div>
    )
}