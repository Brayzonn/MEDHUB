import Dropzone from 'react-dropzone';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

import whiteBtnLoader from '../../images/buttonloaderwhite.svg';
import userplaceholder from '../../images/userplaceholderlogo.png'

import {PatientDropDownList} from "../globalComponents/DropDownList";
import ConfirmationDialog from '../globalComponents/ConfirmationDialog';
import {PatientInputForm} from '../globalComponents/InputForm';
import { useGlobalContext } from '../../context/useGlobalContext';

import {AddPatientFormInterface, EditPatientProps} from '../DataTypes';

import { FaChevronDown } from "react-icons/fa6";
import { MdSave } from "react-icons/md";
import { RiDeleteBin3Line } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";


const EditPatient: React.FC<EditPatientProps> = ({fetchUpdatedActivePatientData, updatePatientProfileState, updateEditPatientState}) => {

        //global variables
        const activePatientProfile = sessionStorage.getItem('activePatientProfile');
        const userToken = sessionStorage.getItem('userToken');
        const {baseURL} =  useGlobalContext();
        const navigate = useNavigate();


        const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] = useState(false);
        const [buttonLoadingAnimation, updateButtonLoadingAnimation] = useState<boolean>(false);    
        const [selectedFile, setSelectedFile] = useState<File | null>(null);
        const [parsedPatientID, updateParsedPatientID] = useState<string>('');


        const dropdownContainer = [
                {buttonId: 'patientEMO' , buttonName: 'EMO', listOptions : ['YARN Construction', 'Grey Finances', 'Chelsea FC'] },
                {buttonId: 'patientBloodType' , buttonName: 'Blood Type', listOptions : ['O+', 'O-'] }  , 
                {buttonId: 'patientGenotype' , buttonName: 'Genotype', listOptions : ['AA', 'AS', 'SS'] }  ,   
        ]

        const [InputFormData] = useState([
                {labelName: 'Patient Name ', labelSpan: '*', inputName: 'patientName', inputType: 'text'},
                {labelName: 'Age', labelSpan: '*', inputName: 'patientAge', inputType: 'number'},
                {labelName: 'Medical Conditions', labelSpan: '*', inputName: 'patientConditions', inputType: 'text'},
                {labelName: 'Phone Number', labelSpan: '*', inputName: 'patientPhoneNumber', inputType: 'tel'},
                {labelName: 'Email', labelSpan: '*', inputName: 'patientEmail', inputType: 'email'},
                {labelName: 'Height(inches)', labelSpan: '*', inputName: 'patientHeight', inputType: 'number'},
                {labelName: 'Weight(kg)', labelSpan: '*', inputName: 'patientWeight', inputType: 'number'},
                {labelName: 'Birth Date ', labelSpan: '*', inputName: 'patientBirthDate', inputType: 'date'},
                {labelName: 'Join Date', labelSpan: '*', inputName: 'patientJoinDate', inputType: 'date'},  
        ])


        useEffect(()=>{
                if(activePatientProfile){
                    const activePatientProfileToObject = JSON.parse(activePatientProfile)
                    updateParsedPatientID(activePatientProfileToObject.patientID)
                    setIdImages(
                        `${activePatientProfileToObject.profile.patientImage}?v=${new Date(activePatientProfileToObject.updatedAt || Date.now()).getTime()}`
                    ); 
                    

                    setUpdatePatientForm((prevPatientForm) => {
                        let updatedPatientForm = { ...prevPatientForm };
                        dropdownContainer.forEach((dropdown) => {
                                if (activePatientProfileToObject.hasOwnProperty(dropdown.buttonId)) {
                                        updatedPatientForm = {
                                                ...updatedPatientForm,
                                                [dropdown.buttonId]: activePatientProfileToObject[dropdown.buttonId],
                                        };
                                }
                        });
                        InputFormData.forEach((dropdown) => {
                                if (activePatientProfileToObject.hasOwnProperty(dropdown.inputName)) {
                                        updatedPatientForm = {
                                                ...updatedPatientForm,
                                                patientName: activePatientProfileToObject.profile.patientName,
                                                patientImage: activePatientProfileToObject.profile.patientImage,
                                                [dropdown.inputName]: activePatientProfileToObject[dropdown.inputName],
                                        };
                                }
                        });
                        return updatedPatientForm;
                    });  
                }
        }, [activePatientProfile]) 


        //dropzone for image upload
        const [Idimages, setIdImages] = useState<string>();

        const handleImageDrop = (acceptedFiles: File[]) => { 
                if (acceptedFiles.length > 0) {
                        const firstAcceptedFile = acceptedFiles[0];
                        setSelectedFile(firstAcceptedFile);
                        setIdImages(URL.createObjectURL(firstAcceptedFile));     
                }    
        };

        //edit patient form submit logic
        const [updatePatientForm, setUpdatePatientForm] = useState<AddPatientFormInterface>({
                patientName: '', 
                patientImage: '', 
                patientAge: '',
                patientBloodType: '',
                patientHeight: '',
                patientGenotype: '',
                patientWeight: '',
                patientConditions: [''],
                patientJoinDate: '',
                patientBirthDate: '',
                patientPhoneNumber: '', 
                patientEmail: '',
                patientEMO: '',
        })

        const submitUpdatedPatientProfile = async () => {

                try {
                        updateButtonLoadingAnimation(true)
                        window.scrollTo(0, 400)

                        const formData = new FormData();
                        formData.append('patientID', parsedPatientID)

                        // Append the image file
                        if (selectedFile) {
                                formData.append("patientImage", selectedFile);
                        }

                        // Append other form fields
                        const {patientImage, ...updatedPatientForm} = updatePatientForm

                        Object.entries(updatedPatientForm).forEach(([key, value]) => {
                                if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
                                        formData.append(key, String(value));
                                } else if (Array.isArray(value)) {
                                        value.forEach((item, index) => {
                                                formData.append(`${key}[${index}]`, item); 
                                        });
                                } 
                        });
                                            
                        const updatePatientApiCall = await axios.post(`${baseURL}/api/user/updatepatientprofile`, formData, {
                                headers: {
                                        Authorization: `Bearer ${userToken}`,
                                        'Content-Type': 'multipart/form-data',  
                                },
                        });

                        const updatePatientResponseData = updatePatientApiCall.data.payload;
                        if(updatePatientApiCall.status === 200){             
                                toast.success(updatePatientResponseData)
                                updateEditPatientState(false)
                                updateButtonLoadingAnimation(false)
                                updatePatientProfileState(true) 
                                fetchUpdatedActivePatientData(parsedPatientID)
                        }  
                        else {
                                toast.error('Details could not be updated')
                                updateEditPatientState(false)
                                updatePatientProfileState(true)
                                updateButtonLoadingAnimation(false)
                        } 
                } catch (error) {
                        if (axios.isAxiosError(error)) {
                                if (error.response && error.response.data && error.response.data.payload) {
                                        toast.error(`Error: ${error.response.data.payload}`);
                                } else {
                                        toast.error('Unnavailable request, please try again');
                                }
                                console.error('Unexpected error:', error);
                                navigate(0);
                                updateButtonLoadingAnimation(false);
                        } else {
                                console.error('Unexpected error:', error);
                                toast.error('An unexpected error occurred');
                                navigate(0);
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


                        <div className="w-full min-h-full flex flex-col space-y-[1rem] ">

                                <div className="relative w-full min-h-[1rem] flex items-center space-x-1 ">
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

                                <div className="grid grid-cols-1 md:grid-cols-3 lx:grid-cols-5 gap-[1rem]">

                                        <PatientInputForm 
                                                formValue = {updatePatientForm}
                                                prevValues = {updatePatientForm} 
                                                onChangeFunc={setUpdatePatientForm} 
                                                InputFormData = {InputFormData} 
                                        />

                                        <PatientDropDownList  
                                                patientInitialValues = {updatePatientForm} 
                                                allPatientDropDownContainer = {dropdownContainer}
                                                setPatientSubmitFormDropdown = {setUpdatePatientForm}
                                        />

                                </div>
                                                        

                                <div className="w-full flex justify-end items-end space-x-4 py-6">
                                        <button disabled = {buttonLoadingAnimation ? true : false}  onClick={()=> {submitUpdatedPatientProfile(); window.scrollTo(0, 400);}} className="transition-properties w-[130px] h-[40px] bg-green-600 text-white border border-green-600 text-[14px] rounded-md flex items-center justify-center space-x-2 hover:bg-green-500">
                                                {buttonLoadingAnimation ? 
                                                        <img src = {whiteBtnLoader} className='w-[15px] h-[15px]' alt='loader'/>    
                                                :
                                                        <div className="flex items-center justify-center space-x-2">
                                                                <MdSave className ='text-white text-[16px]'/>
                                                                <p>Update</p>
                                                        </div>
                                                }
                                        </button>
                                        
                                        <button onClick={()=>  {updateEditPatientState(false); updatePatientProfileState(true); window.scrollTo(0, 400);}} className="transition-properties w-[130px] h-[40px] bg-black text-white border border-black text-[14px] rounded-md flex items-center justify-center space-x-2 hover:border-[#121212] hover:bg-[#121212]">
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

export default EditPatient