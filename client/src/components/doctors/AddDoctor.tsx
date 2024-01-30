import DropDownList from "../globalComponents/dropDownList";
import Dropzone from 'react-dropzone';
import { useState } from "react";

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

    //dropzone for image upload
    const [Idimages, setIdImages] = useState<string>('');

    const handleImageDrop = (acceptedFiles: File[]) => {
            if (acceptedFiles.length > 0) {
                    const firstAcceptedFile = acceptedFiles[0];

                    const imageUrl = URL.createObjectURL(firstAcceptedFile);
                
                    setIdImages(imageUrl);
            }    
    };

    const dropdownContainer = [
        {buttonId: 'doctorSpecialty' , buttonName: 'Choose Specialty', listOptions : ['Pediatrics', 'Cardiology', 'Psychiatry', 'Internal Medicine', 'Obstetrics and Gynecology', 'Surgery', 'Anesthesiology', 'Radiology'] },
        {buttonId: 'doctorDegree' , buttonName: ' Choose Degree', listOptions : ['MD', 'DO', 'PharmD', 'MBBS'] }  ,  
    ]

    const [addDoctorForm, setAddDoctorForm] = useState({
        doctorSpecialty: '',
        doctorAddress: '',
        doctorPhone: '',
        doctorAge: '',
        doctorName:'',
        doctorDegree: '',
        employmentType: '',
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

            <div className="grid grid-cols-1 md:grid-cols-2 lx:grid-cols-3 gap-[1rem]">
                    <div className='flex flex-col justify-end space-y-1'>
                            <label className='text-[14px] text-[#636363]'>Doctor Name <span>*</span></label>
                            <input type="text" name='doctorName' 
                                    // value={addDoctorForm.doctorName}
                                    placeholder='John Doe'
                                    className='bg-inherit px-2 border-[#e1e1e1] border-[1px] rounded-[2px] w-[250px] h-[42px] text-black text-[16px] focus:border-greyMainBackground focus:bg-greyMainBackground focus:outline-none' 
                            />
                    </div>

                    <div className='flex flex-col justify-end space-y-1'>
                            <label className='text-[14px] text-[#636363]'>Doctor Phone Number <span>*</span></label>
                            <input type="tel" name='doctorPhone' 
                                    // value={addDoctorForm.doctorPhone}
                                    placeholder='+234 90 346 4578'
                                    className='bg-inherit px-2 border-[#e1e1e1] border-[1px] rounded-[2px] w-[250px] h-[42px] text-black text-[16px] focus:border-greyMainBackground focus:bg-greyMainBackground focus:outline-none' 
                            />
                    </div>

                    <div className='flex flex-col justify-end space-y-1'>
                            <label className='text-[14px] text-[#636363]'>Doctor Age <span>*</span></label>
                            <input type="number" name='doctorAge' 
                                    // value={addDoctorForm.doctorAge}
                                    placeholder='40'
                                    className='bg-inherit px-2 border-[#e1e1e1] border-[1px] rounded-[2px] w-[130px] h-[42px] text-black text-[16px] focus:border-greyMainBackground focus:bg-greyMainBackground focus:outline-none' 
                            />
                    </div>

                    <div className='flex flex-col justify-end space-y-1'>
                            <label className='text-[14px] text-[#636363]'>Doctor Home Address <span>*</span></label>
                            <input type="text" name=' doctorAddress' 
                                    // value={addDoctorForm.doctorAddress}
                                    placeholder='3 Fieldgreen Drive, Lagos'
                                    className='bg-inherit px-2 border-[#e1e1e1] border-[1px] rounded-[2px] w-[250px] h-[42px] text-black text-[16px] focus:border-greyMainBackground focus:bg-greyMainBackground focus:outline-none' 
                            />
                    </div>

                    <DropDownList allDropDownContainer = {dropdownContainer}   setSubmitFormDropdown = {setAddDoctorForm}/>
            </div>

            <button className="transition-properties w-[190px] h-[40px] bg-purpleSubColor text-white border border-purpleSubColor text-[14px] rounded-md flex items-center justify-center space-x-2 hover:bg-[#13117c]">
                    <p>Add Doctor</p>
                    <p className="text-[16px]">+</p>
            </button>

            
    </div>
</>
  )
}

export default AddDoctor