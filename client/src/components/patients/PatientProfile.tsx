import { useEffect, useState } from "react";

import { useGlobalContext } from '../../context/useGlobalContext';
import {PatientProfileProps} from '../DataTypes';
import ConfirmationDialog from '../globalComponents/ConfirmationDialog';
import EditPatient from "./EditPatient";
import AdmitPatients from "./AdmitPatients";


import userplaceholder from '../../images/userplaceholderlogo.png';
import emailIcon from '../../images/mailicon.png';
import phoneIcon from '../../images/mobileicon.png';
import whiteBtnLoader from '../../images/buttonloaderwhite.svg';

import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { MdEditSquare } from "react-icons/md";
import { FaChevronDown } from "react-icons/fa6";
import { MdLocalHospital } from "react-icons/md";
import { FaRegTrashCan } from "react-icons/fa6";




const PatientProfile: React.FC<PatientProfileProps> = ({ fetchUpdatedActivePatientData, deletePatientFunction, activePatientProfile, updatePatientProfileVisibility, updatePatientEditState, patientData, updatePatientProfile, isConfirmationDialogOpen, patientEditState, setIsConfirmationDialogOpen, buttonLoadingAnimation, isPatientProfileVisible}) => {

  const {baseURL, fetchPatients} = useGlobalContext();

  const activePatientProfileString = sessionStorage.getItem('activePatientProfile');

  useEffect(()=>{
        if (activePatientProfileString) {
           const parsedActivePatientProfile = JSON.parse(activePatientProfileString);
        }        
  }, [activePatientProfileString]);
  
  const [isAdmitPatientActive, updateIsAdmitPatientActive] = useState<boolean>(false);
  const [isAddNoteActive, updateIsAddNoteActive] = useState<boolean>(false); 

  const [allAvailableRooms, ] = useState([
        {roomNumber: ' 12C', roomStatus: 'Available', occupantName: 'Dave Green'},
        {roomNumber: ' 12C', roomStatus: 'Available', occupantName: 'Dave Green'},
        {roomNumber: ' 12C', roomStatus: 'Available', occupantName: 'Dave Green'},
        {roomNumber: ' 12C', roomStatus: 'Available', occupantName: 'Dave Green'},
        {roomNumber: ' 12C', roomStatus: 'Available', occupantName: 'Dave Green'},
  ])

  const showSelectedRoom = (roomId: string)=>{
        updateIsAdmitPatientActive(false)
        updatePatientProfileVisibility(true)
  }

  const editPatientProfileFunc = () =>{
        updatePatientProfileVisibility(false);
        updatePatientEditState(true);  
  }

  const callUpdatedAllPatientData = () =>{
        fetchPatients()
  }

  return (
    <>
    {(isPatientProfileVisible && !patientEditState) && <div className="z-50 fixed top-0 left-0 w-full min-h-full flex justify-center items-center text-[#161616]">
               
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                 <div className="absolute inset-0 bg-gray-600 opacity-[0.50]"></div>
          </div>
          
          <div className="shadow-2xl relative px-6 py-8 w-[95%] h-[100%] bg-white border border-[#f7f7f7] rounded-[15px]">
            
                  <ConfirmationDialog
                        isOpen={isConfirmationDialogOpen}
                        title="Do you want to delete Patient profile?"
                        message="This action is irreversable"
                        onConfirm = {()=> {deletePatientFunction(activePatientProfile.patientID); fetchUpdatedActivePatientData(activePatientProfile.patientID)}} 
                        onCancel  = {()=> { setIsConfirmationDialogOpen(false)}}
                  />

                  <div className="w-full min-h-full flex space-x-2">
                        {/* patient details */}
                        <div className="w-[60%] flex flex-col space-y-2 ">
                                <div className="w-full flex space-x-4">
                                        <img 
                                        src={
                                        activePatientProfile.profile.patientImage 
                                        ? `${baseURL}/images/patientimages/${activePatientProfile.profile.patientImage}?v=${new Date(activePatientProfile.updatedAt || Date.now()).getTime()}`
                                        : userplaceholder
                                        } 
                                        alt="profile" 
                                        className="w-[120px] h-[120px] border border-inherit rounded-full" 
                                        />
                                    
                                        <div className='flex flex-col space-y-2'>
                                                <h3 className='text-[24px] font-bold text-black'>{}</h3>
                                                <div className='flex items-center flex-wrap w-full'>
                                                        <div className='flex items-center space-x-2 mr-[25px] mb-2'>
                                                                <img src={emailIcon} alt='emailIcon' className='w-[20px] h-[20px]' />
                                                                <a href={`mailto:grey@gmail.com`}  className='text-[#555555] text-[14px]'>grey@gmail.com</a>
                                                        </div>

                                                        <div className='flex items-center space-x-2 mr-[25px] mb-2'>
                                                                <img src={phoneIcon} alt='emailIcon' className='w-[20px] h-[20px]' />
                                                                <p className='text-[#555555] text-[14px]'>+234 80 456 3677</p>
                                                        </div>
                                                </div>
                                        </div>

                                </div>
                                
                                <div className='pt-2 flex items-center space-x-12 max-w-[500px]'>
                                        <div className='flex flex-col space-y-1'>
                                                <p className='text-[14px] font-[500] text-[#999999]'>Patient ID</p>
                                                <p className='text-[15px] text-[#555555] font-[500]'>DC-789</p>
                                        </div>

                                        <div className='flex flex-col space-y-1'>
                                                <p className='text-[14px] font-[500] text-[#999999] uppercase'>Age</p>
                                                <p className='text-[15px] text-[#555555] font-[500]'>23</p>
                                        </div>

                                        <div className='flex flex-col space-y-1'>
                                                <p className='text-[14px] font-[500] text-[#999999] uppercase'>Blood Type</p>
                                                <p className='text-[15px] text-[#555555] font-[500]'>O+</p>
                                        </div>

                                        <div className='flex flex-col space-y-1'>
                                                <p className='text-[14px] font-[500] text-[#999999] uppercase'>Genotype</p>
                                                <p className='text-[15px] text-[#555555] font-[500]'>AA</p>
                                        </div>
                                </div>

                                <div className='w-full flex border-b border-b-[#f1f1f1] pt-8 pb-4'>
                                        <div className='w-[170px] flex justify-center items-center p-1 min-h-[40px] border border-white rounded-md bg-gradient-to-r from-slate-500 to-slate-800 text-white'>
                                            Patient Information
                                        </div>
                                </div>

                                <div className="w-full h-full grid grid-cols-3 gap-[0.50rem]">
                                        {patientData.map((profile, index) =>(
                                            <div key={index} className='max-w-[400px] flex flex-col space-y-1'>
                                                    <p className='text-[14px] font-[500] text-[#999999]'>{profile.header}</p>
                                                    <p className='text-[15px] text-[#555555] font-[500]'>{profile.data}</p>  
                                            </div>
                                        ))}  
                                </div>
                
                                <div className='pt-2 w-full flex items-end space-x-2'>
                                        <button onClick={()=>{editPatientProfileFunc(); window.scrollTo(0, 400);}} className="transition-properties p-1 w-[130px] min-h-[40px] text-white border bg-yellow-500 text-[14px] border-yellow-500 rounded-md flex items-center justify-center space-x-1 hover:border-yellow-400 hover:bg-yellow-400">
                                            <MdEditSquare className = "text-white text-[13px]"/>
                                            <p>Edit Profile</p>
                                        </button>

                                        <button onClick={()=>{updatePatientProfile(); updateIsAdmitPatientActive(true);  window.scrollTo(0, 400);}} className="transition-properties p-1 w-[130px] min-h-[40px] bg-green-500 text-white border border-green-500 text-[14px] rounded-md flex items-center justify-center space-x-1 hover:border-green-400 hover:bg-green-400">
                                            <MdLocalHospital className = "text-white text-[13px]"/>
                                            <p>Admit Patient</p>
                                        </button>

                                        <button disabled = {buttonLoadingAnimation ? true : false}  onClick={()=> {setIsConfirmationDialogOpen(true)}} className="transition-properties w-[130px] h-[40px] bg-[#d42c31] text-white border border-[#d42c31] text-[14px] rounded-md flex items-center justify-center space-x-2 hover:border-[#c63439] hover:bg-[#c63439]">
                                                {buttonLoadingAnimation ? 
                                                                <img src = {whiteBtnLoader} className='w-[15px] h-[15px]' alt='loader'/>    
                                                        :
                                                                <div className="flex items-center justify-center space-x-2">
                                                                        <p>Delete Profile</p>
                                                                        <FaTrash className = "text-white text-[14px]"/>
                                                                </div>
                                                }
                                        </button>
                                </div>
                        </div>

                        {/* patient notes */}
                        <div className='relative w-[40%] min-h-[18rem] flex flex-col items-end'>

                                <div className="absolute w-full max-h-full flex flex-col items-end space-y-2"> 
                                        <button onClick={()=> {sessionStorage.removeItem('activePatientProfile'); updatePatientProfileVisibility(false); callUpdatedAllPatientData();}} className="transition-properties p-1 w-[100px] min-h-[40px] bg-black text-white border border-black text-[14px] rounded-md flex items-center justify-center space-x-2 hover:border-[#121212] hover:bg-[#121212]">
                                                <FaChevronDown className ='text-white text-[13px]'/>
                                                <p>Close</p>
                                        </button>        

                                        <div className="relative p-3 bg-gradient-to-r from-slate-800 to-slate-900 border border-white rounded-md w-full h-full overflow-x-hidden overflow-y-auto">
                                                
                                                <div className=" w-full flex justify-between items-center mb-2">
                                                        <h4 className="relative text-[13px] pb-2 text-[#bdbbbb]">Patient notes</h4>

                                                        <button onClick={()=> {updateIsAddNoteActive(true);}} className="max-w-[200px] min-h-[20px] px-2 py-1 text-[12px] border border-transparent rounded-md bg-gradient-to-r from-slate-300 to-slate-400 flex justify-center items-center">
                                                                Add note
                                                        </button>
                                                </div>
                                               
                                               {/* add note */}
                                                {isAddNoteActive ? <div className="mb-2 w-full min-h-[100px] p-2 flex flex-col space-y-[4rem] border border-[#5d5d5d] rounded-md">
                                                        <input type="text" className="bg-inherit outline-none text-white" placeholder="title e.g Constant Headaches " />
                                                        <textarea className="min-h-[90px] resize-none bg-inherit outline-none text-white" placeholder="Enter Note" />
                                                        <textarea className="min-h-[70px] resize-none bg-inherit outline-none text-white" placeholder="Drugs prescribed e.g Pracetamol, Lonart." />

                                                        <div className="w-full flex justify-end items-end space-x-2">
                                                                <button onClick={()=> {updateIsAddNoteActive(false);}} className="text-white max-w-[300px] min-h-[20px] px-2 py-1 text-[12px] border border-transparent rounded-md bg-gradient-to-r from-red-500 to-red-400 flex justify-center items-center">
                                                                        Cancel
                                                                </button>
                                                                <button onClick={()=> {updateIsAddNoteActive(false);}} className="text-white max-w-[300px] min-h-[20px] px-2 py-1 text-[12px] border border-transparent rounded-md bg-gradient-to-r from-green-500 to-emerald-400 flex justify-center items-center">
                                                                        Add
                                                                </button>
                                                        </div>
                                                </div> 
                                                :
                                                <div className="mb-2 w-full min-h-[100px] p-2 flex flex-col border border-[#5d5d5d] rounded-md">

                                                        <div className="w-full flex justify-between">
                                                                <h4 className="text-[16px] text-white font-bold">Stomach Cramps</h4> 
                                                                <div className="flex space-x-3 justify-end">
                                                                        <button><FaEdit className= 'text-white text-[17px]'/></button>
                                                                        <button><FaRegTrashCan className= 'text-red-500 text-[17px]'/></button>
                                                                </div>
                                                        </div>
                                                       
                                                        <p className="text-[13px] text-[#6f6f6f] tracking-wide">02/04/24</p>

                                                        <div className="w-full flex flex-col">
                                                                <p className="text-[14px] text-white">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta ducimus, quis dignissimos tempore repellat dolore! Eligendi sequi animi necessitatibus illo dignissimos, atque dolorum. Esse, ea incidunt. Eum laborum dignissimos laudantium?</p>

                                                                <div className="flex flex-wrap space-x-3 text-[#9f9d9d] text-[13px]">
                                                                        <p>Pandol 4mg</p>
                                                                        <p>Malaria Drip 20mg</p>
                                                                </div>
                                                        </div>
                                                </div> }                                               
                                        </div>
                                </div>

                        </div>

                      
                  </div>      
        </div> 
    </div>}
    

    {(isPatientProfileVisible === false && patientEditState === true) && 
        <EditPatient 
                updatePatientProfileState ={updatePatientProfileVisibility} 
                updateEditPatientState={updatePatientEditState}
                fetchUpdatedActivePatientData = {fetchUpdatedActivePatientData}
        />
        
    }
    {/* {   <AdmitPatients 
                isAdmitPatientActive ={isAdmitPatientActive} 
                allAvailableRooms={allAvailableRooms} 
                showSelectedRoom={showSelectedRoom}
        />
    } */}
    </>
  )
}

export default PatientProfile