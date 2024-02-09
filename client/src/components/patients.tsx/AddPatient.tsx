import Dropzone from 'react-dropzone';
import { useState } from "react";

import {DropDownListPatient} from "../globalComponents/DropDownList";
import InputForm from '../globalComponents/InputForm';

const AddPatient = () => {

      const dropdownContainer = [
            {buttonId: 'patientEMO' , buttonName: 'EMO', listOptions : ['YARN Construction', 'Grey Finances', 'Chelsea FC'] },
            {buttonId: 'patientBloodType ' , buttonName: 'Blood Type', listOptions : ['O+', 'O-'] }  , 
            {buttonId: 'patientGenotype' , buttonName: 'Genotype', listOptions : ['AA', 'AS', 'SS'] }  ,   
      ]

      const [InputFormData, updateInputFormData] = useState([
            {labelName: 'Patient Name ', labelSpan: '*',  inputName: 'patientname', inputType: 'text', placeholder: 'John Doe'},
            {labelName: 'Age', labelSpan: '*',  inputName: 'patientAge', inputType: 'number', placeholder: '40'},
            {labelName: 'Medical Conditions', labelSpan: '*',  inputName: 'patientConditions', inputType: 'text', placeholder: '..'},
            {labelName: 'Phone Number', labelSpan: '*', inputName: 'patientPhoneNumber', inputType: 'tel', placeholder: '+234 90 346 4578'},
            {labelName: 'Email', labelSpan: '*',  inputName: 'patientEmail', inputType: 'email', placeholder: 'doe@gmail.com'},
            {labelName: 'Height(inches)', labelSpan: '*',  inputName: 'patientHeight', inputType: 'number', placeholder: '40.23'},
            {labelName: 'Weight(kg)', labelSpan: '*',  inputName: 'patientWeight', inputType: 'number', placeholder: '80.23'},
            {labelName: 'Birth Date ', labelSpan: '*',  inputName: 'patientJoindate', inputType: 'date'},
            {labelName: 'Join Date', labelSpan: '*',  inputName: 'patientJoindate', inputType: 'date'},
            
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


    //add patient form submit logic
    const [addPatientForm, setAddPatientForm] = useState({
          profile: { patientname: '', patientImage: '' },
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
                    <InputForm InputFormData = {InputFormData} />

                    <DropDownListPatient allPatientDropDownContainer = {dropdownContainer}  setPatientSubmitFormDropdown = {setAddPatientForm}/>
            </div>

            <button className="transition-properties w-[190px] h-[40px] bg-gradient-to-r from-slate-800 to-slate-900 text-white border border-white text-[14px] rounded-md flex items-center justify-center space-x-2 hover:bg-[#13117c]">
                    <p>Add Patient</p>
                    <p className="text-[16px]">+</p>
            </button>

            
    </div>
    </>
  )
}

export default AddPatient