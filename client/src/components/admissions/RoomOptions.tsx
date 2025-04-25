
import { FaSignOutAlt, FaSignInAlt, FaTimes } from "react-icons/fa";
import { TiCancel } from "react-icons/ti";
import {RoomOptionsProps} from '../DataTypes';
import whiteBtnLoader from '../../images/buttonloaderwhite.svg';


const RoomOptions: React.FC<RoomOptionsProps> = ({buttonLoadingAnimation, roomOptionsCheckOutFnc, roomOptionsCheckInFnc, RoomOptions, updateRoomOptionsActive, roomOptionsActive }) => {

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
                                
                                <h3 className="tracking-wider text-[22px] font-bold">{RoomOptions.roomNumber}</h3>

                                <div className="pt-[2rem] w-full flex flex-col justify-center items-center space-y-4">
                                        <div className="w-full flex flex-col justify-center items-center">
                                            <h6 className="text-[14px] font-semibold text-[#8f8f8f]">Occupant Name</h6>
                                            <p className="">{RoomOptions.occupantName}</p>
                                        </div>

                                        <div className="w-full flex flex-col justify-center items-center">
                                            <h6 className="text-[14px] font-semibold text-[#8f8f8f]">Occupant ID</h6>
                                            <p className="">{RoomOptions.occupantID}</p>
                                        </div>

                                        <div className="w-full flex flex-col justify-center items-center">
                                            <h6 className="text-[14px] font-semibold text-[#8f8f8f]">Room Type</h6>
                                            <p className="">{RoomOptions.roomType? RoomOptions.roomType : 'General'}</p>
                                        </div>

                                        <div className="pt-[2rem] w-full flex justify-between items-center">
                                                <div className="w-full flex flex-col justify-center items-center">
                                                    <h6 className="text-[14px] font-semibold text-[#8f8f8f]">Check-in date</h6>
                                                    <p className="text-[14px]">
                                                        {RoomOptions.checkInDate
                                                            ? new Date(RoomOptions.checkInDate).toLocaleDateString()
                                                            : ''
                                                        }
                                                    </p>

                                                </div>

                                                <div className="w-full flex flex-col justify-center items-center">
                                                    <h6 className="text-[14px] font-semibold text-[#8f8f8f]">Check-out date</h6>
                                                    <p className="text-[14px]">-</p>
                                                </div>
                                        </div>
                                </div>

                                <div className="pt-[2rem] w-full flex justify-between items-center">
                                    
                                    <button
                                        onClick={() => roomOptionsCheckInFnc(RoomOptions.roomNumber)}
                                        disabled={!RoomOptions.isRoomAvailable} 
                                        className={`transition-properties w-[130px] h-[40px] text-white border text-[14px] rounded-md flex items-center justify-center space-x-2 
                                            ${!RoomOptions.isRoomAvailable 
                                            ? 'bg-green-300 border-green-300 cursor-not-allowed' 
                                            : 'bg-green-500 border-green-500 hover:border-green-400 hover:bg-green-400'}`}
                                        >
                                            {buttonLoadingAnimation ? 
                                                <img src = {whiteBtnLoader} className='w-[16px] h-[16px]' alt='loader'/>   
                                            :
                                            <>
                                                {!RoomOptions.isRoomAvailable 
                                                    ? <TiCancel className="text-white text-[18px]" /> 
                                                    : <FaSignInAlt />
                                                }
                                                <p>Check-in</p>
                                            </>
                                            }
                                  
                                    </button>


                                    <button
                                        onClick={() => roomOptionsCheckOutFnc(RoomOptions.roomNumber)}
                                        disabled={RoomOptions.isRoomAvailable} 
                                        className={`transition-properties w-[130px] h-[40px] text-white border text-[14px] rounded-md flex items-center justify-center space-x-2 
                                            ${RoomOptions.isRoomAvailable 
                                            ? 'bg-red-300 border-red-300 cursor-not-allowed' 
                                            : 'bg-red-500 border-red-500 hover:border-red-400 hover:bg-red-400'}`}
                                        >

                                        {buttonLoadingAnimation ? 
                                            <img src = {whiteBtnLoader} className='w-[16px] h-[16px]' alt='loader'/>   
                                        :
                                        <>
                                            {RoomOptions.isRoomAvailable 
                                            ? <TiCancel className="text-white text-[18px]" /> 
                                            : <FaSignOutAlt />}
                                            <p>Check-out</p>
                                        </>
                                        }  
                                    </button>

                                </div>
                        </div>  

                </div>
        </div>}
    </>
  )
}

export default RoomOptions