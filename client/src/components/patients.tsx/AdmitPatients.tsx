import { FaHandPointer } from "react-icons/fa";

interface AllAdmission {
    buttonAction?: ()=> void,
    roomNumber: string,
    roomStatus: string,
    occupantName: string,
}

interface AdmitPatientsProps{
    allAvailableRooms: AllAdmission[],
    isAdmitPatientActive: boolean,
    showSelectedRoom: (roomId: string) => void,
}

const AdmitPatients: React.FC<AdmitPatientsProps> = ({allAvailableRooms, showSelectedRoom, isAdmitPatientActive}) => {
  return (
    <>
    {(isAdmitPatientActive) && 
        <div className="z-50 fixed top-0 left-0 w-full min-h-full flex justify-center items-center text-[#161616]">
                
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-600 opacity-[0.50]"></div>
                </div>
          
                <div className="shadow-2xl overflow-y-auto overflow-x-hidden absolute px-6 py-8 w-[95%] max-h-[80%] bg-white border border-[#f7f7f7] rounded-[15px]">   
                      <h4 className="font-bold pb-[2rem] text-[15px] bg-gradient-to-r from-slate-700 to-slate-500 bg-clip-text text-transparent">Available Rooms</h4>
                      <div  className="w-full h-full grid grid-cols-6 gap-[0.50rem] xl:grid-cols-8">
                              {allAvailableRooms.filter((room:AllAdmission) => room.roomStatus === 'Available')
                              .map((room: AllAdmission, index:number) => (
                                      <button onClick={()=> showSelectedRoom(room.roomNumber)} key={index} className={`p-2 transition-properties max-w-[170px] min-h-[130px] flex flex-col space-y-1 items-center justify-center border border-white rounded-md 
                                      bg-gradient-to-r from-slate-800 to-slate-900 hover:transform hover:scale-105`}
                                      >
                                              <h4 className="text-[19px] font-[500] bg-gradient-to-r from-slate-100 to-slate-300 bg-clip-text text-transparent ">ROOM{room.roomNumber}</h4>
                                              <FaHandPointer className = 'text-[#d4d1d1]'/>
                                              <p className="text-[#c3c3c3]">Click to admit</p>
                                      </button>
                              ))}
                      </div>
                </div>
              
                
        </div>}
    </>
  )
}

export default AdmitPatients