import Image from 'next/image'
const imageStyle = {
    borderRadius: '50%',
    mt: -50,
    display: 'inline-block',
  }
function EditProfile() {
    return(
        <section className="h-[90vh] flex flex-col items-center justify-center">
            <div className="w-[70%] h-[40vh] flex flex-col border border-gray-400 rounded-md border-solid items-center justify-center">
                <p className="text-bold text-xl m-[20px]">Chỉnh sửa trang cá nhân</p>
                <div className="flex items-center bg-gray-400 border rounded-md p-[1rem]">
                    <Image src="/image.png" style={imageStyle} width={50} height={50} alt="icon"/>
                    <div className="ml-[10px] flex justify-between flex-col">
                        <p>trhuuloc</p>
                        <p>Trần Hữu Lộc</p>
                    </div>
                    <button type="button" className="ml-[30px] mb-0 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-xs px-5 py-2 me-2  dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                        Đổi ảnh
                    </button>
                </div>
            </div>
        </section>
    )
}

export default EditProfile