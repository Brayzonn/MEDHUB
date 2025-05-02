import userplaceholder from '../images/userplaceholderlogo.png'
import { FaChevronRight } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';


const ItemList = () => {

    const navigate = useNavigate();

    const dashboardAppointmentsList: dahshboardAppointmentsListSchema[] = [
        {patientImage: '', patientName: 'Dave Matthews', patientNumber: '+234 9034578945', appointmentDate: '5 Dec 2024', appointmentTime: '5:30 PM', doctorName: 'Ndani James', doctorSpecialty: 'Cardiologist'},
        {patientImage: '', patientName: 'Greg Adamu', patientNumber: '+234 9034578945', appointmentDate: '9 OCT 2024', appointmentTime: '5:50 PM', doctorName: 'Ndani Otu', doctorSpecialty: 'Cardiologist'},
        {patientImage: '', patientName: 'John Doe', patientNumber: '+234 9034578945', appointmentDate: '15 JUL 2024', appointmentTime: '5:30 PM', doctorName: 'Esther Matthews', doctorSpecialty: 'Cardiologist'},
        {patientImage: '', patientName: 'Willow Green', patientNumber: '+234 9034578945', appointmentDate: '25 JUN 2024', appointmentTime: '6:40 PM', doctorName: 'John James', doctorSpecialty: 'Cardiologist'},
        {patientImage: '', patientName: 'Bright Ezani', patientNumber: '+234 9034578945', appointmentDate: '9 OCT 2024', appointmentTime: '1:10 PM', doctorName: 'Greg James', doctorSpecialty: 'Neurologist'},
    ]

    interface dahshboardAppointmentsListSchema  {
        patientImage : string,
        patientName: string,
        patientNumber:string,
        appointmentDate: string,
        appointmentTime:string,
        doctorName: string,
        doctorSpecialty:string
    }
    
  return (
    <div className='relative w-full py-[1rem] px-[1rem] min-h-[1rem] flex flex-col items-start justify-center space-y-4 '>

    <p className='text-[16px] font-[600] text-black text-left'>Appointments</p>

    <div className='w-full min-h-[30px] flex justify-between items-center xl:w-[1000px]'>
            <p className='w-1/3 text-[14px] text-[#ABABAB]'>PATIENT DETAILS</p>
            <p className='w-1/3 text-[14px] text-[#ABABAB]'>DATE</p>
            <p className='w-1/3 text-[14px] text-[#ABABAB]'>DOCTOR DETAILS</p>
    </div>

    {dashboardAppointmentsList.map((appointment, index) => (
            <button key={index} onClick={()=> navigate('/user/appointments')} className='shadow-lg w-full h-[60px] p-2 bg-white border border-white rounded-[5px] flex justify-between items-center xl:w-[1000px]'>
                            <div className='flex items-center space-x-2 w-1/3'>
                                    <img alt="profile-icon" src = {userplaceholder} className = 'w-[35px] h-[35px] border-inherit rounded-full' />

                                    <div className='flex flex-col'>
                                            <p className='text-left text-black text-[15px]'>{appointment.patientName}</p>
                                            <p className='text-left text-[#ABABAB] text-[14px]'>{appointment.patientNumber}</p>
                                    </div>
                            </div> 

                            <div className='flex flex-col w-1/3'>
                                    <div className='flex flex-col'>
                                            <p className='text-left text-black text-[15px]'>{appointment.appointmentDate}</p>
                                            <p className='text-left text-[#ABABAB] text-[14px]'>{appointment.appointmentTime}</p>
                                    </div>
                            </div>

                            <div className='flex items-center justify-between w-1/3'>
                                    <div className='flex items-center space-x-2'>
                                            <img alt="profile-icon" src = {userplaceholder} className = 'w-[35px] h-[35px] border-inherit rounded-full' />

                                            <div className='flex flex-col'>
                                                    <p className='text-left text-black text-[15px]'>{appointment.doctorName}</p>
                                                    <p className='text-left text-[#ABABAB] text-[14px]'>{appointment.doctorSpecialty}</p>
                                            </div>
                                    </div>

                                    <FaChevronRight className = 'text-[#201E78]'/>
                            </div> 
            </button>
    ))}

</div>
  )
}

export default ItemList