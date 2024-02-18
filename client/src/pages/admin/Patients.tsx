import  { useState } from 'react';

import admissionsicon from '../../images/admissionsicon.png';
import nurseicon from '../../images/nurseicon.png';
import homeIconImage from '../../images/dashlogo.svg';
import patientIcon from '../../images/patient-icon.svg';
import doctorIcon from '../../images/doctor-icon.svg';
import appointmentIcon from '../../images/stafficon.png';

import SideNav from '../../components/SideNav';
import UseScreenWidth from '../../components/globalComponents/UseScreenWidth';
import NavSection from '../../components/NavSection';
import AllPatients from '../../components/patients.tsx/AllPatients';



const Patients = () => {
  const screenWidth = UseScreenWidth();
  const [, setIsHovered] = useState(false);


   //navlinks for sidenav component
   const navLinks = [
        { to: '/admin/dashboard',    icon: homeIconImage,    text: 'Dashboard' },
        { to: '/admin/doctors',      icon: doctorIcon,       text: 'Doctors' },
        { to: '/admin/patients',     icon: patientIcon,      text: 'Patients' },
        { to: '/admin/nurses',       icon: nurseicon,  text: 'Nurses' },
        { to: '/admin/staff',        icon: appointmentIcon,  text: 'Staff' },
        { to: '/admin/admissions',   icon: admissionsicon,   text: 'Admissions' },
        
    ];


    //if not desktop screen, display error message
    if(screenWidth < 891 ){
  
          return (
            <div className='relative w-full h-screen flex flex-col justify-center items-center'>
                    
                    <p className='text-center text-[20px] font-[550]'>Please load app on desktop</p>
                    <div className='text-[25px]'>🙂</div>

            </div>
          )
    }else{
          return (
            <div className='absolute min-h-[100vh] w-full flex flex-col bg-greyMainBackground
                            justify-start items-start overflow-hidden'>

                    <div className="relative h-full w-full overflow-x-hidden flex 
                                  flex-col justify-start items-start text-black">              
                                    
                          <NavSection />
                
                          <div className="relative h-full w-full flex  ">
                                  <SideNav navLinks={navLinks} setIsHovered={setIsHovered} widthClass ={`w-[25%]`}/>

                                  <AllPatients />
                          </div>
            
                    </div>
            </div>
      )
}
}

export default Patients