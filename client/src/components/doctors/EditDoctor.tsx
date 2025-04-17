import Dropzone from 'react-dropzone';
import { useEffect, useState } from "react";
import axios from 'axios';

import { toast } from 'react-toastify';
import {AddDoctorFormInterface, EditDoctorProps} from '../DataTypes';
import {DoctorDropDownList} from "../globalComponents/DropDownList";
import ConfirmationDialog from '../globalComponents/ConfirmationDialog';
import {DoctorInputForm} from '../globalComponents/InputForm';
import { useGlobalContext } from '../../context/useGlobalContext';

import whiteBtnLoader from '../../images/buttonloaderwhite.svg';
import { FaChevronDown } from "react-icons/fa6";
import { MdSave } from "react-icons/md";
import { RiDeleteBin3Line } from "react-icons/ri";




const EditDoctor: React.FC<EditDoctorProps> = ({fetchUpdatedActiveDoctorData, updateDoctorProfileState, updateEditDoctorState }) => {
    
    //global variables
    const activeDoctorProfile = sessionStorage.getItem('activeDoctorProfile');
    const userToken = sessionStorage.getItem('userToken');
    const {baseURL} =  useGlobalContext();

    //component variables
    const [buttonLoadingAnimation, updateButtonLoadingAnimation] = useState<boolean>(false);
    const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [parsedDoctorID, updateParsedDoctorID] = useState<string>('');

    const dropdownContainer = [
        {buttonId: 'doctorSpecialty' , buttonName: 'Choose Specialty', listOptions : ['Pediatrics', 'Cardiology', 'Psychiatry', 'Internal Medicine', 'Obstetrics and Gynecology', 'Surgery', 'Anesthesiology', 'Radiology'] },
        {buttonId: 'doctorDegree' , buttonName: ' Choose Degree', listOptions : ['MD', 'DO', 'PharmD', 'MBBS'] }  ,  
        {buttonId: 'employmentType' , buttonName: ' Employment Type', listOptions : ['Full-time', 'Part-time'] }  ,      
        {buttonId: 'doctorDepartment' , buttonName: ' Choose Department', listOptions : ['General', 'Psychiatry', 'Obstetrics', 'Gynecology'] }  ,   
    ]

    const InputFormData = [
        {labelName: 'Doctor Name ', labelSpan: '*', inputValue: '', inputName: 'doctorName', inputType: 'text', placeholder: 'John Doe'},
        {labelName: 'Doctor Phone Number', labelSpan: '*',  inputValue: '', inputName: 'doctorPhone', inputType: 'tel', placeholder: '+234 90 346 4578'},
        {labelName: 'Doctor Email ',      labelSpan: '*',  inputName: 'doctorEmail',      inputType: 'text',      placeholder: 'grey@gmail.com'},
        {labelName: 'Doctor Age', labelSpan: '*',  inputValue: '',  inputName: 'doctorAge', inputType: 'number', placeholder: '40'},
        {labelName: 'Doctor Home Address ', labelSpan: '*',  inputValue: '',  inputName: 'doctorAddress', inputType: 'text', placeholder: '3 Fieldgreen Drive, Lagos'},
        {labelName: 'Doctor Join Date ', labelSpan: '*',  inputValue: '',  inputName: 'doctorJoinDate', inputType: 'date'},
    ]

    //get the active doctor profile from storage and perform component value updates
    useEffect(()=>{
        if(activeDoctorProfile){
            const activeDoctorProfileToObject = JSON.parse(activeDoctorProfile)
            updateParsedDoctorID(activeDoctorProfileToObject.doctorID)

            setIdImages(
                `${baseURL}/images/doctorimages/${activeDoctorProfileToObject.profile.doctorImage}?v=${new Date(activeDoctorProfileToObject.updatedAt || Date.now()).getTime()}`
            );              
            setUpdateDoctorForm((prevDoctorForm) => {
                let updatedDoctorForm = { ...prevDoctorForm };
                dropdownContainer.forEach((dropdown) => {
                        if (activeDoctorProfileToObject.hasOwnProperty(dropdown.buttonId)) {
                                updatedDoctorForm = {
                                        ...updatedDoctorForm,
                                        [dropdown.buttonId]: activeDoctorProfileToObject[dropdown.buttonId],
                                };
                        }
                });
                InputFormData.forEach((dropdown) => {
                        if (activeDoctorProfileToObject.hasOwnProperty(dropdown.inputName)) {
                                updatedDoctorForm = {
                                        ...updatedDoctorForm,
                                        doctorName: activeDoctorProfileToObject.profile.doctorName,
                                        doctorImage: activeDoctorProfileToObject.profile.doctorImage,
                                        [dropdown.inputName]: activeDoctorProfileToObject[dropdown.inputName],
                                };
                        }
                });
                return updatedDoctorForm;
            });  

        }
    }, [activeDoctorProfile])


    //dropzone for image upload
    const [Idimages, setIdImages] = useState<string>();


    const handleImageDrop = (acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
                const firstAcceptedFile = acceptedFiles[0];
                setSelectedFile(firstAcceptedFile);
                setIdImages(URL.createObjectURL(firstAcceptedFile)); 
        }    
    };

    //edit doctor form submit logic
    const [updateDoctorForm, setUpdateDoctorForm] = useState<AddDoctorFormInterface>({
                doctorSpecialty: '',
                doctorAddress: '',
                doctorPhone: '',
                doctorAge: '',
                doctorName:'',
                doctorDegree: '',
                employmentType: '',
                doctorDepartment: '',
                doctorEmail: '',
                doctorImage: '',
                doctorJoinDate: '',
    })

    const submitUpdateDoctorForm = async () =>{
        try {
                updateButtonLoadingAnimation(true)
                 
                const formData = new FormData();
                formData.append('doctorID', parsedDoctorID)

                
                // Append the image file
                if (selectedFile) {
                        formData.append("doctorImage", selectedFile);
                }

                // Append other form fields
                Object.entries(updateDoctorForm).forEach(([key, value]) => { 
                        formData.append(key, value);
                });

                const updateDoctorApiCall = await axios.post(`${baseURL}/api/user/updatedoctorprofile`, formData, {
                        headers: {
                                Authorization: `Bearer ${userToken}`,
                                'Content-Type': 'multipart/form-data',  
                        },
                });

                const updateDoctorResponseData = updateDoctorApiCall.data.payload;
                
                if(updateDoctorApiCall.status === 200){             
                        toast.success(updateDoctorResponseData)
                        updateEditDoctorState(false)
                        updateButtonLoadingAnimation(false)
                        updateDoctorProfileState(true) 
                        fetchUpdatedActiveDoctorData(parsedDoctorID)

                } else{
                        toast.error(updateDoctorResponseData)
                        updateEditDoctorState(false)
                        updateDoctorProfileState(true)
                        updateButtonLoadingAnimation(false)   
                        
                } 

            } catch (error) {
                if (axios.isAxiosError(error)) {
                        if (error.response && error.response.data && error.response.data.payload) {
                                toast.error(`Error: ${error.response.data.payload}`);
                        } else {
                                toast.error('Unnavailable request, please try again');
                        }
                        updateButtonLoadingAnimation(false);
                } else {
                        console.error('Unexpected error:', error);
                        toast.error('An unexpected error occurred');
                        updateButtonLoadingAnimation(false);
                }
            }
    }
      

  return (
    <>
        <div className='z-50 fixed top-0 left-0 w-full min-h-full flex justify-center items-center text-[#161616]'>
                
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                        <div className="absolute inset-0 bg-gray-600 opacity-[0.50]"></div>
                </div>
                
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
                                                        <div {...getRootProps()} className="relative max-w-[120px] min-h-[100px] flex justify-center items-center p-2 border border-[#e9e9e9] rounded-sm">
                                                                <input {...getInputProps()} />
                                                                {!Idimages && <p className='text-[14px]'>Click/Drag and drop here to select doctor image.</p>}
                                                                {Idimages &&  <img src={Idimages} alt='Doctor Image' className='transition-properties w-full h-full object-cover rounded-md' />}
                                                        </div>
                                                )}
                                        </Dropzone>  

                                        {Idimages != '' && 
                                                <div className='flex flex-col space-y-1 pl-[1rem]'>
                                                        <button 
                                                                onClick={()=>{setIdImages('')}}
                                                                className="transition-properties w-[23px] h-[23px] bg-red-600 text-white border border-red-600 text-[14px] rounded-md flex items-center justify-center space-x-2 hover:bg-red-400"
                                                        >
                                                                <RiDeleteBin3Line className ="text-white"/>  
                                                        </button>
                                                </div>

                                        }
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lx:grid-cols-4 gap-[1rem]">
                                        <DoctorInputForm 
                                                prevValues = {updateDoctorForm}  
                                                formValue = {updateDoctorForm} 
                                                onChangeFunc ={setUpdateDoctorForm} 
                                                InputFormData = {InputFormData} 
                                        />

                                        <DoctorDropDownList 
                                                doctorInitialValues={updateDoctorForm} 
                                                allDropDownContainer = {dropdownContainer}   
                                                setSubmitFormDropdown = {setUpdateDoctorForm}
                                        />
                                </div>
                                                        

                                <div className="w-full flex justify-end items-end space-x-4 py-6">
                                        <button disabled = {buttonLoadingAnimation ? true : false}  onClick={()=> {submitUpdateDoctorForm(); window.scrollTo(0, 400);}} className="transition-properties w-[130px] h-[40px] bg-green-600 text-white border border-green-600 text-[14px] rounded-md flex items-center justify-center space-x-2 hover:bg-green-500">
                                                {buttonLoadingAnimation ? 
                                                        <img src = {whiteBtnLoader} className='w-[15px] h-[15px]' alt='loader'/>    
                                                :
                                                        <div className="flex items-center justify-center space-x-2">
                                                                <MdSave className ='text-white text-[16px]'/>
                                                                <p>Update</p>
                                                        </div>
                                                }
                                        </button>

                                        <button onClick={()=> {updateEditDoctorState(false); updateDoctorProfileState(true);}} className="transition-properties w-[130px] h-[40px] bg-black text-white border border-black text-[14px] rounded-md flex items-center justify-center space-x-2 hover:border-[#121212] hover:bg-[#121212]">
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