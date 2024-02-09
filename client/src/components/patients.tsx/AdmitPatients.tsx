

interface AdmitPatientsProps{
    updateIsAdmitPatientActive:  React.Dispatch<React.SetStateAction<boolean>>,
    isAdmitPatientActive: boolean,
}

const AdmitPatients: React.FC<AdmitPatientsProps> = ({updateIsAdmitPatientActive, isAdmitPatientActive}) => {
  return (
    <>
    {(isAdmitPatientActive) && 
    <div className="z-50 fixed top-0 left-0 w-full min-h-full flex justify-center items-center text-[#161616]">
            <div className="shadow-2xl relative px-6 py-8 w-[95%] h-[100%] bg-white border border-[#f7f7f7] rounded-[15px]">   
                    <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                        <div className="absolute inset-0 bg-gray-600 opacity-[0.50]"></div>
                    </div>
            </div>
    </div>
    }
    </>
  )
}

export default AdmitPatients