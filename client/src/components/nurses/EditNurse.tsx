import Dropzone from 'react-dropzone';
import { useState } from "react";

import userplaceholder from '../../images/userplaceholderlogo.png'

import {DropDownListNurse} from "../globalComponents/DropDownList";
import ConfirmationDialog from '../globalComponents/ConfirmationDialog';
import InputForm from '../globalComponents/InputForm';

import { FaChevronDown } from "react-icons/fa6";
import { MdSave } from "react-icons/md";
import { RiDeleteBin3Line } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";

interface EditNurseProps {
        updateNurseProfileForm: React.Dispatch<React.SetStateAction<boolean>>,
        updateEditNurseForm: React.Dispatch<React.SetStateAction<boolean>>,
}

const EditNurse: React.FC<EditNurseProps> = ({updateNurseProfileForm, updateEditNurseForm }) => {
 
    //
    const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] = useState(false);
    const dropdownContainer = [
        {buttonId: 'nurseTimeRole' , buttonName: 'Choose Shift', listOptions : ['Day', 'Afternoon', 'Night'] },
        {buttonId: 'nurseDegree' , buttonName: ' Choose Degree', listOptions : ['MD', 'DO', 'PharmD', 'MBBS'] }  , 
    ]

    const [InputFormData, updateInputFormData] = useState([
        {labelName: 'Nurse Name ', labelSpan: '*', inputName: 'nurseName', inputType: 'text', placeholder: 'John Doe'},
        {labelName: 'Nurse Phone ', labelSpan: '*', inputName: 'nursePhone', inputType: 'tel', placeholder: '+234 90 346 4578'},
        {labelName: 'Nurse Age', labelSpan: '*',  inputName: 'nurseAge', inputType: 'number', placeholder: '40'},
        {labelName: 'Nurse Birth Date ', labelSpan: '*',  inputName: 'nurseDateOfBirth',  inputType: 'date'},
        {labelName: 'Nurse Join Date ', labelSpan: '*',  inputName: 'nurseJoinDate', inputType: 'date'},
    ])


    //dropzone for image upload
    const [Idimages, setIdImages] = useState<string>('');

    const handleImageDrop = (acceptedFiles: File[]) => {
            if (acceptedFiles.length > 0) {
                    const firstAcceptedFile = acceptedFiles[0];

                    const imageUrl = URL.createObjectURL(firstAcceptedFile);
                
                    setIdImages(imageUrl);
            }    
    };


    //edit nurse form submit logic
    const [addNurseForm, setAddNurseForm] = useState({
        nurseName: '',
        nurseImage: '',
        nurseAge: '',
        nurseDateOfBirth: '',
        nurseTimeRole: '',
        nurseDegree: '',
        nurseJoinDate: '',
        nurseID: '',
        nurseEmail: '',
        nursePhone: '',
    })





  return (
    <>
        <div className='z-50 fixed top-0 left-0 w-full min-h-full flex justify-center items-center text-[#161616]'>
                
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                        <div className="absolute inset-0 bg-gray-600 opacity-[0.50]"></div>
                </div>
                
                <div className="shadow-2xl relative px-4 py-6 w-[95%] h-[100%] bg-white border border-[#f7f7f7] rounded-[15px]">
                        <ConfirmationDialog
                                isOpen={isConfirmationDialogOpen}
                                title="Do you want to delete Nurse image?"
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


                                        <InputForm InputFormData = {InputFormData} />

                                        <DropDownListNurse allNurseDropDownContainer = {dropdownContainer}   setNurseSubmitFormDropdown = {setAddNurseForm}/>
                                </div>
                                                        

                                <div className="w-full flex justify-end items-end space-x-4 py-6">
                                        <button onClick={()=> {updateEditNurseForm(false); updateNurseProfileForm(true); window.scrollTo(0, 400);}} className="transition-properties w-[130px] h-[40px] bg-green-600 text-white border border-green-600 text-[14px] rounded-md flex items-center justify-center space-x-2 hover:bg-green-500">
                                                <MdSave className ='text-white text-[16px]'/>
                                                <p>Update</p>
                                        </button>

                                        <button onClick={()=>  {updateEditNurseForm(false); updateNurseProfileForm(true); window.scrollTo(0, 400);}} className="transition-properties w-[130px] h-[40px] bg-black text-white border border-black text-[14px] rounded-md flex items-center justify-center space-x-2 hover:border-[#121212] hover:bg-[#121212]">
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

export default EditNurse