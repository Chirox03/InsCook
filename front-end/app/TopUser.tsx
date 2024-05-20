import Image from 'next/image';

const imageStyle = {
  borderRadius: '50%',
  mt: -50,
  display: 'inline-block',
};
function TopUser() {
  return (
    <div className="flex flex-col justify-center">
      <p className="pt-[5%] text-center text-xl font-bold">Leaderboard</p>
      <div className="mt-[5%]">
        <div className="w-[90%] h-[70px] mt-[2%] ml-[5%] border border-gray-300 rounded-xl border-1">
          <span className="inline-block w-[30px] h-[30px] font-bold mt-[15px] ml-[10px] text-2xl">1</span>
          <Image src="/image.png" style={imageStyle} width={60} height={60} alt="icon"/>
          <span className="inline-block text-xl font-bold mt-[15px] ml-[15px]">Number 1</span>
          <div className="mt-[-60px] ml-[17em]">
            <Image src="/image.png" width={60} height={60} style={{borderRadius:'30%'}} alt="icon"/>
          </div>
        </div>

        <div className="w-[90%] h-[70px] mt-[2%] ml-[5%] border border-gray-300 rounded-xl border-1">
          <span className="inline-block w-[30px] h-[30px] font-bold mt-[15px] ml-[10px] text-2xl">2</span>
          <Image src="/image.png" style={imageStyle} width={60} height={60} alt="icon"/>
          <span className="inline-block text-xl font-bold mt-[15px] ml-[15px]">Number 2</span>
          <div className="mt-[-60px] ml-[17em]">
            <Image src="/image.png" width={60} height={60} style={{borderRadius:'30%'}} alt="icon"/>
          </div>
        </div>

        <div className="w-[90%] h-[70px] mt-[2%] ml-[5%] border border-gray-300 rounded-xl border-1">
          <span className="inline-block w-[30px] h-[30px] font-bold mt-[15px] ml-[10px] text-2xl">3</span>
          <Image src="/image.png" style={imageStyle} width={60} height={60} alt="icon"/>
          <span className="inline-block text-xl font-bold mt-[15px] ml-[15px]">Number 3</span>
          <div className="mt-[-60px] ml-[17em]">
            <Image src="/image.png" width={60} height={60} style={{borderRadius:'30%'}} alt="icon"/>
          </div>
        </div>

        <div className="w-[90%] h-[70px] mt-[2%] ml-[5%] border border-gray-300 rounded-xl border-1">
          <span className="inline-block w-[30px] h-[30px] font-bold mt-[15px] ml-[10px] text-2xl">4</span>
          <Image src="/image.png" style={imageStyle} width={60} height={60} alt="icon"/>
          <span className="inline-block text-xl font-bold mt-[15px] ml-[15px]">Number 4</span>
          <div className="mt-[-60px] ml-[17em]">
            <Image src="/image.png" width={60} height={60} style={{borderRadius:'30%'}} alt="icon"/>
          </div>
        </div>

        <div className="w-[90%] h-[70px] mt-[2%] ml-[5%] border border-gray-300 rounded-xl border-1">
          <span className="inline-block w-[30px] h-[30px] font-bold mt-[15px] ml-[10px] text-2xl">5</span>
          <Image src="/image.png" style={imageStyle} width={60} height={60} alt="icon"/>
          <span className="inline-block text-xl font-bold mt-[15px] ml-[15px]">Number 5</span>
          <div className="mt-[-60px] ml-[17em]">
            <Image src="/image.png" width={60} height={60} style={{borderRadius:'30%'}} alt="icon"/>
          </div>
        </div>
        <button type="button" className="ml-[25%] w-1/2 text-white bg-gray-800 mt-[10px] hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Viewmore</button>
      </div>
    </div>
  );
}   

export default TopUser;