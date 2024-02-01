import Dropzone from 'react-dropzone';
import { useState } from "react";

import userplaceholder from '../../images/userplaceholderlogo.png'

import DropDownList from "../globalComponents/DropDownList";
import ConfirmationDialog from '../globalComponents/ConfirmationDialog';
// import Calendar from 'react-calendar';

import { FaChevronDown } from "react-icons/fa6";
import { MdSave } from "react-icons/md";
import { RiDeleteBin3Line } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";

interface EditDoctorProps {
        updateDoctorProfileForm: React.Dispatch<React.SetStateAction<boolean>>,
        updateEditDoctorForm: React.Dispatch<React.SetStateAction<boolean>>,
}

const EditDoctor: React.FC<EditDoctorProps> = ({updateDoctorProfileForm, updateEditDoctorForm }) => {
    
    const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] = useState(false);
    const dropdownContainer = [
        {buttonId: 'doctorSpecialty' , buttonName: 'Choose Specialty', listOptions : ['Pediatrics', 'Cardiology', 'Psychiatry', 'Internal Medicine', 'Obstetrics and Gynecology', 'Surgery', 'Anesthesiology', 'Radiology'] },
        {buttonId: 'doctorDegree' , buttonName: ' Choose Degree', listOptions : ['MD', 'DO', 'PharmD', 'MBBS'] }  ,  
        {buttonId: 'doctorDept' , buttonName: ' Choose Department', listOptions : ['General', 'Psychiatry', 'Obstetrics', 'Gynecology'] }  ,   
    ]


    //dropzone for image upload
    const [Idimages, setIdImages] = useState<string>('');

    const handleImageDrop = (acceptedFiles: File[]) => {
            if (acceptedFiles.length > 0) {
                    const firstAcceptedFile = acceptedFiles[0];

                    const imageUrl = URL.createObjectURL(firstAcceptedFile);
                
                    setIdImages(imageUrl);
            }    
    };


    //edit doctor form logic
    const [addDoctorForm, setAddDoctorForm] = useState({
        doctorSpecialty: '',
        doctorAddress: '',
        doctorPhone: '',
        doctorAge: '',
        doctorName:'',
        doctorDegree: '',
        employmentType: '',
        doctorDept: '',
    })

 
  return (
    <>
        <div className='z-50 absolute top-0 left-0 w-full min-h-full flex justify-center items-center text-[#161616]'>
                <div className="shadow-2xl relative px-4 py-6 w-[95%] h-[100%] bg-white border border-[#f7f7f7] rounded-[15px]">
                        <ConfirmationDialog
                                isOpen={isConfirmationDialogOpen}
                                title="Do you want to delete Doctor image?"
                                message="This action is irreversable"
                                onConfirm = {()=> {setIsConfirmationDialogOpen(false); }}
                                onCancel  = {()=> {setIsConfirmationDialogOpen(false); }}
                        />


                        <div className="w-full min-h-full flex flex-col space-y-[1rem]">

                                <div className="relative w-full min-h-[1rem] flex items-center space-x-1">
                                        <Dropzone onDrop={handleImageDrop} accept="image/jpeg, image/png, image/jpg, image/webp" >
                                                {({ getRootProps, getInputProps }) => (
                                                        <div {...getRootProps()} className="relative max-w-[150px] min-h-[150px]  flex justify-center items-center p-2 border border-white  rounded-full">
                                                                <input {...getInputProps()} />
                                                                <img src={Idimages !== '' ? Idimages : userplaceholder} alt='Selected Image' className='transition-properties w-full h-full object-cover rounded-md' />
                                                        </div>
                                                )}
                                        </Dropzone>  

                                        {Idimages == '' && 
                                                <div className='flex flex-col space-y-1'>
                                                        <button 
                                                                onClick={()=>{setIdImages(''); setIsConfirmationDialogOpen(true)}}
                                                                className="transition-properties w-[23px] h-[23px] bg-red-600 text-white border border-red-600 text-[14px] rounded-md flex items-center justify-center space-x-2 hover:bg-red-400"
                                                        >
                                                                <RiDeleteBin3Line className ="text-white"/>  
                                                        </button>

                                                        <button 
                                                                onClick={()=>setIdImages('')}
                                                                className="transition-properties w-[23px] h-[23px] bg-black text-white border border-black text-[14px] rounded-md flex items-center justify-center space-x-2 hover:bg-[#191919]"
                                                        >
                                                                <CiEdit className ="text-white"/>  
                                                        </button>
                                                </div>

                                        }
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lx:grid-cols-4 gap-[1rem]">
                                        <div className='flex flex-col justify-end space-y-1'>
                                                <label className='text-[14px] text-[#636363]'>Doctor Name <span>*</span></label>
                                                <input type="text" name='doctorName' 
                                                        // value={addDoctorForm.doctorName}
                                                        placeholder='John Doe'
                                                        className='bg-inherit px-2 border-[#e1e1e1] border-[1px] rounded-[2px] max-w-[250px] h-[42px] text-black text-[16px] focus:border-greyMainBackground focus:bg-greyMainBackground focus:outline-none' 
                                                />
                                        </div>

                                        <div className='flex flex-col justify-end space-y-1'>
                                                <label className='text-[14px] text-[#636363]'>Doctor Phone Number <span>*</span></label>
                                                <input type="tel" name='doctorPhone' 
                                                        // value={addDoctorForm.doctorPhone}
                                                        placeholder='+234 90 346 4578'
                                                        className='bg-inherit px-2 border-[#e1e1e1] border-[1px] rounded-[2px] max-w-[250px] h-[42px] text-black text-[16px] focus:border-greyMainBackground focus:bg-greyMainBackground focus:outline-none' 
                                                />
                                        </div>

                                        <div className='flex flex-col justify-end space-y-1'>
                                                <label className='text-[14px] text-[#636363]'>Doctor Age <span>*</span></label>
                                                <input type="number" name='doctorAge' 
                                                        // value={addDoctorForm.doctorAge}
                                                        placeholder='40'
                                                        className='bg-inherit px-2 border-[#e1e1e1] border-[1px] rounded-[2px] max-w-[130px] h-[42px] text-black text-[16px] focus:border-greyMainBackground focus:bg-greyMainBackground focus:outline-none' 
                                                />
                                        </div>

                                        <div className='flex flex-col justify-end space-y-1'>
                                                <label className='text-[14px] text-[#636363]'>Doctor Home Address <span>*</span></label>
                                                <input type="text" name=' doctorAddress' 
                                                        // value={addDoctorForm.doctorAddress}
                                                        placeholder='3 Fieldgreen Drive, Lagos'
                                                        className='bg-inherit px-2 border-[#e1e1e1] border-[1px] rounded-[2px] max-w-[250px] h-[42px] text-black text-[16px] focus:border-greyMainBackground focus:bg-greyMainBackground focus:outline-none' 
                                                />
                                        </div>

                                        <DropDownList allDropDownContainer = {dropdownContainer}   setSubmitFormDropdown = {setAddDoctorForm}/>
                                </div>
                                                        

                                <div className="w-full flex justify-end items-end space-x-4 py-6">
                                        <button onClick={()=> {updateEditDoctorForm(false); updateDoctorProfileForm(true); window.scrollTo(0, 400);}} className="transition-properties w-[130px] h-[40px] bg-green-600 text-white border border-green-600 text-[14px] rounded-md flex items-center justify-center space-x-2 hover:bg-green-500">
                                                <MdSave className ='text-white text-[16px]'/>
                                                <p>Update</p>
                                        </button>

                                        <button onClick={()=>  {updateEditDoctorForm(false); updateDoctorProfileForm(true); window.scrollTo(0, 400);}} className="transition-properties w-[130px] h-[40px] bg-black text-white border border-black text-[14px] rounded-md flex items-center justify-center space-x-2 hover:border-[#121212] hover:bg-[#121212]">
                                                <FaChevronDown className ='text-white text-[14px]'/>
                                                <p>Close</p>
                                        </button>
                                </div>

                        </div>
                </div>    
        </div>
    </>
  )
}

export default EditDoctor