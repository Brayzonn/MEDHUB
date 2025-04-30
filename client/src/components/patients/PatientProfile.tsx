import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import axios from 'axios';

import { useGlobalContext } from '../../context/useGlobalContext';
import {PatientProfileProps, PatientNotesProps, AdmissionProps} from '../DataTypes';
import ConfirmationDialog from '../globalComponents/ConfirmationDialog';
import EditPatient from "./EditPatient";
import { PatientInputForm } from "../globalComponents/InputForm";
import AdmitPatients from "./AdmitPatients";
import RoomOptions from "../admissions/RoomOptions";


import userplaceholder from '../../images/userplaceholderlogo.png';
import emailIcon from '../../images/mailicon.png';
import phoneIcon from '../../images/mobileicon.png';
import whiteBtnLoader from '../../images/buttonloaderwhite.svg';

import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { MdEditSquare } from "react-icons/md";
import { FaChevronDown } from "react-icons/fa6";
import { MdLocalHospital } from "react-icons/md";
import { FaRegTrashCan } from "react-icons/fa6";




const PatientProfile: React.FC<PatientProfileProps> = ({ fetchUpdatedActivePatientData, deletePatientFunction, activePatientProfile, updatePatientProfileVisibility, updatePatientEditState, patientData, isConfirmationDialogOpen, patientEditState, setIsConfirmationDialogOpen, buttonLoadingAnimation, isPatientProfileVisible}) => {

  const {baseURL, fetchPatients, fetchClinicRoomData, allClinicRoomData} = useGlobalContext();
  const userToken = sessionStorage.getItem('userToken');
  
  //component variables
  const [ButtonLoadingAnimation, setButtonLoadingAnimation] = useState<boolean>(false)
  const [roomOptionsActive, updateRoomOptions]= useState<boolean>(false)
  const [patientToBeAdmitted, setPatientToBeAdmitted] = useState<string>('');
  const [isAddNoteActive, updateIsAddNoteActive] = useState<boolean>(false); 
  const [allAvailableRooms, updateAvailableRooms] = useState<AdmissionProps[]>([]);
  const [isAdmitPatientActive, updateIsAdmitPatientActive] = useState<boolean>(false);
  const [addPatientNotesForm, setAddPatientNotesForm] = useState<PatientNotesProps>({
        noteHeader: '',
        noteText: '',
        prescription: '',
        _id: '',
  })

  const InputFormData = [
        {labelName: 'Note Header',          labelSpan: '*',  inputName: 'noteHeader',    inputType: 'text',      customClassName: 'w-full h-[60px] p-3 border rounded-lg resize-none bg-[#f9f9f9] text-sm text-black', placeholder: 'Constant Migranes'},
        {labelName: 'Note Text',            labelSpan: '*',  inputName: 'noteText',      inputType: 'text',      isTextArea: true,  customClassName: 'w-full h-[150px] p-3 border rounded-lg resize-none bg-[#f9f9f9] text-sm text-black',   placeholder: '...'},
        {labelName: 'Note Prescription',    labelSpan: '*',  inputName: 'prescription',  inputType: 'tel',       isTextArea: true,  customClassName: 'w-full h-[90px] p-3 border rounded-lg resize-none bg-[#f9f9f9] text-sm text-black',  placeholder: 'Panadol, cough syrup.'},
  ]

  const [currentRoomOption, setCurrentRoomOption] = useState<AdmissionProps>({
        roomNumber: '',
        occupantID: '',
        occupantName: '',
        isRoomAvailable: false,
  });
      
  
   useEffect(()=>{
        const fetchData = async () => {
              await fetchClinicRoomData();
        };

        fetchData();
   }, [])


   //check out patient logic
   const checkOutPatientButnFnc = (patientID: string) =>{

        const patientRoom = allClinicRoomData.find(room => room.occupantID === patientID);
    
        if (patientRoom) {
                setCurrentRoomOption(patientRoom);
                updateRoomOptions(true);
                updateIsAdmitPatientActive(false)
        }
   }

   //admit patient logic
   const admitPatientButnFunc = async (patientID: string) =>{

        setPatientToBeAdmitted(patientID)

        const filterForAvailableRooms = allClinicRoomData.filter((row) => row.isRoomAvailable === true)

        if (filterForAvailableRooms) {
           updateAvailableRooms(filterForAvailableRooms);
        }

        updateIsAdmitPatientActive(true); 
   }  

   const closeAdmitPatients = () =>{
        updatePatientProfileVisibility(true); 
        updateIsAdmitPatientActive(false); 
   }


   const showSelectedRoom = (roomID: string)=> {

        const selectedRoom = allClinicRoomData.find(room => room.roomNumber === roomID);
    
        if (selectedRoom) {
                setCurrentRoomOption(selectedRoom);
                updateRoomOptions(true);
                updateIsAdmitPatientActive(false)
        }
   }

   const checkInFunction = async (roomID: string) =>{
        try {
                setButtonLoadingAnimation(true);    
                
                const checkInPatientCall = await axios.post(`${baseURL}/api/user/checkinpatient`, {patientID: patientToBeAdmitted, roomNumber: roomID},
                {
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                    },
                })

                const checkInPatientCallPayload = checkInPatientCall.data.payload;

                if(checkInPatientCall.status === 200){
                        toast.success(checkInPatientCallPayload)
                        fetchUpdatedActivePatientData(activePatientProfile.patientID);
                        await fetchClinicRoomData()
                    
                        setTimeout(() => {
                                setButtonLoadingAnimation(false);
                                updateRoomOptions(false);
                                updatePatientProfileVisibility(true)
                        }, 1000);
                        
                }else{
                        toast.error(checkInPatientCallPayload) 

                        setTimeout(() => {
                                setButtonLoadingAnimation(false);
                                updateRoomOptions(false);
                                updatePatientProfileVisibility(true)
                        }, 1000);
                }
                

        } catch (error) {
                if (axios.isAxiosError(error)) {
                        if (error.response && error.response.data && error.response.data.payload) {
                                toast.error(`Error: ${error.response.data.payload}`);
                                console.error('Unexpected error:', error);
                        } else {
                                toast.error('Something went wrong');
                                console.error('Unexpected error2:', error);
                        }
                        setButtonLoadingAnimation(false);
                } else {
                        console.error('Unexpected error:', error);
                        toast.error('An unexpected error occurred');
                        setButtonLoadingAnimation(false);
                }                
        }   
   }

   const checkOutFunction = async (roomID: string) =>{
        try {
                setButtonLoadingAnimation(true);    
                
                const checkOutPatientCall = await axios.post(`${baseURL}/api/user/checkoutpatient`, {patientID: activePatientProfile.patientID, roomNumber: roomID},
                {
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                    },
                })

                const checkOutPatientCallPayload = checkOutPatientCall.data.payload;

                if(checkOutPatientCall.status === 200){
                        toast.success(checkOutPatientCallPayload)
                        fetchUpdatedActivePatientData(activePatientProfile.patientID);
                        await fetchClinicRoomData()
                    
                        setTimeout(() => {
                                setButtonLoadingAnimation(false);
                                updateRoomOptions(false);
                                updatePatientProfileVisibility(true)
                        }, 1000);
                        
                }else{
                        toast.error(checkOutPatientCallPayload) 

                        setTimeout(() => {
                                setButtonLoadingAnimation(false);
                                updateRoomOptions(false);
                                updatePatientProfileVisibility(true)
                        }, 1000);
                }
                

        } catch (error) {
                if (axios.isAxiosError(error)) {
                        if (error.response && error.response.data && error.response.data.payload) {
                                toast.error(`Error: ${error.response.data.payload}`);
                                console.error('Unexpected error:', error);
                        } else {
                                toast.error('Something went wrong');
                                console.error('Unexpected error2:', error);
                        }
                        setButtonLoadingAnimation(false);
                } else {
                        console.error('Unexpected error:', error);
                        toast.error('An unexpected error occurred');
                        setButtonLoadingAnimation(false);
                }                
        } 
   }

  
  //open patient profile edit state
  const editPatientProfileFunc = () => {
        updatePatientProfileVisibility(false);
        updatePatientEditState(true);  
  }

  //function to display header patient data
  const getProfileData = (identifier: string) => {
        const item = patientData.find(entry => entry.identifier === identifier);
        return item?.data || '';
  };


  //confirmation dialog logic
  const [confirmationData, setConfirmationData] = useState<{
        title: string;
        message: string; 
        onConfirm: () => void;
  } | null>(null);


  const openConfirmationDialog = (
        title: string,
        message: string,
        onConfirm: () => void
      ) => {
        setConfirmationData({ title, message, onConfirm });
        setIsConfirmationDialogOpen(true);
  };


  //actions on patient note cancel button
  const patientNoteBtnCancelFunc = () =>{
        updateIsAddNoteActive(false);  
        setAddPatientNotesForm({
                noteHeader: '',
                noteText: '',
                prescription: '',
                _id: '',
        }); 
  }

   //patient notes logic
   const createNewNote = async () => {
        try {
                setButtonLoadingAnimation(true);    
                const addNewPatientNoteApiCall = await axios.post(`${baseURL}/api/user/createpatientnotes`, {...addPatientNotesForm, patientID: activePatientProfile.patientID},
                {
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                    },
                })

                const addNewPatientNoteApiCallPayload = addNewPatientNoteApiCall.data.payload;

                if(addNewPatientNoteApiCall.status === 200){
                        toast.success(addNewPatientNoteApiCallPayload)
                        fetchUpdatedActivePatientData(activePatientProfile.patientID);

                        setTimeout(() => {
                                setButtonLoadingAnimation(false);
                                updateIsAddNoteActive(false);
                        }, 1000);
                        
                }else{
                        toast.error(addNewPatientNoteApiCallPayload) 

                        setTimeout(() => {
                                setButtonLoadingAnimation(false);
                                updateIsAddNoteActive(false);
                        }, 1000);
                }
                

        } catch (error) {
                if (axios.isAxiosError(error)) {
                        if (error.response && error.response.data && error.response.data.payload) {
                                toast.error(`Error: ${error.response.data.payload}`);
                                console.error('Unexpected error:', error);
                        } else {
                                toast.error('Something went wrong');
                                console.error('Unexpected error2:', error);
                        }
                        setButtonLoadingAnimation(false);
                } else {
                        console.error('Unexpected error:', error);
                        toast.error('An unexpected error occurred');
                        setButtonLoadingAnimation(false);
                }                
        }
   }

   const editPatientNote = (patientNoteID: string) => {
        const noteToEdit = activePatientProfile.patientNotes.find(note => note._id === patientNoteID);

        if (noteToEdit) {
            setAddPatientNotesForm({
                noteHeader: noteToEdit.noteHeader,
                noteText: noteToEdit.noteText,
                prescription: noteToEdit.prescription,
                _id: noteToEdit._id,
            });
            updateIsAddNoteActive(true);
        }
    };
    

   const updatePatientNote = async () => {
        try { 
               
                setButtonLoadingAnimation(true);    
                
                const updatePatientNoteApiCall = await axios.post(`${baseURL}/api/user/updatepatientnotes`, {...addPatientNotesForm, patientID: activePatientProfile.patientID},
                {
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                    },
                })

                const updatePatientNoteApiCallPayload = updatePatientNoteApiCall.data.payload;

                if(updatePatientNoteApiCall.status === 200){
                        toast.success(updatePatientNoteApiCallPayload)
                        fetchUpdatedActivePatientData(activePatientProfile.patientID);

                        setTimeout(() => {
                                setButtonLoadingAnimation(false);
                                updateIsAddNoteActive(false);
                        }, 1000);
                        
                }else{
                        toast.error(updatePatientNoteApiCallPayload) 

                        setTimeout(() => {
                                setButtonLoadingAnimation(false);
                                updateIsAddNoteActive(false);
                        }, 1000);
                }
                

        } catch (error) {
                if (axios.isAxiosError(error)) {
                        if (error.response && error.response.data && error.response.data.payload) {
                                toast.error(`Error: ${error.response.data.payload}`);
                                console.error('Unexpected error:', error);
                        } else {
                                toast.error('Something went wrong');
                                console.error('Unexpected error2:', error);
                        }
                        setButtonLoadingAnimation(false);
                } else {
                        console.error('Unexpected error:', error);
                        toast.error('An unexpected error occurred');
                        setButtonLoadingAnimation(false);
                }                
        }
   }

   const deletepatientNoteFunc  = async (patientNoteID: string) =>{
        try {
                setButtonLoadingAnimation(true)

                const deletePatientNote = await axios.delete(`${baseURL}/api/user/deletepatientnote`,
                {
                        headers: {
                                Authorization: `Bearer ${userToken}`,
                        },

                        data: {
                                patientNoteID,
                                patientID: activePatientProfile.patientID

                        },
                });

                const deletePatientNotePayload = deletePatientNote.data.payload;

                if(deletePatientNote.status === 200){
                        toast.success(deletePatientNotePayload)
                }else{
                        toast.error(deletePatientNotePayload)
                }
                await fetchPatients()
                setButtonLoadingAnimation(false)
                fetchUpdatedActivePatientData(activePatientProfile.patientID);

        } catch (error) {
                if (axios.isAxiosError(error)) {
                        if (error.response && error.response.data && error.response.data.payload) {
                                toast.error(`Error: ${error.response.data.payload}`);
                        } else {
                                toast.error('Something went wrong');
                        }
                        setButtonLoadingAnimation(false);
                } else {
                        console.error('Unexpected error:', error);
                        toast.error('An unexpected error occurred');
                        setButtonLoadingAnimation(false);
                }
                }    
            
   }
      

  return (
    <>
    {(isPatientProfileVisible && !patientEditState) && <div className="z-50 fixed top-0 left-0 w-full min-h-full flex justify-center items-center text-[#161616]">
               
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                 <div className="absolute inset-0 bg-gray-600 opacity-[0.50]"></div>
          </div>
          
          <div className="shadow-2xl relative px-6 py-8 w-[95%] h-[100%] bg-white border border-[#f7f7f7] rounded-[15px]">
            
                  {confirmationData && (
                        <ConfirmationDialog
                                isOpen={isConfirmationDialogOpen}
                                title={confirmationData.title}
                                message={confirmationData.message}
                                onConfirm={() => {
                                        confirmationData.onConfirm();
                                        setIsConfirmationDialogOpen(false);
                                }}
                                onCancel={() => setIsConfirmationDialogOpen(false)}
                        />
                  )}


                  <div className="w-full min-h-full flex space-x-2">
                        {/* patient details */}
                        <div className="w-[60%] flex flex-col space-y-2 ">
                                <div className="w-full flex space-x-4">
                                        <img 
                                        src={
                                        activePatientProfile.profile.patientImage 
                                        ? `${activePatientProfile.profile.patientImage}?v=${new Date(activePatientProfile.updatedAt || Date.now()).getTime()}`
                                        : userplaceholder
                                        } 
                                        alt="profile" 
                                        className="w-[120px] h-[120px] border border-inherit rounded-full" 
                                        />
                                    
                                        <div className='flex flex-col space-y-2'>
                                                <h3 className='text-[24px] font-bold text-black'>{getProfileData('patientName')}</h3>
                                                <div className='flex items-center flex-wrap w-full'>
                                                        <div className='flex items-center space-x-2 mr-[25px] mb-2'>
                                                                <img src={emailIcon} alt='emailIcon' className='w-[20px] h-[20px]' />
                                                                <a href={`mailto:${getProfileData('patientEmail')}`}  className='text-[#555555] text-[14px]'>{getProfileData('patientEmail')}</a>
                                                        </div>

                                                        <div className='flex items-center space-x-2 mr-[25px] mb-2'>
                                                                <img src={phoneIcon} alt='emailIcon' className='w-[20px] h-[20px]' />
                                                                <p className='text-[#555555] text-[14px]'>{getProfileData('patientPhoneNumber')}</p>
                                                        </div>
                                                </div>
                                        </div>

                                </div>
                                
                                <div className='pt-[1.5rem] flex items-center space-x-12 max-w-[500px]'>
                                        <div className='flex flex-col space-y-1'>
                                                <p className='text-[14px] font-[500] text-[#999999]'>Patient ID</p>
                                                <p className='text-[15px] text-[#555555] font-[500]'>{getProfileData('patientID')}</p>
                                        </div>

                                        <div className='flex flex-col space-y-1'>
                                                <p className='text-[14px] font-[500] text-[#999999] uppercase'>Age</p>
                                                <p className='text-[15px] text-[#555555] font-[500]'>{getProfileData('patientAge')}</p>
                                        </div>

                                        <div className='flex flex-col space-y-1'>
                                                <p className='text-[14px] font-[500] text-[#999999] uppercase'>Blood Type</p>
                                                <p className='text-[15px] text-[#555555] font-[500]'>{getProfileData('patientBloodType')}</p>
                                        </div>

                                        <div className='flex flex-col space-y-1'>
                                                <p className='text-[14px] font-[500] text-[#999999] uppercase'>Genotype</p>
                                                <p className='text-[15px] text-[#555555] font-[500]'>{getProfileData('patientGenotype')}</p>
                                        </div>
                                </div>


                                <div className='w-full flex border-b border-b-[#f1f1f1] pt-8 pb-4'>
                                        <div className='w-[170px] flex justify-center items-center p-1 min-h-[40px] border border-white rounded-md bg-gradient-to-r from-slate-500 to-slate-800 text-white'>
                                            Patient Information
                                        </div>
                                </div>

                                <div className="w-full h-full grid grid-cols-3 gap-[0.50rem]">
                                        {patientData.map((profile, index) =>(
                                            <div key={index} className='max-w-[400px] flex flex-col space-y-1'>
                                                    <p className='text-[14px] font-[500] text-[#999999]'>{profile.header}</p>
                                                    <p className='text-[15px] text-[#555555] font-[500]'>{profile.data}</p>  
                                            </div>
                                        ))}  
                                </div>
                
                                <div className='pt-[1.5rem] w-full flex items-end space-x-2'>
                                        <button onClick={()=>{editPatientProfileFunc(); window.scrollTo(0, 400);}} className="transition-properties p-1 w-[130px] min-h-[40px] text-white border bg-yellow-500 text-[14px] border-yellow-500 rounded-md flex items-center justify-center space-x-1 hover:border-yellow-400 hover:bg-yellow-400">
                                            <MdEditSquare className = "text-white text-[13px]"/>
                                            <p>Edit Profile</p>
                                        </button>

                                        <button onClick={()=>{!activePatientProfile.admissionStatus ? admitPatientButnFunc(activePatientProfile.patientID) : checkOutPatientButnFnc(activePatientProfile.patientID);  window.scrollTo(0, 400);}} className="transition-properties p-1 w-[130px] min-h-[40px] bg-green-500 text-white border border-green-500 text-[14px] rounded-md flex items-center justify-center space-x-1 hover:border-green-400 hover:bg-green-400">
                                            <MdLocalHospital className = "text-white text-[13px]"/>
                                            <p>{activePatientProfile.admissionStatus ? 'Checkout' : 'Admit Patient'}</p>
                                        </button>

                                        <button disabled = {buttonLoadingAnimation ? true : false}  onClick={()=> {openConfirmationDialog("Do you want to delete this patient profile?", "This action is irreversible.", 
                                                () => { deletePatientFunction(activePatientProfile.patientID);
                                                        fetchUpdatedActivePatientData(activePatientProfile.patientID);
                                                        }); }} className="transition-properties w-[130px] h-[40px] bg-[#d42c31] text-white border border-[#d42c31] text-[14px] rounded-md flex items-center justify-center space-x-2 hover:border-[#c63439] hover:bg-[#c63439]">
                                                {buttonLoadingAnimation ? 
                                                                <img src = {whiteBtnLoader} className='w-[15px] h-[15px]' alt='loader'/>    
                                                        :
                                                                <div className="flex items-center justify-center space-x-2">
                                                                        <p>Delete Profile</p>
                                                                        <FaTrash className = "text-white text-[14px]"/>
                                                                </div>
                                                }
                                        </button>
                                </div>
                        </div>

                        {/* patient notes */}
                        <div className='relative w-[40%] min-h-[18rem] flex flex-col items-end'>

                                <div className="absolute w-full max-h-full flex flex-col items-end space-y-2"> 
                                        <button onClick={()=> {sessionStorage.removeItem('activePatientProfile'); updatePatientProfileVisibility(false); fetchPatients();}} className="transition-properties p-1 w-[100px] min-h-[40px] bg-black text-white border border-black text-[14px] rounded-md flex items-center justify-center space-x-2 hover:border-[#121212] hover:bg-[#121212]">
                                                <FaChevronDown className ='text-white text-[13px]'/>
                                                <p>Close</p>
                                        </button>        

                                        <div className="relative p-3 bg-gradient-to-r from-slate-800 to-slate-900 border border-white rounded-md w-full h-full overflow-x-hidden overflow-y-auto">
                                                
                                                <div className=" w-full flex justify-between items-center mb-2">
                                                        <h4 className="relative text-[13px] pb-2 text-[#bdbbbb]">Patient notes</h4>

                                                        <button onClick={()=> {updateIsAddNoteActive(true);}} className="max-w-[200px] min-h-[20px] px-2 py-1 text-[12px] border border-transparent rounded-md bg-gradient-to-r from-slate-300 to-slate-400 flex justify-center items-center">
                                                                Add note
                                                        </button>
                                                </div>
                                               
                                               {/* add note */}
                                                {isAddNoteActive ? <div className="mb-2 w-full min-h-[100px] p-2 flex flex-col space-y-[4rem] border border-[#5d5d5d] rounded-md">

                                                        <PatientInputForm InputFormData={InputFormData} onChangeFunc={setAddPatientNotesForm} formValue={addPatientNotesForm} prevValues={addPatientNotesForm} />

                                                        <div className="w-full flex justify-end items-end space-x-2">
                                                                <button onClick={()=> {patientNoteBtnCancelFunc() }} className="text-white max-w-[300px] min-h-[20px] px-2 py-1 text-[12px] border border-transparent rounded-md bg-gradient-to-r from-red-500 to-red-400 flex justify-center items-center">
                                                                        Cancel
                                                                </button>
                                                                <button onClick={()=> { addPatientNotesForm._id ? updatePatientNote() : createNewNote(); }} className="text-white max-w-[300px] min-h-[20px] px-2 py-1 text-[12px] border border-transparent rounded-md bg-gradient-to-r from-green-500 to-emerald-400 flex justify-center items-center">
                                                                        Add
                                                                </button>
                                                        </div>
                                                </div> 
                                                :
                                                <>
                                                {activePatientProfile.patientNotes.map((profile, index) =>(
                                                        <div key ={index} className="mb-2 w-full min-h-[100px] p-2 flex flex-col border border-[#5d5d5d] rounded-md">
                                                                <div className="w-full flex justify-between">
                                                                        <h4 className="text-[16px] uppercase text-white font-bold">{profile.noteHeader}</h4> 
                                                                        <div className="flex space-x-3 justify-end">
                                                                                <button onClick={()=> editPatientNote(profile._id)}>
                                                                                        <FaEdit className= 'text-white text-[17px]'/>
                                                                                </button>
                                                                                <button onClick={()=>{openConfirmationDialog("Do you want to delete this patient note?", "This action is irreversible.", 
                                                                                                () => {deletepatientNoteFunc(profile._id)}) 
                                                                                        }}>
                                                                                        <FaRegTrashCan className= 'text-red-500 text-[17px]'/>
                                                                                </button>
                                                                        </div>
                                                                </div>
                                                        
                                                                <p className="text-[13px] text-[#6f6f6f] tracking-wide">
                                                                        {profile.date ? new Date(profile.date).toLocaleDateString() : ''}
                                                                </p>

                                                                <div className="w-full flex flex-col">
                                                                        <p className="text-[14px] text-white">{profile.noteText}</p>

                                                                        <div className="flex flex-wrap space-x-3 text-[#9f9d9d] text-[13px]">
                                                                                {profile.prescription}
                                                                        </div>

                                                                </div>
                                                        </div> 
                                                ))}
                                                </>}                                               
                                        </div>
                                </div>

                        </div>

                      
                  </div>      
        </div> 
    </div>}
    

    {(isPatientProfileVisible === false && patientEditState === true) &&
        <EditPatient 
                updatePatientProfileState ={updatePatientProfileVisibility} 
                updateEditPatientState={updatePatientEditState}
                fetchUpdatedActivePatientData = {fetchUpdatedActivePatientData}
        />     
    }

    {(isAdmitPatientActive === true) &&   
        <AdmitPatients 
                closeAdmitPatients = {closeAdmitPatients}
                isAdmitPatientActive = {isAdmitPatientActive} 
                allClinicRooms = {allAvailableRooms} 
                showSelectedRoom = {showSelectedRoom}
        />

    }


    {   <RoomOptions 
                buttonLoadingAnimation = {ButtonLoadingAnimation}
                roomOptionsCheckOutFnc =  {checkOutFunction}
                roomOptionsCheckInFnc = {checkInFunction}
                RoomOptions={currentRoomOption}
                updateRoomOptionsActive ={updateRoomOptions}
                roomOptionsActive ={roomOptionsActive}
        />
    }
    </>
  )
}

export default PatientProfile