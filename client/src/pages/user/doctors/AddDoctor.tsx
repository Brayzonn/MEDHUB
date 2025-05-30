import Dropzone from 'react-dropzone';
import { useState } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';

import {AddDoctorFormInterface} from '../../../types/DataTypes'
import { useGlobalContext } from '../../../context/useGlobalContext';
import {DoctorDropDownList} from "../../../components/DropDownList";
import {DoctorInputForm} from '../../../components/InputForm';

import whiteBtnLoader from '../../../images/buttonloaderwhite.svg';


const AddDoctor = () => {

        //global variables
        const {baseURL, fetchDashboardData, fetchDoctors} =  useGlobalContext();
        const userToken = sessionStorage.getItem('userToken');
        

        //component variables
        const [buttonLoadingAnimation, updateButtonLoadingAnimation] = useState<boolean>(false)
        
        const dropdownContainer = [
                {buttonId: 'doctorSpecialty' , buttonName: 'Choose Specialty', listOptions : ['Pediatrics', 'Cardiology', 'Psychiatry', 'Internal Medicine', 'Obstetrics and Gynecology', 'Surgery', 'Anesthesiology', 'Radiology'] },
                {buttonId: 'doctorDegree' , buttonName: ' Choose Degree', listOptions : ['MD', 'DO', 'PharmD', 'MBBS'] }  , 
                {buttonId: 'doctorDepartment' , buttonName: ' Choose Department', listOptions : ['General', 'Psychiatry', 'Obstetrics', 'Gynecology'] }  ,
                {buttonId: 'employmentType' , buttonName: ' Employment Type', listOptions : ['Full-time', 'Part-time'] }  ,      
        ]

        const InputFormData = [
                {labelName: 'Doctor Name ',             labelSpan: '*',  inputName: 'doctorName',       inputType: 'text',      placeholder: 'John Doe'},
                {labelName: 'Doctor Email ',            labelSpan: '*',  inputName: 'doctorEmail',      inputType: 'text',      placeholder: 'grey@gmail.com'},
                {labelName: 'Doctor Phone Number',      labelSpan: '*',  inputName: 'doctorPhone',      inputType: 'tel',       placeholder: '+234 90 346 4578'},
                {labelName: 'Doctor Age',               labelSpan: '*',  inputName: 'doctorAge',        inputType: 'number',    placeholder: '40'},
                {labelName: 'Doctor Home Address ',     labelSpan: '*',  inputName: 'doctorAddress',    inputType: 'text',      placeholder: '3 Fieldgreen Drive, Lagos'},
                {labelName: 'Doctor Join Date ',        labelSpan: '*',  inputName: 'doctorJoinDate',   inputType: 'date'},
        ]

        //dropzone for image upload
        const [Idimages, setIdImages] = useState<File>();
        const [stringIdimages, setStringIdImages] = useState<string>('');

        const handleImageDrop = (acceptedFile: File[]) => {
                if (acceptedFile) {
                        const stringifiedImageUrl = URL.createObjectURL(acceptedFile[0]);
                        const imageUrl = acceptedFile[0];
                        
                        setStringIdImages(stringifiedImageUrl)
                        setIdImages(imageUrl);
                        setAddDoctorForm({...addDoctorForm, doctorImage:stringifiedImageUrl })
                }    
        };


        //add doctor form submit logic
        const [addDoctorForm, setAddDoctorForm] = useState<AddDoctorFormInterface>({
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

        const callUpdatedAllDoctorData = () =>{
                fetchDoctors()
        }
        
        const submitAddDoctorForm = async () =>{
                       
                try {
                        updateButtonLoadingAnimation(true)
                        if (Object.values(addDoctorForm).some(value => value === '')) {
                                toast.error('Please complete in all fields.')  
                                updateButtonLoadingAnimation(false)
                        } else {
                                const formData = new FormData();
                                const {doctorImage, ...updatedDoctorForm} = addDoctorForm

                                Object.entries(updatedDoctorForm).forEach(([key, value]) => {
                                      formData.append(key, value);
                                })

                                if (Idimages instanceof File) {
                                      formData.append('doctorImage', Idimages);
                                }

                                if (!userToken || !baseURL) {
                                      toast.error('Authorization token or base URL is missing');
                                      return;
                                }
                                
                                const addDoctorApiCall = await axios.post(`${baseURL}/api/user/addnewdoctor`, formData, {
                                        headers: {
                                                Authorization: `Bearer ${userToken}`,
                                                'Content-Type': 'multipart/form-data',  
                                        },
                                });
                        
                                const addDoctorResponseMessage: string =  addDoctorApiCall.data.payload;
                                
                                if(addDoctorApiCall.status === 201){                                
                                        updateButtonLoadingAnimation(false)
                                        setIdImages(undefined)
                                        setAddDoctorForm({
                                                doctorSpecialty: '',
                                                doctorAddress: '',                
                                                doctorPhone: '',
                                                doctorAge: '',
                                                doctorName:'',
                                                doctorEmail: '',
                                                doctorDegree: '',
                                                employmentType: '',
                                                doctorDepartment: '',
                                                doctorImage: '',
                                                doctorJoinDate: '',
                                        })
                                        toast.success(addDoctorResponseMessage)      
                                        fetchDashboardData()
                                        callUpdatedAllDoctorData()
                                }  
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
    <div className='w-full min-h-[2rem] flex flex-col justify-start items-start space-y-8'>
            <p className='text-[14px] font-bold'>Add Doctor</p>

            <div className="relative w-full min-h-[1rem] flex space-x-1">
                    <Dropzone onDrop={handleImageDrop} accept="image/jpeg, image/png, image/jpg, image/webp" >
                            {({ getRootProps, getInputProps }) => (
                                <div {...getRootProps()} className="relative max-w-[150px] min-h-[150px] flex justify-center items-center p-2 border bg-inherit border-[#e9eaeb] rounded-md">
                                        <input {...getInputProps()} />
                                        {Idimages && <img src={stringIdimages} alt='Selected Image' className='transition-properties w-full h-full object-cover rounded-md' />}
                                        {!Idimages && <p className='text-[14px]'>Click/Drag and drop here to select doctor image.</p>}
                                </div>
                            )}
                    </Dropzone>  

                    {stringIdimages !== '' && <button 
                        onClick={()=>{setStringIdImages(''); setIdImages(undefined)}}
                        className="transition-properties text-[13px] font-[600] flex justify-center items-center bg-red-500 text-white w-[20px] h-[20px] border border-red-50 rounded-md"
                    >
                        X
                    </button>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lx:grid-cols-4 gap-[1rem]">
                    <DoctorInputForm formValue = {addDoctorForm} onChangeFunc={setAddDoctorForm} prevValues = {addDoctorForm} InputFormData = {InputFormData} />

                    <DoctorDropDownList allDropDownContainer = {dropdownContainer} doctorInitialValues = {addDoctorForm}  setSubmitFormDropdown = {setAddDoctorForm}/>
            </div>

            <button disabled = {buttonLoadingAnimation ? true : false} onClick={()=>submitAddDoctorForm()} className="transition-properties w-[190px] h-[40px] bg-gradient-to-r from-slate-800 to-slate-900 text-white border border-white text-[14px] rounded-md flex items-center justify-center space-x-2 hover:bg-[#13117c]">
                    {buttonLoadingAnimation ? 
                        <img src = {whiteBtnLoader} className='w-[25px] h-[25px]' alt='loader'/>    
                    :
                        <>
                             <p>Add Doctor</p>
                             <p className="text-[16px]">+</p>
                        </>
                    }
            </button>

            
    </div>
</>
  )
}

export default AddDoctor