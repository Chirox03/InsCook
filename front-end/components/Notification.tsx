import Image from "next/image";

const imageStyle = {
    borderRadius: '50%',
    mt: -50,
    display: 'inline-block',
  }
function Notification() {
    return (
        <div className="flex items-center border rounded p-[1rem]">
            <Image src="/image.png" style={imageStyle} width={50} height={50} alt="icon"/>
            <div className="ml-[10px] flex justify-between flex-col">
                <p>User 1 đã chia sẻ 1 ảnh</p>
            </div>
        </div>
    )
}
export default Notification