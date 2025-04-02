
import Dropzone from 'react-dropzone';
import { useState } from "react";

import {DropDownListStaff} from "../globalComponents/DropDownList";
import {StaffInputForm} from '../globalComponents/InputForm';



const AddStaff = () => {

    const dropdownContainer = [
        {buttonId: 'staffTimeRole' , buttonName: 'Choose Role', listOptions : ['Day', 'Afternoon', 'Night'] },
    ]

    const [InputFormData] = useState([
        {labelName: 'Staff Name ', labelSpan: '*', inputName: 'staffName', inputType: 'text', placeholder: 'John Doe'},
        {labelName: 'Staff Email ', labelSpan: '*', inputName: 'staffEmail', inputType: 'email', placeholder: 'grey@gmail.com'},
        {labelName: 'Staff Address ', labelSpan: '*', inputName: 'staffAddress', inputType: 'text', placeholder: '5 Adetokumbo, Wuse'},
        {labelName: 'Staff Phone ', labelSpan: '*', inputName: 'staffPhone', inputType: 'tel', placeholder: '+234 90 346 4578'},
        {labelName: 'Staff Age', labelSpan: '*',  inputName: 'staffAge', inputType: 'number', placeholder: '40'},
        {labelName: 'Staff Birth Date ', labelSpan: '*',  inputName: 'staffDateOfBirth',  inputType: 'date'},
        {labelName: 'Staff Join Date ', labelSpan: '*',  inputName: 'staffJoinDate', inputType: 'date'},
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


    //add staff form submit logic
    const [addStaffForm, setAddStaffForm] = useState({
          staffName: '',
          staffImage: '',
          staffAge: '',
          staffDateOfBirth: '',
          staffTimeRole: '',
          staffDegree: '',
          staffJoinDate: '',
          staffID: '',
          staffEmail: '',
          staffPhone: '',
    })

return (
      <>
          <div className='w-full min-h-[2rem] flex flex-col justify-start items-start space-y-8'>
          <p className='text-[14px] font-bold'>Add Staff</p>

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
                  <StaffInputForm prevValues ={addStaffForm} InputFormData = {InputFormData} />

                  <DropDownListStaff allStaffDropDownContainer = {dropdownContainer}   setStaffSubmitFormDropdown = {setAddStaffForm}/>
          </div>

          <button className="transition-properties w-[190px] h-[40px] bg-gradient-to-r from-slate-800 to-slate-900 text-white border border-white text-[14px] rounded-md flex items-center justify-center space-x-2 hover:bg-[#13117c]">
                  <p>Add Staff</p>
                  <p className="text-[16px]">+</p>
          </button>


          </div>
      </>
)
}

export default AddStaff