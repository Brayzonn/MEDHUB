import Dropzone from 'react-dropzone';
import { useState } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';

import {AddDoctorFormInterface} from '../DataTypes'
import { useGlobalContext } from '../../context/useGlobalContext';
import {DropDownList} from "../globalComponents/DropDownList";
import {DoctorInputForm} from '../globalComponents/InputForm';


const AddDoctor = () => {

        const {baseURL} =  useGlobalContext();

        const dropdownContainer = [
                {buttonId: 'doctorSpecialty' , buttonName: 'Choose Specialty', listOptions : ['Pediatrics', 'Cardiology', 'Psychiatry', 'Internal Medicine', 'Obstetrics and Gynecology', 'Surgery', 'Anesthesiology', 'Radiology'] },
                {buttonId: 'doctorDegree' , buttonName: ' Choose Degree', listOptions : ['MD', 'DO', 'PharmD', 'MBBS'] }  , 
                {buttonId: 'doctorDept' , buttonName: ' Choose Department', listOptions : ['General', 'Psychiatry', 'Obstetrics', 'Gynecology'] }  ,   
        ]

        const [InputFormData] = useState([
                {labelName: 'Doctor Name ', onChange:  (value: string) => setAddDoctorForm({...addDoctorForm, 'doctorName': value}), labelSpan: '*', inputName: 'doctorName', inputType: 'text', placeholder: 'John Doe'},
                {labelName: 'Doctor Phone Number',  onChange:  (value: string) => setAddDoctorForm({...addDoctorForm, 'doctorPhone': value}), labelSpan: '*', inputName: 'doctorPhone', inputType: 'tel', placeholder: '+234 90 346 4578'},
                {labelName: 'Doctor Age', value: {},  onChange:  (value: string) => setAddDoctorForm({...addDoctorForm, 'doctorAge': value}),  inputName: 'doctorAge', inputType: 'number', placeholder: '40'},
                {labelName: 'Doctor Home Address ',   onChange:  (value: string) => setAddDoctorForm({...addDoctorForm, 'doctorAddress': value}), labelSpan: '*',  inputName: 'doctorAddress', inputType: 'text', placeholder: '3 Fieldgreen Drive, Lagos'},
                {labelName: 'Doctor Join Date ',  onChange:  (value: string) => setAddDoctorForm({...addDoctorForm, 'doctorjoindate': value}), labelSpan: '*',  inputName: 'doctorjoindate', inputType: 'date'},
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


        //add doctor form submit logic
        const [addDoctorForm, setAddDoctorForm] = useState<AddDoctorFormInterface>({
                doctorSpecialty: '',
                doctorAddress: '',
                doctorPhone: '',
                doctorAge: '',
                doctorName:'',
                doctorDegree: '',
                employmentType: '',
                doctorDept: '',
                doctorImage: '',
                doctorjoindate: '',
        })

        const submitAddDoctorForm = async () =>{
                try {

                        if (Object.values(addDoctorForm).some(value => value === '')) {
                                toast.error('Please fill in all fields.')  
                        } else {
                                const addDoctorApiCall = await axios.post(`${baseURL}/api/user/newdoctor`, {...addDoctorForm})
                                const addDoctorErrorResponseData = addDoctorApiCall.data.errorMessage;
                                const addDoctorResponseStatus: boolean =  addDoctorApiCall.data.status;
        
                                if(addDoctorResponseStatus === false){
                                        toast.error(addDoctorErrorResponseData)
                                }
                                else{
                                        setAddDoctorForm({
                                                doctorSpecialty: '',
                                                doctorAddress: '',
                                                doctorPhone: '',
                                                doctorAge: '',
                                                doctorName:'',
                                                doctorDegree: '',
                                                employmentType: '',
                                                doctorDept: '',
                                                doctorImage: '',
                                                doctorjoindate: '',
                                        })
        
                                        toast.success('Doctor added successfully')
                                }        
                        }
                        
                } catch (error) {
                        console.log(error)
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
                    <DoctorInputForm prevValues = {addDoctorForm} InputFormData = {InputFormData} />

                    <DropDownList allDropDownContainer = {dropdownContainer}   setSubmitFormDropdown = {setAddDoctorForm}/>
            </div>

            <button onClick={()=>submitAddDoctorForm()} className="transition-properties w-[190px] h-[40px] bg-gradient-to-r from-slate-800 to-slate-900 text-white border border-white text-[14px] rounded-md flex items-center justify-center space-x-2 hover:bg-[#13117c]">
                    <p>Add Doctor</p>
                    <p className="text-[16px]">+</p>
            </button>

            
    </div>
</>
  )
}

export default AddDoctor