import { useNavigate } from 'react-router-dom';
import alladmittedpatients from '../../images/allpatientlogo.png';
import alldoctorlogo from '../../images/alldoctorlogo.png';
import allappntmntlogo from '../../images/allappntmentlogo.png';
import allpatientlogo from '../../images/alladmittedpatients.png';
import userplaceholder from '../../images/userplaceholderlogo.png'
import { FaChevronRight } from "react-icons/fa";

const DashboardSection = () => {

    const navigate = useNavigate();



    interface dahshboarddataSchema  {
        image : string,
        number: number,
        tag:string

    }
    const dashboardDisplayData: dahshboarddataSchema[] = [

        { image: allpatientlogo,        number: 100,      tag: 'Total Patients' },
        { image: alldoctorlogo,         number: 10,       tag: 'Total Doctors' },
        { image: allappntmntlogo,       number: 150,      tag: 'Total Appointments' },
        { image: alladmittedpatients,   number: 150,      tag: 'Admitted Patients' },
 
    ];



    interface dahshboardAppointmentsListSchema  {
        patientImage : string,
        patientName: string,
        patientNumber:string,
        appointmentDate: string,
        appointmentTime:string,
        doctorName: string,
        doctorSpecialty:string
    }
    const dashboardAppointmentsList: dahshboardAppointmentsListSchema[] = [
        {patientImage: '', patientName: 'Dave Matthews', patientNumber: '+234 9034578945', appointmentDate: '5 Dec 2024', appointmentTime: '5:30 PM', doctorName: 'Ndani James', doctorSpecialty: 'Cardiologist'},
        {patientImage: '', patientName: 'Greg Adamu', patientNumber: '+234 9034578945', appointmentDate: '9 OCT 2024', appointmentTime: '5:50 PM', doctorName: 'Ndani Otu', doctorSpecialty: 'Cardiologist'},
        {patientImage: '', patientName: 'John Doe', patientNumber: '+234 9034578945', appointmentDate: '15 JUL 2024', appointmentTime: '5:30 PM', doctorName: 'Esther Matthews', doctorSpecialty: 'Cardiologist'},
        {patientImage: '', patientName: 'Willow Green', patientNumber: '+234 9034578945', appointmentDate: '25 JUN 2024', appointmentTime: '6:40 PM', doctorName: 'John James', doctorSpecialty: 'Cardiologist'},
        {patientImage: '', patientName: 'Bright Ezani', patientNumber: '+234 9034578945', appointmentDate: '9 OCT 2024', appointmentTime: '1:10 PM', doctorName: 'Greg James', doctorSpecialty: 'Neurologist'},
    ]

  return (
    <div className='relative pt-[2rem] px-[1rem] min-h-[10rem] w-[75%] lx:w-[82%]'>
            <div className='w-full min-h-[200px] flex justify-evenly flex-wrap lx:justify-start'>
                    
                    {dashboardDisplayData.map((data, index) => (
                            <div key = {index} className='p-2 m-[1rem] flex items-center space-x-3 shadow-lg bg-white min-w-[240px] h-[120px] border border-white rounded-[5px] '>
                                
                                    <img src={data.image} alt='icon' className='h-[50px] w-[50px]'/>

                                    <div className='flex flex-col space-y-1 justify-center'>
                                            <p className='text-[19px] font-[550] text-black'>{data.number}</p>
                                            <p className='text-[15px] text-[#ABABAB]'>{data.tag}</p>
                                    </div>
                            </div>
                    ))}  
                             
            </div>

            <div className='relative w-full py-[1rem] min-h-[1rem] flex flex-col items-start justify-center space-y-4 '>

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
    </div>
  )
}

export default DashboardSection