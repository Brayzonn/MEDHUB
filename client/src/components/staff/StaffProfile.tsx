import { useState } from "react";

import EditStaff from "./EditStaff";
import ConfirmationDialog from '../globalComponents/ConfirmationDialog';

import userplaceholder from '../../images/userplaceholderlogo.png';
import emailIcon from '../../images/mailicon.png';
import phoneIcon from '../../images/mobileicon.png';
import addressIcon from '../../images/locationicon.png';

import { FaTrash } from "react-icons/fa";
import { MdEditSquare } from "react-icons/md";
import { FaChevronDown } from "react-icons/fa6";


interface StaffProfileListProps{
    header: string ,
    data: string
}
interface StaffProfileProps {
    staffData: StaffProfileListProps[],
    updateStaffEditState: React.Dispatch<React.SetStateAction<boolean>>,
    staffEditState: boolean,
    isStaffProfileVisible: boolean,
    updateStaffProfileVisibility: React.Dispatch<React.SetStateAction<boolean>>,
}

const StaffProfile:React.FC<StaffProfileProps> = ({isStaffProfileVisible, updateStaffProfileVisibility, staffData, updateStaffEditState, staffEditState}) => {
  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] = useState(false);

  return (
    <>
    {(isStaffProfileVisible && !staffEditState) && <div className="z-50 fixed top-0 left-0 w-full min-h-full flex justify-center items-center text-[#161616]">
          
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                 <div className="absolute inset-0 bg-gray-600 opacity-[0.50]"></div>
          </div>
          
          <div className="shadow-2xl relative px-6 py-8 w-[95%] h-[100%] bg-white border border-[#f7f7f7] rounded-[15px]">
            
                  <ConfirmationDialog
                        isOpen={isConfirmationDialogOpen}
                        title="Do you want to delete Staff profile?"
                        message="This action is irreversable"
                        onConfirm = {()=> {setIsConfirmationDialogOpen(false); }}
                        onCancel  = {()=> {setIsConfirmationDialogOpen(false); }}
                  />


                  <div className="w-full min-h-full flex flex-col space-y-[1rem]">
                        <div className="w-full flex space-x-6 ">
                                <img src={userplaceholder} alt="profile" className="w-[120px] h-[120px] border border-inherit rounded-full" />

                                <div className='flex flex-col space-y-2'>
                                        <div className='flex items-center space-x-1'>
                                                <h3 className='text-[24px] font-bold text-black'>John Doe</h3>
                                                <p className='text-[20px] text-[#555555]'>(Pediatrician)</p>
                                        </div>

                                        <div className='flex items-center flex-wrap max-w-[500px]'>
                                                <div className='flex items-center space-x-2 mr-[25px] mb-2'>
                                                        <img src={emailIcon} alt='emailIcon' className='w-[20px] h-[20px]' />
                                                        <a href={`mailto:grey@gmail.com`}  className='text-[#555555] text-[14px]'>grey@gmail.com</a>
                                                </div>

                                                <div className='flex items-center space-x-2 mr-[25px] mb-2'>
                                                        <img src={phoneIcon} alt='emailIcon' className='w-[20px] h-[20px]' />
                                                        <p className='text-[#555555] text-[14px]'>+234 80 456 3677</p>
                                                </div>

                                                <div className='flex items-center space-x-2 mb-2'>
                                                        <img src={addressIcon} alt='emailIcon' className='w-[30px] h-[30px]' />
                                                        <p className='text-[#555555] text-[14px]'>+234 80 456 3677</p>
                                                </div>
                                        </div>

                                        <div className='pt-2 flex items-center space-x-12 max-w-[500px]'>
                                                <div className='flex flex-col space-y-1'>
                                                        <p className='text-[14px] font-[500] text-[#999999]'>EMPLOYEE ID</p>
                                                        <p className='text-[15px] text-[#555555] font-[500]'>DC-789</p>
                                                </div>

                                                <div className='flex flex-col space-y-1'>
                                                        <p className='text-[14px] font-[500] text-[#999999] uppercase'>Department</p>
                                                        <p className='text-[15px] text-[#555555] font-[500]'>General Medicine</p>
                                                </div>
                                        </div>
                                </div>
                        </div>

                        <div className='w-full flex border-b border-b-[#f1f1f1] pt-8 pb-4'>
                              <div className='w-[170px] flex justify-center items-center p-1 min-h-[40px] border border-white rounded-md bg-gradient-to-r from-slate-500 to-slate-800 text-white'>
                                  Nurse Information
                              </div>
                        </div>
                        
                        <div className='w-full min-h-[18rem] grid grid-cols-5 gap-[1rem]'>
                              {staffData.map((profile, index) =>(
                                  <div key={index} className='flex flex-col space-y-3'>
                                        <p className='text-[14px] font-[500] text-[#999999]'>{profile.header}</p>
                                        <p className='text-[15px] text-[#555555] font-[500]'>{profile.data}</p>  
                                  </div>
                              ))}                          
                        </div>

                        <div className='w-full flex justify-end items-end space-x-4'>
                                <button onClick={()=> updateStaffProfileVisibility(false)} className="transition-properties w-[130px] h-[40px] bg-black text-white border border-black text-[14px] rounded-md flex items-center justify-center space-x-2 hover:border-[#121212] hover:bg-[#121212]">
                                      <FaChevronDown className ='text-white text-[14px]'/>
                                      <p>Close</p>
                                </button>

                                <button onClick={()=>{updateStaffEditState(true); window.scrollTo(0, 400);}} className="transition-properties w-[130px] h-[40px] text-white border bg-yellow-500 text-[14px] border-yellow-500 rounded-md flex items-center justify-center space-x-2 hover:border-yellow-400 hover:bg-yellow-400">
                                      <MdEditSquare className = "text-white text-[14px]"/>
                                      <p>Edit Profile</p>
                                </button>

                                <button onClick={()=> {setIsConfirmationDialogOpen(true)}} className="transition-properties w-[130px] h-[40px] bg-[#d42c31] text-white border border-[#d42c31] text-[14px] rounded-md flex items-center justify-center space-x-2 hover:border-[#c63439] hover:bg-[#c63439]">
                                      <FaTrash className = "text-white text-[14px]"/>
                                      <p>Delete Profile</p>
                                </button>
                        </div>
                  </div>      
        </div> 
    </div>}


    {(isStaffProfileVisible && staffEditState) && <EditStaff updateStaffProfileForm ={updateStaffProfileVisibility} updateEditStaffForm={updateStaffEditState}/>}
    </>
  )
}

export default StaffProfile