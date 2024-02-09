import Dropzone from 'react-dropzone';
import { useState } from "react";

import {DropDownList} from "../globalComponents/DropDownList";
import InputForm from '../globalComponents/InputForm';




// interface addDoctorForm{
//     doctorSpecialty: string,
//     doctorAddress: string,
//     doctorPhone: string,
//     doctorAge: string,
//     doctorName: string,
//     doctorDegree: string,
//     employmentType: string,
// }

// interface addDoctor {
//     addDoctorForm: addDoctorForm
// }

const AddDoctor = () => {

        const dropdownContainer = [
                {buttonId: 'doctorSpecialty' , buttonName: 'Choose Specialty', listOptions : ['Pediatrics', 'Cardiology', 'Psychiatry', 'Internal Medicine', 'Obstetrics and Gynecology', 'Surgery', 'Anesthesiology', 'Radiology'] },
                {buttonId: 'doctorDegree' , buttonName: ' Choose Degree', listOptions : ['MD', 'DO', 'PharmD', 'MBBS'] }  , 
                {buttonId: 'doctorDept' , buttonName: ' Choose Department', listOptions : ['General', 'Psychiatry', 'Obstetrics', 'Gynecology'] }  ,   
        ]

        const [InputFormData, updateInputFormData] = useState([
                {labelName: 'Doctor Name ', labelSpan: '*', inputName: 'doctorName', inputType: 'text', placeholder: 'John Doe'},
                {labelName: 'Doctor Phone Number', labelSpan: '*', inputName: 'doctorPhone', inputType: 'tel', placeholder: '+234 90 346 4578'},
                {labelName: 'Doctor Age', labelSpan: '*',  inputName: 'doctorAge', inputType: 'number', placeholder: '40'},
                {labelName: 'Doctor Home Address ', labelSpan: '*',  inputName: 'doctorAddress', inputType: 'text', placeholder: '3 Fieldgreen Drive, Lagos'},
                {labelName: 'Doctor Join Date ', labelSpan: '*',  inputName: 'doctorjoindate', inputType: 'date'},
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
                    <InputForm InputFormData = {InputFormData} />

                    <DropDownList allDropDownContainer = {dropdownContainer}   setSubmitFormDropdown = {setAddDoctorForm}/>
            </div>

            <button className="transition-properties w-[190px] h-[40px] bg-gradient-to-r from-slate-800 to-slate-900 text-white border border-white text-[14px] rounded-md flex items-center justify-center space-x-2 hover:bg-[#13117c]">
                    <p>Add Doctor</p>
                    <p className="text-[16px]">+</p>
            </button>

            
    </div>
</>
  )
}

export default AddDoctor