import Notification from "@/components/Notification";
import Image from "next/image";
function Notifications () {
    return (
        <div className="flex flex-col">
            <div className="flex items-center">
                <Image src="/back-button.png" width={30} height={30} alt="back-button"/>
                <div className="flex justify-between flex-col">
                <h1 className="font-bold text-3xl p-[0.5rem]">Thông báo</h1>
                </div>
            </div>
            <div className=" m-[0.5rem]">
                <h3 className="font-semibold text-xl">Mới</h3>
                <div className="m-[0.25rem]">
                <Notification/>
                <Notification/>
                <Notification/>
                <Notification/>
                </div>

            </div>
            <div className="m-[0.5rem]">
                <h3 className="font-semibold text-xl">7 ngày qua</h3>
                <div className="m-[0.25rem]">
                <Notification/>
                <Notification/>
                <Notification/>
                <Notification/>
                </div>
            </div>
        </div>
    )
}

export default Notifications