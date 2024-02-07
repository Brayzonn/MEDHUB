
import { FaSignOutAlt, FaSignInAlt, FaTimes } from "react-icons/fa";
import { TiCancel } from "react-icons/ti";

interface RoomOptionsObject {
    roomId: string,
    occupantName: string,
    occupantId: string,
    roomType: string,
    checkInDate: string,
    checkOutDate: string,
    checkedIn: boolean,
}

interface RoomOptionsProps {
    RoomOptions: RoomOptionsObject,
    updateRoomOptionsActive: React.Dispatch<React.SetStateAction<boolean>>
    roomOptionsActive:boolean,
    roomOptionsCheckOutFnc: (roomId:string) => void,
    roomOptionsCheckInFnc: (roomId:string) => void,
}

const RoomOptions: React.FC<RoomOptionsProps> = ({roomOptionsCheckOutFnc, roomOptionsCheckInFnc, RoomOptions, updateRoomOptionsActive, roomOptionsActive }) => {

  return (
    <>
        {roomOptionsActive && <div className="z-50 fixed inset-0 overflow-y-auto">
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                                <div className="absolute inset-0 bg-gray-600 opacity-[0.50]"></div>
                        </div>

                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                                &#8203;
                        </span>

                        
                        <div className="relative py-6 px-4 inline-block align-middle w-[300px] min-h-[420px] bg-gradient-to-r from-slate-800 to-slate-900 border-[#0e1e43] text-white border rounded-[15px] overflow-hidden">
                                <button onClick={()=> updateRoomOptionsActive(false)} className="absolute top-4 right-4 text-white">
                                    <FaTimes />
                                </button>
                                
                                <h3 className="tracking-wider text-[22px] font-bold">ROOM {RoomOptions.roomId}</h3>

                                <div className="pt-[2rem] w-full flex flex-col justify-center items-center space-y-4">
                                        <div className="w-full flex flex-col justify-center items-center">
                                            <h6 className="text-[14px] font-semibold text-[#8f8f8f]">Occupant Name</h6>
                                            <p className="">{RoomOptions.occupantName}</p>
                                        </div>

                                        <div className="w-full flex flex-col justify-center items-center">
                                            <h6 className="text-[14px] font-semibold text-[#8f8f8f]">Occupant ID</h6>
                                            <p className="">PT {RoomOptions.occupantId}</p>
                                        </div>

                                        <div className="w-full flex flex-col justify-center items-center">
                                            <h6 className="text-[14px] font-semibold text-[#8f8f8f]">Room Type</h6>
                                            <p className="">{RoomOptions.roomType}</p>
                                        </div>

                                        <div className="pt-[2rem] w-full flex justify-between items-center">
                                                <div className="w-full flex flex-col justify-center items-center">
                                                    <h6 className="text-[14px] font-semibold text-[#8f8f8f]">Check-in date</h6>
                                                    <p className="text-[14px]">{RoomOptions.checkInDate}</p>
                                                </div>

                                                <div className="w-full flex flex-col justify-center items-center">
                                                    <h6 className="text-[14px] font-semibold text-[#8f8f8f]">Check-out date</h6>
                                                    <p className="text-[14px]">{RoomOptions.checkOutDate !== '' ? RoomOptions.checkOutDate : '-'}</p>
                                                </div>
                                        </div>
                                </div>

                                <div className="pt-[2rem] w-full flex justify-between items-center">
                                    

                                        {!RoomOptions.checkedIn ? 
                                        
                                            <button onClick={()=>roomOptionsCheckOutFnc} className="transition-properties w-[130px] h-[40px] bg-red-500 text-white border border-red-500 text-[14px] rounded-md flex items-center justify-center space-x-2 hover:border-red-400 hover:bg-red-400">
                                                <FaSignOutAlt />
                                                <p>Check-out</p>
                                            </button>

                                                :

                                            <button disabled={true} className="transition-properties w-[130px] h-[40px] bg-red-500 text-white border border-red-500 text-[14px] rounded-md flex items-center justify-center space-x-2">
                                                <TiCancel className = 'text-white text-[18px]'/>
                                                <p>Check-out</p>
                                            </button> 
                                        }

                                        {RoomOptions.checkedIn ? 
                                        
                                            <button onClick={()=>roomOptionsCheckInFnc} className="transition-properties w-[130px] h-[40px] bg-green-500 text-white border border-green-500 text-[14px] rounded-md flex items-center justify-center space-x-2 hover:border-green-400 hover:bg-green-400">
                                                <FaSignInAlt />
                                                <p>Check-in</p>
                                            </button> 
                                            
                                            :

                                            <button disabled={true} className="transition-properties w-[130px] h-[40px] bg-green-500 text-white border border-green-500 text-[14px] rounded-md flex items-center justify-center space-x-2">
                                                <TiCancel className = 'text-white text-[18px]'/>
                                                <p>Check-in</p>
                                            </button> 
                                        }
                                </div>
                        </div>  

                </div>
        </div>}
    </>
  )
}

export default RoomOptions