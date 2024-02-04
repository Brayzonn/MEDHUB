interface AllAdmission {
    buttonAction?: ()=> void,
    roomNumber: string,
    roomStatus: string,
    occupantName: string,
}

interface AllAdmissionProps {
    allRooms: AllAdmission[]
}


const AllAdmissions: React.FC<AllAdmissionProps> = ({allRooms}) => {
  return (
    <div className='overflow-hidden relative w-[75%] shadow-sm mt-[100px] mb-4 p-4 mx-6 flex flex-col space-y-12 text-[#161616] bg-white border border-white rounded-[15px] lx:w-[82%]'>
            
            <h4 className="font-bold text-[15px] bg-gradient-to-r from-slate-700 to-slate-500 bg-clip-text text-transparent">Rooms</h4>
            <div className="w-full h-full grid grid-cols-6 gap-[0.50rem]">
                    {allRooms.map((room: AllAdmission, index:number) => (
                            <button key={index} className={`transition-properties max-w-[170px] h-[130px] flex flex-col space-y-1 items-center justify-center border border-white rounded-md 
                                bg-gradient-to-r ${room.roomStatus === 'Taken'
                                ? ' from-slate-600 to-slate-800'
                                : 'from-slate-800 to-slate-900'} 
                                hover:transform hover:scale-105`}>
                                    <h4 className="text-[19px] font-[500] bg-gradient-to-r from-slate-100 to-slate-300 bg-clip-text text-transparent ">ROOM{room.roomNumber}</h4>
                                    <p className="text-[#8f8f8f] tracking-wider text-[14px] uppercase">{room.roomStatus} </p>
                                    <p className="text-white">{room.occupantName}</p>
                            </button>
                    ))}
            </div>

    </div>
  )
}

export default AllAdmissions