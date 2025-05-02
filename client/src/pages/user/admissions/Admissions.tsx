import axios from 'axios';
import { useEffect, useState } from "react";

import admissionsicon from '../../../images/admissionsicon.png';
import nurseicon from '../../../images/nurseicon.png';
import homeIconImage from '../../../images/dashlogo.svg';
import patientIcon from '../../../images/patient-icon.svg';
import doctorIcon from '../../../images/doctor-icon.svg';
import appointmentIcon from '../../../images/stafficon.png';


import { useGlobalContext } from '../../../context/useGlobalContext';
import { AdmissionProps } from '../../../types/DataTypes';
import AllAdmissions from './AllAdmissions';
import SideNav from "../../../components/SideNav";
import UseScreenWidth from '../../../utils/UseScreenWidth';
import NavSection from '../../../components/NavSection';
import RoomOptions from './RoomOptions';
import { toast } from "react-toastify";


const Admissions = () => {
  const {baseURL, fetchClinicRoomData, allClinicRoomData} = useGlobalContext();
  const userToken = sessionStorage.getItem('userToken');
  const screenWidth = UseScreenWidth();
  const [, setIsHovered] = useState(false);


  const [ButtonLoadingAnimation, setButtonLoadingAnimation] = useState<boolean>(false)


  //navlinks for sidenav component
  const navLinks = [
      { to: '/user/dashboard', icon: homeIconImage, text: 'Dashboard' },
      { to: '/user/doctors', icon: doctorIcon, text: 'Doctors' },
      { to: '/user/patients', icon: patientIcon, text: 'Patients' },
      { to: '/user/deadlink', icon: nurseicon, text: 'Nurses', disabled: true },
      { to: '/user/deadlink', icon: appointmentIcon, text: 'Staff', disabled: true },
      { to: '/user/admissions', icon: admissionsicon, text: 'Admissions' },
  ];


  const [roomOptionsActive, updateRoomOptions]= useState<boolean>(false)

  const [currentRoomOption, setCurrentRoomOption] = useState<AdmissionProps>({
    roomNumber: '',
    occupantID: '',
    occupantName: '',
    isRoomAvailable: false,
  });

  useEffect(()=>{
    const fetchData = async () => {
          await fetchClinicRoomData();
    };

        fetchData()

       
    }, [])

    

  const showSelectedRoom = (roomID: string)=> {

    const selectedRoom = allClinicRoomData.find(room => room.roomNumber === roomID);
    
    if (selectedRoom) {
            setCurrentRoomOption(selectedRoom);
            updateRoomOptions(true);
    }
 }

  const closeAdmitPatients = () =>{

  }
  

  //check out and check in logic
  const checkOutFunction = async () =>{
    try {
      setButtonLoadingAnimation(true);    
      
      const checkOutPatientCall = await axios.post(`${baseURL}/api/user/checkoutpatient`, {patientID: currentRoomOption?.occupantID, roomNumber: currentRoomOption?.roomNumber},
      {
          headers: {
              Authorization: `Bearer ${userToken}`,
          },
      })

      const checkOutPatientCallPayload = checkOutPatientCall.data.payload;

      if(checkOutPatientCall.status === 200){
              toast.success(checkOutPatientCallPayload)
              await fetchClinicRoomData()
          
              setTimeout(() => {
                      setButtonLoadingAnimation(false);
                      updateRoomOptions(false);
              }, 1000);
              
      }else{
              toast.error(checkOutPatientCallPayload) 

              setTimeout(() => {
                      setButtonLoadingAnimation(false);
                      updateRoomOptions(false);
              }, 1000);
      }
      

} catch (error) {
      if (axios.isAxiosError(error)) {
              if (error.response && error.response.data && error.response.data.payload) {
                      toast.error(`Error: ${error.response.data.payload}`);
                      console.error('Unexpected error:', error);
              } else {
                      toast.error('Something went wrong');
                      console.error('Unexpected error2:', error);
              }
              setButtonLoadingAnimation(false);
      } else {
              console.error('Unexpected error:', error);
              toast.error('An unexpected error occurred');
              setButtonLoadingAnimation(false);
      }                
} 
  }

  const checkInFunction = () =>{
       toast.success('service unavailable')
  }

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
                        
                                  <div className="relative h-full w-full flex ">
                                          <SideNav navLinks={navLinks} setIsHovered={setIsHovered} widthClass ={`w-[25%]`}/>

                                          <AllAdmissions 
                                              showSelectedRoom = {showSelectedRoom} 
                                              allClinicRooms = {allClinicRoomData}
                                              closeAdmitPatients = {closeAdmitPatients}
                                          />

                                          <RoomOptions 
                                              roomOptionsCheckOutFnc = {checkOutFunction} 
                                              roomOptionsCheckInFnc={checkInFunction} 
                                              buttonLoadingAnimation = {ButtonLoadingAnimation}
                                              RoomOptions= {currentRoomOption} 
                                              updateRoomOptionsActive = {updateRoomOptions} 
                                              roomOptionsActive = {roomOptionsActive}
                                          />
                                  </div>
                
                        </div>
                </div>
              )
  }
}

export default Admissions