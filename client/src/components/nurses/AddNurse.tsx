import Dropzone from 'react-dropzone';
import { useState } from "react";

import {DropDownListNurse} from "../globalComponents/DropDownList";
import InputForm from '../globalComponents/InputForm';



const AddNurse = () => {
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


//add nurse form submit logic
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
          <div className='w-full min-h-[2rem] flex flex-col justify-start items-start space-y-8'>
          <p className='text-[14px] font-bold'>Add Nurse</p>

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

                  <DropDownListNurse allNurseDropDownContainer = {dropdownContainer}   setNurseSubmitFormDropdown = {setAddNurseForm}/>
          </div>

          <button className="transition-properties w-[190px] h-[40px] bg-gradient-to-r from-slate-800 to-slate-900 text-white border border-white text-[14px] rounded-md flex items-center justify-center space-x-2 hover:bg-[#13117c]">
                  <p>Add Nurse</p>
                  <p className="text-[16px]">+</p>
          </button>


          </div>
      </>
)
}

export default AddNurse