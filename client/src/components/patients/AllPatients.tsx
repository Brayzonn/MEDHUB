import { useState } from "react";
import { TableColumn } from 'react-data-table-component';

import AddPatient from "./AddPatient";
import PatientTable from "./PatientTable";
import PatientProfile from "./PatientProfile";
import {PatientProps} from '../DataTypes'
import { useGlobalContext } from '../../context/useGlobalContext';

import { CiSearch } from "react-icons/ci";
import { FaChevronRight } from "react-icons/fa";

const AllPatients = () => {

    const {allPatientData} = useGlobalContext();

    const [searchResults, setSearchResults] = useState<PatientProps []>([])
    const [isInputActive, setInputIsActive] = useState<boolean>(false)
    const [allPatientsBorder, updateAllPatientsBorder] = useState<boolean>(true);
    const [addPatientsBorder, updateAddPatientsBorder] = useState<boolean>(false);
    const [patientEditState, updatePatientEditState] = useState<boolean>(false);
    const [activePatientProfile, updateActivePatientProfile] = useState<PatientProps>();

    const [patientProfileData, updatePatientProfileData] = useState([
        {header: 'Patient Name', identifier: 'patientName', data: ''},
        {header: 'Patient ID', identifier: 'patientID', data: ''},
        {header: 'Patient Notes', identifier: 'patientNotes', data: ''},
        {header: 'Patient Age', identifier: 'patientAge', data: ''},
        {header: 'Blood Type', identifier: 'patientBloodType', data: ''},
        {header: 'Patient Height', identifier: 'patientHeight', data: ''},
        {header: 'Patient Genotype', identifier: 'patientGenotype', data: ''},
        {header: 'Patient Weight', identifier: 'patientWeight', data: ''},
        {header: 'Patient Conditions', identifier: 'patientConditions', data: ''},
        {header: 'Join Date', identifier: 'patientJoindate', data: ''},
        {header: 'Patient Phone', identifier: 'patientPhoneNumber', data: ''},
        {header: 'Patient Email', identifier: 'patientEmail', data: ''},
        {header: 'Patient EMO', identifier: 'patientEMO', data: ''},  
    ])
 
    //filter patient data based off search parameters
    const searchInputValue = (searchValue: string) => {
        const filtered : PatientProps[]= allPatientData.filter((row: PatientProps) =>
            row.profile.patientName.toLowerCase().includes(searchValue.toLowerCase())
        );
        setSearchResults(filtered);
    }
  
    const [isPatientProfileVisible, setPatientProfileVisibility] = useState<boolean>(false);

  
    const fetchPatient = (patientID:string) => {
        const filtered = allPatientData.find((data) => data.patientID === patientID);
        updateActivePatientProfile(filtered)
  
        if (filtered) {
            updatePatientProfileData((prevPatientData) =>
                prevPatientData.map((item) => ({
                        ...item,
                        data: (filtered[item.identifier as keyof PatientProps] as string) || '',
                }))
            );
        
            setPatientProfileVisibility(true);
        }
    }

    const EditPatientProfile = () =>{

        if (activePatientProfile) {
            sessionStorage.setItem('activePatientProfile', JSON.stringify(activePatientProfile));
            updatePatientProfileData((prevPatientData) =>
                prevPatientData.map((item) => ({
                        ...item,
                        data: (activePatientProfile[item.identifier as keyof PatientProps] as string) || '',
                }))
            );
            setPatientProfileVisibility(false);         
        }  

    }
  
    const columns: TableColumn<PatientProps>[] = [
            {
                  name: 'Patient',
                  selector: (row) => row.profile.patientName,
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
                        <button onClick={()=> {fetchPatient(row.profile.patientName); window.scrollTo(0, 400); }} className="w-[30px] h-[30px] flex justify-center items-center relative border bg-gradient-to-r from-slate-500 to-slate-800 border-white rounded-full">
                              <FaChevronRight className = 'text-white' />  
                        </button>
                  )
            }
    ];
  

  return (
    <div className='overflow-hidden relative w-[75%] shadow-sm mt-[100px] mb-4 py-4 px-[2rem] mx-6 flex flex-col space-y-6 text-[#161616]  bg-gradient-to-r from-slate-50 to-slate-100 border border-white rounded-[15px] lx:w-[82%]'>
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
                                    <PatientTable columns={columns} data={allPatientData} />
                                    :
                                    <PatientTable columns={columns} data={searchResults} />
                                }
                                {< PatientProfile updatePatientProfile={EditPatientProfile} patientEditState={patientEditState} updatePatientEditState = {updatePatientEditState} patientData={patientProfileData} isPatientProfileVisible={isPatientProfileVisible} updatePatientProfileVisibility={setPatientProfileVisibility}/> }
                        </div>
                    </> 
                    : 
                        <AddPatient />
            }
    </div>

  )
}

export default AllPatients