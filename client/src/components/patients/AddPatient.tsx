import Dropzone from 'react-dropzone';
import { useState } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';

import { useGlobalContext } from '../../context/useGlobalContext';
import {DropDownListPatient} from "../globalComponents/DropDownList";
import {PatientInputForm} from '../globalComponents/InputForm';

const AddPatient = () => {

      const {baseURL} =  useGlobalContext();

      const dropdownContainer = [
            {buttonId: 'patientEMO' , buttonName: 'EMO', listOptions : ['YARN Construction', 'Grey Finances', 'Chelsea FC'] },
            {buttonId: 'patientBloodType ' , buttonName: 'Blood Type', listOptions : ['O+', 'O-'] }  , 
            {buttonId: 'patientGenotype' , buttonName: 'Genotype', listOptions : ['AA', 'AS', 'SS'] }  ,   
      ]

      const [InputFormData] = useState([
                {
                        labelName: 'Patient Name ', labelSpan: '*', onChange: (value: string) => setAddPatientForm((prevState) => ({
                                ...prevState,
                                profile: { ...prevState.profile, patientName: value },
                        })),
                        inputName: 'patientName', inputType: 'text',
                },

                {       
                        labelName: 'Age', labelSpan: '*', onChange: (value: string) => setAddPatientForm((prevState) => ({
                                ...prevState,
                                profile: { ...prevState.profile, patientAge: value },
                         })),
                        inputName: 'patientAge', inputType: 'number', 
                },

                {labelName: 'Medical Conditions', labelSpan: '*',  onChange: (value: string) => setAddPatientForm((prevState) => ({
                        ...prevState,
                                profile: { ...prevState.profile, patientConditions: value },
                        })),
                        inputName: 'patientConditions', inputType: 'text', 
                },

                {labelName: 'Phone Number', labelSpan: '*', onChange: (value: string) => setAddPatientForm((prevState) => ({
                        ...prevState,
                                profile: { ...prevState.profile, patientPhoneNumber: value },
                        })),
                        inputName: 'patientPhoneNumber', inputType: 'tel', 
                },

                {labelName: 'Email', labelSpan: '*', onChange: (value: string) => setAddPatientForm((prevState) => ({
                        ...prevState,
                                profile: { ...prevState.profile, patientEmail: value },
                        })),
                        inputName: 'patientEmail', inputType: 'email', 
                },

                {labelName: 'Height(inches)', labelSpan: '*', onChange: (value: string) => setAddPatientForm((prevState) => ({
                        ...prevState,
                                profile: { ...prevState.profile, patientHeight: value },
                        })),
                        inputName: 'patientHeight', inputType: 'number', 
                },

                {labelName: 'Weight(kg)', labelSpan: '*', onChange: (value: string) => setAddPatientForm((prevState) => ({
                        ...prevState,
                                profile: { ...prevState.profile, patientWeight: value },
                        })),
                        inputName: 'patientWeight', inputType: 'number', 
                },

                {labelName: 'Birth Date ', labelSpan: '*', onChange: (value: string) => setAddPatientForm((prevState) => ({
                        ...prevState,
                                profile: { ...prevState.profile, patientJoindate: value },
                        })),
                        inputName: 'patientJoindate', inputType: 'date'
                },

                {labelName: 'Join Date', labelSpan: '*',onChange: (value: string) => setAddPatientForm((prevState) => ({
                        ...prevState,
                                profile: { ...prevState.profile, patientJoindate: value },
                        })),
                        inputName: 'patientJoindate', inputType: 'date'
                },  
      ])

      //dropzone for image upload
      const [Idimages, setIdImages] = useState<string>('');

      const handleImageDrop = (acceptedFiles: File[]) => {
                if (acceptedFiles.length > 0) {
                        const firstAcceptedFile = acceptedFiles[0];
                        const imageUrl = URL.createObjectURL(firstAcceptedFile);
                        setIdImages(imageUrl);
                        setAddPatientForm({...addPatientForm, profile: {...addPatientForm.profile, patientImage: imageUrl }})
                }    
      };


      //add patient form submit logic
      const [addPatientForm, setAddPatientForm] = useState({
                profile: { patientName: '', patientImage: '' },
                patientID: '',
                patientNotes: [''] ,
                patientAge: '',
                patientBloodType: '',
                patientHeight: '',
                patientGenotype: '',
                patientWeight: '',
                patientConditions: [''],
                patientJoindate: '',
                patientBirthDate: '',
                patientPhoneNumber: '', 
                patientEmail: '',
                admissionStatus: false,
                patientEMO: '',
      })

      const submitAddPatientForm = async () =>{
                try {

                        if (Object.values(addPatientForm).some(value => value === '')) {
                                toast.error('Please fill in all fields.')  
                        } else {
                                const addPatientApiCall = await axios.post(`${baseURL}/api/user/addpatient`, {...addPatientForm})
                                const addPatientErrorResponseData = addPatientApiCall.data.errorMessage;
                                const addPatientResponseStatus: boolean =  addPatientApiCall.data.status;

                                if(addPatientResponseStatus === false){
                                        toast.error(addPatientErrorResponseData)
                                }
                                else{
                                        setAddPatientForm({
                                                profile: { patientName: '', patientImage: '' },
                                                patientID: '',
                                                patientNotes: [''] ,
                                                patientAge: '',
                                                patientBloodType: '',
                                                patientHeight: '',
                                                patientGenotype: '',
                                                patientWeight: '',
                                                patientConditions: [''],
                                                patientJoindate: '',
                                                patientBirthDate: '',
                                                patientPhoneNumber: '', 
                                                patientEmail: '',
                                                admissionStatus: false,
                                                patientEMO: '',
                                        })

                                        toast.success('Patient added successfully')
                                }        
                        }
                        
                } catch (error) {
                        console.log(error)
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
                                                {Idimages && <img src={Idimages} alt='Selected Image' className='transition-properties w-full h-full object-cover rounded-md' />}
                                                {!Idimages && <p className='text-[14px]'>Click/Drag and drop here to select doctor image.</p>}
                                        </div>
                                )}
                        </Dropzone>  

                        {Idimages !== '' && <button 
                                onClick={()=>setIdImages('')}
                                className="transition-properties text-[13px] font-[600] flex justify-center items-center bg-red-500 text-white w-[20px] h-[20px] border border-red-50 rounded-md"
                        >
                                X
                        </button>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lx:grid-cols-4 gap-[1rem]">
                        <PatientInputForm prevValues = {addPatientForm} InputFormData = {InputFormData} />

                        <DropDownListPatient allPatientDropDownContainer = {dropdownContainer}  setPatientSubmitFormDropdown = {setAddPatientForm}/>
                </div>

                <button onClick={()=> submitAddPatientForm()} className="transition-properties w-[190px] h-[40px] bg-gradient-to-r from-slate-800 to-slate-900 text-white border border-white text-[14px] rounded-md flex items-center justify-center space-x-2 hover:bg-[#13117c]">
                        <p>Add Patient</p>
                        <p className="text-[16px]">+</p>
                </button>
    </div>
    </>
  )
}

export default AddPatient