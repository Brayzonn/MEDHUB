import { useState, useEffect } from "react";
import { TableColumn } from 'react-data-table-component';
import axios from 'axios';

import AddPatient from "./AddPatient";
import PatientTable from "./PatientTable";
import PatientProfile from "./PatientProfile";
import {PatientProps} from '../DataTypes'
import { useGlobalContext } from '../../context/useGlobalContext';

import spinner from '../../images/loadingspinner.svg'
import { CiSearch } from "react-icons/ci";
import { FaChevronRight } from "react-icons/fa";
import { toast } from "react-toastify";

const AllPatients = () => {

    //global variables
    const userToken = sessionStorage.getItem('userToken');
    const {allPatientData, fetchPatients, baseURL} = useGlobalContext();

    // component variables
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [buttonLoadingAnimation, updateButtonLoadingAnimation] = useState<boolean>(false)
    const [isPatientProfileVisible, setPatientProfileVisibility] = useState<boolean>(false);
    const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] = useState(false);
    const [isInputActive, setInputIsActive] = useState<boolean>(false)
    const [allPatientsBorder, updateAllPatientsBorder] = useState<boolean>(true);
    const [addPatientsBorder, updateAddPatientsBorder] = useState<boolean>(false);
    const [patientEditState, updatePatientEditState] = useState<boolean>(false);
    const [searchResults, setSearchResults] = useState<PatientProps []>([])
    const [activePatientProfile, updateActivePatientProfile] = useState<PatientProps>({
        profile: { patientName: '', patientImage: '' },
        patientID: '',
        patientNotes:  [],
        patientAge: '',
        patientBloodType: '',
        patientHeight: '',
        patientGenotype: '',
        patientWeight: '',
        patientConditions:  [], 
        patientJoinDate: '',
        patientBirthDate: '',
        admissionStatus: false,
        patientPhoneNumber: '',
        patientEmail: '',
        patientEMO: '',
    });


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
        {header: 'Join Date', identifier: 'patientJoinDate', data: ''},
        {header: 'Patient Phone', identifier: 'patientPhoneNumber', data: ''},
        {header: 'Patient Email', identifier: 'patientEmail', data: ''},
        {header: 'Patient EMO', identifier: 'patientEMO', data: ''},  
    ])
 
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            await fetchPatients();
            setIsLoading(false);
        };
    
        fetchData();
    }, []);
    

    //filter patient data based off search parameters
    const searchInputValue = (searchValue: string) => {
        const filtered : PatientProps[]= allPatientData.filter((row: PatientProps) =>
            row.profile.patientName.toLowerCase().includes(searchValue.toLowerCase())
        );
        setSearchResults(filtered);
    }

    const fetchActivePatient = (patientID:string) => {
        const filtered = allPatientData.find((data) => data.patientID === patientID);

        if (filtered) {

            updateActivePatientProfile(filtered);

            sessionStorage.setItem('activePatientProfile', JSON.stringify(filtered))

            updatePatientProfileData((prevPatientData) =>
                prevPatientData.map((item) => ({
                        ...item,
                        data: (filtered[item.identifier as keyof PatientProps] as string) || '',
                }))
            );
      
            setPatientProfileVisibility(true);
      }
    }

    //fetch new selected patient details on data update
    const fetchUpdatedActivePatientData = async (patientID: string) => {   
        const updatedPatients = await fetchPatients()

        const filtered = updatedPatients.find((row) => row.patientID === patientID);

        if (filtered) {
                updateActivePatientProfile(filtered);

                sessionStorage.setItem('activePatientProfile', JSON.stringify(filtered))

                updatePatientProfileData((prevPatientData) =>
                    prevPatientData.map((item) => ({
                            ...item,
                            data: (filtered[item.identifier as keyof PatientProps] as string) || '',
                    }))
                );
        
                setPatientProfileVisibility(true);
        } 
    }

    //delete patient function
    const deletePatientFunction = async (patientID: string) =>{
        try {
                updateButtonLoadingAnimation(true)
                const deletePatientApiCall = await axios.delete(`${baseURL}/api/user/deletepatient`,
                {
                    headers: {
                            Authorization: `Bearer ${userToken}`,
                    },

                    data: {
                            patientID
                    },
                });

                const deletePatientPayload = deletePatientApiCall.data.payload;

                if(deletePatientApiCall.status === 200){
                    toast.success(deletePatientPayload)
                }
                await fetchPatients()
                updateButtonLoadingAnimation(false)
                setIsConfirmationDialogOpen(false)
                setPatientProfileVisibility(false)
        } catch (error) {
                if (axios.isAxiosError(error)) {
                    if (error.response && error.response.data && error.response.data.payload) {
                            toast.error(`Error: ${error.response.data.payload}`);
                    } else {
                            toast.error('Something went wrong');
                    }
                    updateButtonLoadingAnimation(false);
                } else {
                    console.error('Unexpected error:', error);
                    toast.error('An unexpected error occurred');
                    updateButtonLoadingAnimation(false);
                }
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
                  selector: (row) => row.patientJoinDate,
            },
  
            {
                  name: 'Action',
                  cell: (row) =>(
                        <button onClick={()=> {fetchActivePatient(row.patientID); window.scrollTo(0, 400); }} className="w-[30px] h-[30px] flex justify-center items-center relative border bg-gradient-to-r from-slate-500 to-slate-800 border-white rounded-full">
                              <FaChevronRight className = 'text-white' />  
                        </button>
                  )
            }
    ];
 
  
  if (isLoading ) {
        return (
            <div className="relative overflow-hidden flex flex-col justify-center items-center bg-transparent text-black w-full min-h-screen">
                        <img src={spinner} alt="loading" className="w-[50px] h-[50px]" />
            </div>
        )
  } else {
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
                                        {isInputActive === false ?
                                            <PatientTable columns={columns} data={allPatientData} />
                                            :
                                            <PatientTable columns={columns} data={searchResults} />
                                        }
                                        {< PatientProfile 
                                            fetchUpdatedActivePatientData = {fetchUpdatedActivePatientData}
                                            activePatientProfile = {activePatientProfile}
                                            deletePatientFunction = {deletePatientFunction}
                                            buttonLoadingAnimation={buttonLoadingAnimation}
                                            updateButtonLoadingAnimation = {updateButtonLoadingAnimation}
                                            setIsConfirmationDialogOpen ={setIsConfirmationDialogOpen} 
                                            isConfirmationDialogOpen = {isConfirmationDialogOpen}
                                            updatePatientProfile={EditPatientProfile} 
                                            patientEditState={patientEditState} 
                                            updatePatientEditState = {updatePatientEditState} 
                                            patientData={patientProfileData} 
                                            isPatientProfileVisible={isPatientProfileVisible} 
                                            updatePatientProfileVisibility={setPatientProfileVisibility}/> 
                                        }
                                </div>
                            </> 
                            : 
                                <AddPatient />
                    }
            </div>

        )
    }
}

export default AllPatients