import Dropzone from 'react-dropzone';
import { useState } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';

import {AddPatientFormInterface} from '../DataTypes'
import { useGlobalContext } from '../../context/useGlobalContext';
import {PatientDropDownList} from "../globalComponents/DropDownList";
import {PatientInputForm} from '../globalComponents/InputForm';

import whiteBtnLoader from '../../images/buttonloaderwhite.svg';


const AddPatient = () => {


      //global variables
      const {baseURL, fetchPatients, fetchDashboardData} =  useGlobalContext();
      const userToken = sessionStorage.getItem('userToken');

      //component variables
      const [buttonLoadingAnimation, updateButtonLoadingAnimation] = useState<boolean>(false)

      const dropdownContainer = [
        {buttonId: 'patientEMO' , buttonName: 'EMO', listOptions : ['YARN Construction', 'Grey Finances', 'Chelsea FC'] },
        {buttonId: 'patientBloodType' , buttonName: 'Blood Type', listOptions : ['O+', 'O-'] }  , 
        {buttonId: 'patientGenotype' , buttonName: 'Genotype', listOptions : ['AA', 'AS', 'SS'] }  ,   
      ]

      const InputFormData = [
                {
                        labelName: 'Patient Name ', labelSpan: '*', inputName: 'patientName', inputType: 'text', 
                },

                {       
                        labelName: 'Age', labelSpan: '*', inputName: 'patientAge', inputType: 'number', 
                },

                {
                        labelName: 'Medical Conditions', labelSpan: '*', inputName: 'patientConditions', inputType: 'text', 
                },

                {
                        labelName: 'Phone Number', labelSpan: '*', inputName: 'patientPhoneNumber', inputType: 'tel', 
                },

                {
                        labelName: 'Email', labelSpan: '*', inputName: 'patientEmail', inputType: 'email', 
                },

                {
                        labelName: 'Height(inches)', labelSpan: '*', inputName: 'patientHeight', inputType: 'number', 
                },

                {
                        labelName: 'Weight(kg)', labelSpan: '*', inputName: 'patientWeight', inputType: 'number', 
                },

                {
                        labelName: 'Birth Date ', labelSpan: '*', inputName: 'patientBirthDate', inputType: 'date'
                },

                {
                        labelName: 'Join Date', labelSpan: '*', inputName: 'patientJoinDate', inputType: 'date'
                },  
      ]

      //dropzone for image upload
      const [Idimages, setIdImages] = useState<File>();
      const [stringIdimages, setStringIdImages] = useState<string>('');

      const handleImageDrop = (acceptedFile: File[]) => {
                if (acceptedFile) {
                        const imageUrl  = acceptedFile[0];
                        const stringifiedImageUrl = URL.createObjectURL(acceptedFile[0]);
                        
                        setStringIdImages(stringifiedImageUrl);
                        setIdImages(imageUrl);
                        setAddPatientForm({...addPatientForm, patientImage: stringifiedImageUrl});       
                }    
      };


      //add patient form submit logic
      const [addPatientForm, setAddPatientForm] = useState<AddPatientFormInterface>({
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

      const callUpdatedAllPatientData = () =>{
        fetchPatients()
      }


      const submitAddPatientForm = async () =>{
                try {
                        updateButtonLoadingAnimation(true)
                        if (Object.values(addPatientForm).some(value => value === '')) {
                                toast.error('Please complete all fields.')  
                                updateButtonLoadingAnimation(false)
                        } else {
                                const formData = new FormData();
                                const {patientImage, ...updatedPatientForm} = addPatientForm

                                Object.entries(updatedPatientForm).forEach(([key, value]) => {
                                        if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
                                                formData.append(key, String(value));
                                        } else if (Array.isArray(value)) {
                                                value.forEach((item, index) => {
                                                        formData.append(`${key}[${index}]`, item); 
                                                });
                                        } 
                                });
                                      
                                if (Idimages instanceof File) {
                                      formData.append('patientImage', Idimages);
                                }

                                if (!userToken || !baseURL) {
                                      toast.error('Authorization token or base URL is missing');
                                      return;
                                }

                                const addPatientApiCall = await axios.post(`${baseURL}/api/user/addnewpatient`, formData, {
                                        headers: {
                                                Authorization: `Bearer ${userToken}`,
                                                'Content-Type': 'multipart/form-data',  
                                        },
                                });
                                
                                const addPatientResponseData: string = addPatientApiCall.data.payload;

                                if(addPatientApiCall.status === 201){
                                        updateButtonLoadingAnimation(false)
                                        setIdImages(undefined)
                                        setAddPatientForm({
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
                                                patientEMO: ''
                                        })
                                        toast.success(addPatientResponseData)
                                        fetchDashboardData()
                                        callUpdatedAllPatientData()
                                }        
                        }
                        
                } catch (error) {
                        if (axios.isAxiosError(error)) {
                                if (error.response && error.response.data && error.response.data.message) {
                                        toast.error(`Error: ${error.response.data.message}`);
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
                <p className='text-[14px] font-bold'>Add Patient</p>

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
                        <PatientInputForm formValue = {addPatientForm} onChangeFunc={setAddPatientForm} prevValues = {addPatientForm} InputFormData = {InputFormData} />
                        
                        <PatientDropDownList allPatientDropDownContainer = {dropdownContainer} patientInitialValues = {addPatientForm}  setPatientSubmitFormDropdown = {setAddPatientForm}/>
                </div>

                <button disabled = {buttonLoadingAnimation ? true : false} onClick={()=>submitAddPatientForm()} className="transition-properties w-[190px] h-[40px] bg-gradient-to-r from-slate-800 to-slate-900 text-white border border-white text-[14px] rounded-md flex items-center justify-center space-x-2 hover:bg-[#13117c]">
                        {buttonLoadingAnimation ? 
                                <img src = {whiteBtnLoader} className='w-[25px] h-[25px]' alt='loader'/>    
                        :
                                <>
                                <p>Add Patient</p>
                                <p className="text-[16px]">+</p>
                                </>
                        }
                </button>
    </div>
    </>
  )
}

export default AddPatient