import { useState } from "react";
import { TableColumn } from 'react-data-table-component';

import AddPatient from "./AddPatient";
import PatientTable from "./PatientTable";
import PatientProfile from "./PatientProfile";

import { CiSearch } from "react-icons/ci";
import { FaChevronRight } from "react-icons/fa";

const AllPatients = () => {



    //data for patient table
    interface RowData {
            profile: { patientname: string; patientImage: string };
            patientID: string;
            patientNotes: [] ;
            patientAge: string;
            patientBloodType: string;
            patientHeight: string;
            patientGenotype: string;
            patientWeight: string;
            patientConditions: []; 
            patientJoindate: string;
            patientBirthDate: string;
            patientPhoneNumber: string;
            patientEmail: string;
            admissionStatus:boolean;
            patientEMO: string;
    }

    const [searchResults, setSearchResults] = useState<RowData []>([])
    const [isInputActive, setInputIsActive] = useState<boolean>(false)
    const [allPatientsBorder, updateAllPatientsBorder] = useState<boolean>(true);
    const [addPatientsBorder, updateAddPatientsBorder] = useState<boolean>(false);
    const [patientEditState, updatePatientEditState] = useState<boolean>(false);

    const doctorProfileData = [
        {header: 'Patient Name', data: 'grey dans'},
    ]
  
 
  
    //filter patient data based off search parameters
    const searchInputValue = (searchValue: string) => {
          const filtered : RowData[]= patientData.filter((row: RowData) =>
              row.profile.patientname.toLowerCase().includes(searchValue.toLowerCase())
          );
          setSearchResults(filtered);
    }
  
    const [isPatientProfileVisible, setPatientProfileVisibility] = useState<boolean>(false);

  
    const fetchPatient = (patientID:string) =>{
  
    }
  
  
  
    const columns: TableColumn<RowData>[] = [
            {
                  name: 'Patient',
                  selector: (row) => row.profile.patientname,
            },
            {
                  name: 'ID',
                  selector: (row) => 'PT ' + row.patientID,
            },
  
            {
                  name: 'Age',
                  selector: (row) => row.patientAge,
            },
  
            {
                  name: 'Admission Status',
                  selector: (row) => row.admissionStatus,
            },
  
            {
                  name: 'Join Date',
                  selector: (row) => row.patientJoindate,
            },
  
            {
                  name: 'Action',
                  cell: (row) =>(
                        <button onClick={()=> {setPatientProfileVisibility(true); fetchPatient(row.profile.patientname); window.scrollTo(0, 400); }} className="w-[30px] h-[30px] flex justify-center items-center relative border bg-gradient-to-r from-slate-500 to-slate-800 border-white rounded-full">
                              <FaChevronRight className = 'text-white' />  
                        </button>
                  )
            }
    ];
  
  
    const patientData: RowData[]  = [
        {
            profile: { patientname: 'Eze', patientImage: '' },
            patientID: '34',
            patientNotes: [] ,
            patientAge: '64',
            patientBloodType: 'string',
            patientHeight: 'string',
            patientGenotype: 'string',
            patientWeight: 'string',
            patientConditions: [],
            patientPhoneNumber: '',
            patientJoindate: '03/2/2024',
            patientBirthDate: '',
            patientEmail: '',
            admissionStatus: false,
            patientEMO: '',
        }
        
    ];


  return (
    <div className='overflow-hidden relative w-[75%] shadow-sm mt-[100px] mb-4 p-4 mx-6 flex flex-col space-y-6 text-[#161616] bg-white border border-white rounded-[15px] lx:w-[82%]'>
            <h5 className='font-bold tracking-wide text-[14px]'>Patients</h5>

            <div className='w-full min-h-[3rem] flex items-center space-x-[4rem] border-b border-b-[#f1f1f1]'>
                    <button
                        onClick={()=> {
                            updateAddPatientsBorder(false);
                            updateAllPatientsBorder(true)
                        }}
                        className={`h-full text-capitalize font-[500] text-[14px] transition-properties  ${ allPatientsBorder && 'border-b-[#1e293b] border-b-[2.5px]'} `}
                    >
                        All Patients
                    </button>

                    <button
                        onClick={()=> {
                            updateAddPatientsBorder(true);
                            updateAllPatientsBorder(false)
                        }}
                        className={`h-full text-capitalize font-[500] text-[14px] transition-properties ${addPatientsBorder && 'border-b-[#1e293b] border-b-[2.5px]'} `}
                    >
                        Add Patient
                    </button>
            </div>

            {allPatientsBorder ? 
                    <>  
                        <div className='relative w-full flex justify-between items-center'>
                                <p className='text-[14px] font-bold'>All patients</p>

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
                                    <PatientTable columns={columns} data={patientData} />
                                    :
                                    <PatientTable columns={columns} data={searchResults} />
                                }
                                {< PatientProfile patientEditState={patientEditState} updatePatientEditState = {updatePatientEditState} patientData={doctorProfileData} isPatientProfileVisible={isPatientProfileVisible} updatePatientProfileVisibility={setPatientProfileVisibility}/> }
                        </div>
                    </> 
                    : 
                        <AddPatient />
            }
    </div>

  )
}

export default AllPatients