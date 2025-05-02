import { AdmissionProps, AdmitPatientsProps } from "../../../types/DataTypes";



const AllAdmissions: React.FC<AdmitPatientsProps> = ({allClinicRooms, showSelectedRoom}) => {

  return (
    <div className='overflow-hidden relative w-[75%] shadow-sm mt-[100px] mb-4 py-4 px-[2rem] mx-6 flex flex-col space-y-12 text-[#161616]  bg-gradient-to-r from-slate-50 to-slate-100 border border-white rounded-[15px] lx:w-[82%]'>
            
        <div className=" absolute w-full max-h-[700px] overflow-y-auto overflow-x-hidden">
            <h4 className="font-bold text-[15px] bg-gradient-to-r from-slate-700 to-slate-500 bg-clip-text text-transparent">Rooms</h4>
            <div  className="w-full h-full grid grid-cols-6 gap-[0.50rem] xl:grid-cols-8">
                    {allClinicRooms && allClinicRooms.map((room: AdmissionProps) => (
                            <button onClick={()=> showSelectedRoom(room.roomNumber)} key={room.roomNumber} className={`p-2 transition-properties max-w-[170px] min-h-[130px] flex flex-col space-y-1 items-center justify-center border border-white rounded-md 
                                  bg-gradient-to-r ${room.isRoomAvailable === false
                                  ? ' from-slate-600 to-slate-800'
                                  : 'from-slate-800 to-slate-900'} 
                                  hover:transform hover:scale-105`}>
                                  <h4 className="text-[19px] font-[500] bg-gradient-to-r from-slate-100 to-slate-300 bg-clip-text text-transparent ">{room.roomNumber}</h4>
                                  <p className="text-[#8f8f8f] tracking-wider text-[14px] uppercase">{room.isRoomAvailable ? 'Available' : 'Occupied'} </p>
                                  <p className="text-white">{room.occupantName}</p>
                            </button>
                    ))}
            </div>
        </div>


    </div>
  )
}

export default AllAdmissions