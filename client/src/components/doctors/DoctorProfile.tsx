
import {DoctorProfileProps} from '../DataTypes';
import EditDoctor from './EditDoctor';
import ConfirmationDialog from '../globalComponents/ConfirmationDialog';

import userplaceholder from '../../images/userplaceholderlogo.png';
import emailIcon from '../../images/mailicon.png';
import phoneIcon from '../../images/mobileicon.png';
import addressIcon from '../../images/locationicon.png';
import whiteBtnLoader from '../../images/buttonloaderwhite.svg';

import { FaTrash } from "react-icons/fa";
import { MdEditSquare } from "react-icons/md";
import { FaChevronDown } from "react-icons/fa6";
// import { useState } from 'react';


const DoctorProfile: React.FC<DoctorProfileProps> = ({activeDoctor, updateEditDoctorState, buttonLoadingAnimation, setIsConfirmationDialogOpen, deleteDoctorFunction, isConfirmationDialogOpen, isDoctorProfileVisible, updateProfileVisibility, doctorData, doctorEditState}) => {
  
  const editDoctorProfileFunc = () =>{
        updateProfileVisibility(false);
        updateEditDoctorState(true);  
  }

  return (
    <>
    {(isDoctorProfileVisible && !doctorEditState) && <div className="z-50 fixed top-0 left-0 w-full min-h-full flex justify-center items-center text-[#161616]">
          
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                 <div className="absolute inset-0 bg-gray-600 opacity-[0.50]"></div>
          </div>
          
          
          <div className="shadow-2xl relative px-6 py-8 w-[95%] h-[100%] bg-white border border-[#f7f7f7] rounded-[15px]">
            
                  <ConfirmationDialog
                        isOpen={isConfirmationDialogOpen}
                        title     = "Do you want to delete Doctor profile?"
                        message   = "This action is irreversable"
                        onConfirm = {()=> deleteDoctorFunction(activeDoctor.doctorID)} 
                        onCancel  = {()=> {sessionStorage.removeItem('activeDoctorProfile'); setIsConfirmationDialogOpen(false);  }}
                  />


                  <div className="w-full min-h-full flex flex-col space-y-[1rem]">
                        <div className="w-full flex space-x-6 ">
                                <img src={activeDoctor.profile.doctorImage? activeDoctor.profile.doctorImage : userplaceholder} alt="profile" className="w-[120px] h-[120px] border border-inherit rounded-full" />

                                <div className='flex flex-col space-y-2'> 
                                        <div className='flex items-center space-x-1'>
                                                <h3 className='text-[24px] font-bold text-black'>{activeDoctor.profile.doctorName}</h3>
                                                <p className='text-[20px] text-[#555555]'>({activeDoctor.doctorSpecialty})</p>
                                        </div>

                                        <div className='flex items-center max-w-[700px]'>
                                                <div className='flex items-center space-x-2 mr-[25px] mb-2'>
                                                        <img src={emailIcon} alt='emailIcon' className='w-[20px] h-[20px]' />
                                                        <a href={`mailto: ${activeDoctor.doctorEmail}`}  className='text-[#555555] text-[14px]'>{activeDoctor.doctorEmail}</a>
                                                </div>

                                                <div className='flex items-center space-x-2 mr-[25px] mb-2'>
                                                        <img src={phoneIcon} alt='emailIcon' className='w-[20px] h-[20px]' />
                                                        <p className='text-[#555555] text-[14px]'>{activeDoctor.doctorPhone}</p>
                                                </div>

                                                <div className='flex items-center space-x-2 mb-2'>
                                                        <img src={addressIcon} alt='emailIcon' className='w-[30px] h-[30px]' />
                                                        <p className='text-[#555555] text-[14px]'>{activeDoctor.doctorAddress}</p>
                                                </div>
                                        </div>

                                        <div className='pt-2 flex items-center space-x-12 max-w-[500px]'>
                                                <div className='flex flex-col space-y-1'>
                                                        <p className='text-[14px] font-[500] text-[#999999]'>EMPLOYEE ID</p>
                                                        <p className='text-[15px] text-[#555555] font-[500]'>{activeDoctor.doctorID}</p>
                                                </div>

                                                <div className='flex flex-col space-y-1'>
                                                        <p className='text-[14px] font-[500] text-[#999999] uppercase'>Department</p>
                                                        <p className='text-[15px] text-[#555555] font-[500]'>{activeDoctor.doctorDepartment}</p>
                                                </div>
                                        </div>
                                </div>
                        </div>

                        <div className='w-full flex border-b border-b-[#f1f1f1] pt-8 pb-4'>
                              <div className='w-[170px] flex justify-center items-center p-1 min-h-[40px] border border-white rounded-md bg-gradient-to-r from-slate-500 to-slate-800 text-white'>
                                  Doctor Information
                              </div>
                        </div>
                        
                        <div className='w-full min-h-[10rem] grid grid-cols-5 gap-[1rem]'>
                              {doctorData.map((profile, index) =>(
                                  <div key={index} className='flex flex-col space-y-3'>
                                        <p className='text-[14px] font-[500] text-[#999999]'>{profile.header}</p>
                                        <p className='text-[15px] text-[#555555] font-[500]'>{profile.data}</p>  
                                  </div>
                              ))}                          
                        </div>

                        <div className='w-full flex justify-end items-end space-x-4'>
                                <button onClick={()=>{sessionStorage.removeItem('activeDoctorProfile'); updateProfileVisibility(false);}} className="transition-properties w-[130px] h-[40px] bg-black text-white border border-black text-[14px] rounded-md flex items-center justify-center space-x-2 hover:border-[#121212] hover:bg-[#121212]">
                                        <FaChevronDown className ='text-white text-[14px]'/>
                                        <p>Close</p>
                                </button>

                                <button onClick={()=> editDoctorProfileFunc()} className="transition-properties w-[130px] h-[40px] text-white border bg-yellow-500 text-[14px] border-yellow-500 rounded-md flex items-center justify-center space-x-2 hover:border-yellow-400 hover:bg-yellow-400">
                                        <MdEditSquare className = "text-white text-[14px]"/>
                                        <p>Edit Profile</p>
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
        </div> 
    </div>}


    {(doctorEditState) && <EditDoctor updateProfileVisibility = {updateProfileVisibility}  updateDoctorProfileState ={updateProfileVisibility} updateEditDoctorState={updateEditDoctorState}/>}
    </>
  )
}

export default DoctorProfile