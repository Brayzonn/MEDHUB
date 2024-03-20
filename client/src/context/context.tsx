import { createContext, ReactNode, Dispatch, SetStateAction } from 'react';
import axios from 'axios';
import { useState  } from 'react';

import {DoctorProps, DashboardDataProps, StaffProps, PatientProps, NurseProps, AdmissionProps, } from '../components/DataTypes';



interface AppContextProps {
      baseURL: string,
      allDashData: DashboardDataProps[],
      allDoctorData:DoctorProps[];
      updateAllDoctorData: Dispatch<SetStateAction<DoctorProps[]>>;
      allNurseData: NurseProps[];
      updateAllNurseData: Dispatch<SetStateAction<NurseProps[]>>;
      allPatientData: PatientProps[];
      updateAllPatientData: Dispatch<SetStateAction<PatientProps[]>>;
      allStaffData: StaffProps[];
      updateAllStaffData: Dispatch<SetStateAction<StaffProps[]>>;
      allAdmissionsData: AdmissionProps[];
      updateAllAdmissionsData: Dispatch<SetStateAction<AdmissionProps[]>>;

      fetchDoctor: () => Promise<void>;
      fetchNurse: () => Promise<void>;
      fetchPatient: () => Promise<void>;
      fetchStaff: () => Promise<void>;
      fetchAdmissions: () => Promise<void>; 
      fetchDashboardData : () => Promise<void>; 
}

const AppContext = createContext<AppContextProps>({  
      allDoctorData: [],
      updateAllDoctorData: () => {},
      baseURL: '',
      allNurseData: [],
      updateAllNurseData: () => {},
      allPatientData: [],
      updateAllPatientData: () => {},
      allStaffData: [],
      updateAllStaffData: () => {},
      allAdmissionsData: [],
      allDashData : [],
      fetchDashboardData:  async () => {},
      updateAllAdmissionsData: () => {},
      fetchDoctor: async () => {},
      fetchNurse: async () => {},
      fetchPatient: async () => {},
      fetchStaff: async () => {},
      fetchAdmissions: async () => {},
});

// Define the provider component
const AppProvider = ({ children }: { children: ReactNode }) => {
    //base url
    const baseURL = 'https://'

    const [allDashData, updateAllDashData] = useState<DashboardDataProps []>([])
    const [allDoctorData, updateAllDoctorData] = useState<DoctorProps []>([])
    const [allNurseData, updateAllNurseData] = useState<NurseProps []>([])
    const [allPatientData, updateAllPatientData] = useState<PatientProps[]>([])
    const [allStaffData, updateAllStaffData] = useState<StaffProps[]>([])
    const [allAdmissionsData, updateAllAdmissionsData] = useState<AdmissionProps []>([])
      
    // Get the token from sessionStorage
    const userToken = sessionStorage.getItem('userToken');

    const UserAuthConfig = {
          headers: {
              Authorization: `Bearer ${userToken}`,
          },
    };

    //fetch dashboard data
    const fetchDashboardData = async () => { 
        try {
            const dashResponse = await axios.get(`${baseURL}/api/user/getdashdata`, UserAuthConfig);
            const dashData = dashResponse.data;
            updateAllDashData(dashData);
        } catch (error) {
            console.log(error)
        }  
    }

    //fetch doctor data
    const fetchDoctor = async () => { 
        try {
            const doctorResponse = await axios.get(`${baseURL}/api/user/getalldoctors`, UserAuthConfig);
            const doctorData = doctorResponse.data;
            updateAllDoctorData(doctorData);
        } catch (error) {
            console.log(error)
        }  
    }

    //fetch nurse data
    const fetchNurse = async () => { 
        try {
            const nurseResponse = await axios.get(`${baseURL}/api/user/getallnurses`, UserAuthConfig);
            const nurseData = nurseResponse.data;
            updateAllNurseData(nurseData);
        } catch (error) {
            console.log(error)
        }  
    }

    //fetch patient data
    const fetchPatient = async () => { 
        try {
            const patientResponse = await axios.get(`${baseURL}/api/user/getallpatients`, UserAuthConfig);
            const patientData = patientResponse.data;
            updateAllPatientData(patientData);
        } catch (error) {
            console.log(error)
        }  
    }

    //fetch staff data
    const fetchStaff = async () => { 
        try {
            const staffResponse = await axios.get(`${baseURL}/api/user/getallstaffs`, UserAuthConfig);
            const staffData = staffResponse.data;
            updateAllStaffData(staffData);
        } catch (error) {
            console.log(error)
        }  
    }

    //fetch admission data
    const fetchAdmissions = async () => { 
        try {
            const admissionResponse = await axios.get(`${baseURL}/api/user/getalladmissions`, UserAuthConfig);
            const admissionData = admissionResponse.data;
            updateAllAdmissionsData(admissionData);
        } catch (error) {
            console.log(error)
        }  
    }

    return <AppContext.Provider value={{
        baseURL,
        fetchDoctor,
        allDoctorData,
        allDashData,
        fetchDashboardData,
        updateAllDoctorData,
        fetchNurse,
        allNurseData,
        updateAllNurseData,
        fetchPatient,
        allPatientData,
        updateAllPatientData,
        fetchStaff,
        allStaffData,
        updateAllStaffData,
        fetchAdmissions,
        allAdmissionsData, 
        updateAllAdmissionsData
    }}>{children}</AppContext.Provider>;
};

const AppContextExports = { AppProvider, AppContext };

export default AppContextExports