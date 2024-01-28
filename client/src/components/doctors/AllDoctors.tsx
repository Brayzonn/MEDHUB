import { CiSearch } from "react-icons/ci";
import Dropzone from 'react-dropzone';
import { FaChevronRight } from "react-icons/fa";
import Table from "../globalComponents/Table";
import { useState } from "react";
import { TableColumn } from 'react-data-table-component';



const AllDoctors = () => {

  const [allDoctorState, updateAllDoctorState] = useState<boolean>(true)
  const [addDoctorState, updateAddDoctorState] = useState<boolean>(false)

  const [searchResults, setSearchResults] = useState<DataRow []>([])
  const [isInputActive, setInputIsActive] = useState<boolean>(false)

  

  //filter doctor data based off search parameters
  const searchInputValue = (searchValue: string) => {
        const filtered : DataRow[]= data.filter((row) =>
            row.profile.doctorname.toLowerCase().includes(searchValue.toLowerCase())
        );

        setSearchResults(filtered);
  }

  //dropzone for image upload-------
  const [Idimages, setIdImages] = useState<string>('');

  const handleImageDrop = (acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
                const firstAcceptedFile = acceptedFiles[0];

                const imageUrl = URL.createObjectURL(firstAcceptedFile);
            
                setIdImages(imageUrl);
        }    
  };

  
  


  interface DataRow {
          profile: { doctorname: string; doctorImage: string };
          doctorDepartment: string;
          doctorSpecialty: string;
          doctorDegree: string;
          doctorJoinDate: string;
  }

  //data for table
  const columns: TableColumn<DataRow>[] = [
          {
                name: 'Doctor',
                selector: (row) => row.profile.doctorname,
          },
          {
                name: 'Department',
                selector: (row) => row.doctorDepartment,
          },

          {
                name: 'Specialty',
                selector: (row) => row.doctorSpecialty,
          },

          {
                name: 'Degree',
                selector: (row) => row.doctorDegree,
          },

          {
                name: 'Join Date',
                selector: (row) => row.doctorJoinDate,
          },

          {
                name: 'Action',
                cell: (row) =>(
                      <button onClick={()=> alert(row.doctorDegree)} className="w-[30px] h-[30px] flex justify-center items-center relative border bg-purpleSubColor border-purpleSubColor rounded-full">
                            <FaChevronRight className = 'text-white' />  
                      </button>
                )
          }
  ];


  const data = [
          {
                profile: {doctorname: 'Esther Howard', doctorImage : ''},
                doctorDepartment: 'Dental',
                doctorSpecialty: 'Dental',
                doctorDegree: 'MBBS, MS',
                doctorJoinDate: '20-10-2024',
          },
          {
                profile: {doctorname: 'Doctor 1', doctorImage : '' },
                doctorDepartment: 'Department 1',
                doctorSpecialty: 'Specialty 1',
                doctorDegree: 'Degree 1',
                doctorJoinDate: 'Date 1',
          },

          {
                profile: {doctorname: 'Doctor 1', doctorImage : ''},
                doctorDepartment: 'Department 1',
                doctorSpecialty: 'Specialty 1',
                doctorDegree: 'Degree 1',
                doctorJoinDate: 'Date 1',
          },

          {
                profile: {doctorname: 'Doctor 1', doctorImage : ''},
                doctorDepartment: 'Department 1',
                doctorSpecialty: 'Specialty 1',
                doctorDegree: 'Degree 1',
                doctorJoinDate: 'Date 1',
          },

          {
                profile: {doctorname: 'Doctor 1', doctorImage : ''},
                doctorDepartment: 'Department 1',
                doctorSpecialty: 'Specialty 1',
                doctorDegree: 'Degree 1',
                doctorJoinDate: 'Date 1',
          },

          {
                profile: {doctorname: 'Doctor 1', doctorImage : ''},
                doctorDepartment: 'Department 1',
                doctorSpecialty: 'Specialty 1',
                doctorDegree: 'Degree 1',
                doctorJoinDate: 'Date 1',
          },
      
  ];
  


  return (
            <div className='w-[75%] shadow-sm p-4 m-6 flex flex-col space-y-6 text-[#161616] bg-white border border-white rounded-[15px] lx:w-[82%]'>
                    <h5 className='font-bold tracking-wide'>Doctors</h5>

                    <div className='w-full min-h-[3rem] flex items-center space-x-[4rem] border-b border-b-[#f1f1f1]'>
                          <button
                              onClick={()=> {
                                updateAddDoctorState(false);
                                updateAllDoctorState(true)
                              }}
                              className={`h-full text-capitalize font-[500] text-[14px] transition-properties  ${allDoctorState && 'border-b-purpleSubColor border-b-[2.5px]'} `}
                          >
                              All Doctors
                          </button>

                          <button
                              onClick={()=> {
                                updateAddDoctorState(true);
                                updateAllDoctorState(false)
                              }}
                              className={`h-full text-capitalize font-[500] text-[14px] transition-properties ${addDoctorState && 'border-b-purpleSubColor border-b-[2.5px]'} `}
                          >
                              Add Doctor
                          </button>
                    </div>

                    {allDoctorState ? 
                            <>  
                                <div className='w-full flex justify-between items-center'>
                                        <p className='text-[14px] font-bold'>All Doctors</p>

                                        <div className="relative w-[300px] h-[45px]">
                                            <CiSearch className="absolute left-2 top-1/2 transform -translate-y-1/2" />
                                            <input 
                                                type='text'
                                                name='searchdoctors'
                                                onBlur={()=> setInputIsActive(false) }
                                                onChange={(e)=> {searchInputValue(e.target.value); setInputIsActive(true)}}
                                                placeholder='Search'
                                                className='pl-8 bg-[#f3f3f8] px-2 border-white border-[1px] rounded-[5px] w-[300px] h-[45px] text-black text-[16px] focus:border-greyMainBackground focus:bg-greyMainBackground focus:outline-none'
                                            />
                                        </div>
                                </div>

                                <div className="min-h-[10rem] w-full flex flex-col justify-center items-center space-y-[2rem]">
                                        {!isInputActive ?
                                            <Table columns={columns} data={data} />
                                            :
                                            <Table columns={columns} data={searchResults} />
                                        }
                                </div>
                            </> 
                            : 
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

                                        <div className="relative w-full min-h-[1rem] flex space-x-1">
                                                <div className='flex flex-col space-y-2'>
                                                        <label className='text-[15px] text-[#636363]'>Full name*</label>
                                                        <input type="text" name='fullName' 
                                                                placeholder='Enter name'
                                                                className='bg-inherit px-2 border-[#e1e1e1] border-[1px] rounded-[2px] w-full h-[42px] text-black text-[16px] focus:border-greyMainBackground focus:bg-greyMainBackground focus:outline-none' 
                                                        />
                                                </div>

                                                <div className='flex flex-col space-y-2'>
                                                        <label className='text-[15px] text-[#636363]'>Email*</label>
                                                        <input type="email" name='email' 
                                                                placeholder='Enter email'
                                                                className='bg-inherit px-2 border-[#e1e1e1] border-[1px] rounded-[2px] w-full h-[42px] text-black text-[16px] focus:border-greyMainBackground focus:bg-greyMainBackground focus:outline-none' 
                                                        />
                                                </div>
                                        </div>




                                </div>
                            </>
                    }
                    
            </div>
  )
}

export default AllDoctors