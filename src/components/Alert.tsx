import clsx from "clsx"

export default function Alert({ type, msg }: {type: boolean, msg: string}) {

    return (
        <div className={
            clsx('w-full py-2 px-3 rounded-m font-medium text-lg overflow-hidden relative', {
                'bg-[#C5F4D8] text-[#28D671]': type 
            }, {
                'bg-[#FFE1E3] text-[#F9475B]': !type
            })
        }>
            <span className={clsx('absolute left-0 top-0 bottom-0 w-2 rounded',
                { 'bg-[#28d671]': type },
                {'bg-[#f9475b]': !type}
            )}></span>
            {msg}
        </div>
    )
}