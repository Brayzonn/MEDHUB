import { createContext, ReactNode, Dispatch, SetStateAction } from 'react';
import axios from 'axios';
import { useState  } from 'react';

import {DoctorProps, DashboardDataProps, PatientProps, AdmissionProps} from '../components/DataTypes';



interface AppContextProps {
      baseURL: string,
      allDashData: DashboardDataProps[],
      allDoctorData:DoctorProps[];
      updateAllDoctorData: Dispatch<SetStateAction<DoctorProps[]>>;
      allPatientData: PatientProps[];
      updateAllPatientData: Dispatch<SetStateAction<PatientProps[]>>;
      allAdmissionsData: AdmissionProps[];
      updateAllAdmissionsData: Dispatch<SetStateAction<AdmissionProps[]>>;

      fetchDoctors: () => Promise<DoctorProps[]>;
      fetchPatients: () => Promise<PatientProps[]>;
      fetchAdmissions: () => Promise<void>; 
      fetchDashboardData : () => Promise<void>; 
}

const AppContext = createContext<AppContextProps>({  
      allDoctorData: [],
      updateAllDoctorData: () => {},
      baseURL: '',
      allPatientData: [],
      updateAllPatientData: () => {},
      allAdmissionsData: [],
      allDashData : [],
      fetchDashboardData:  async () => {},
      updateAllAdmissionsData: () => {},
      fetchDoctors: async () => [],
      fetchPatients: async () => [],
      fetchAdmissions: async () => {},
});

// Define the provider component
const AppProvider = ({ children }: { children: ReactNode }) => {
    //base url
    const baseURL = 'http://localhost:3300'

    const [allDashData, updateAllDashData] = useState<DashboardDataProps[]>([])
    const [allDoctorData, updateAllDoctorData] = useState<DoctorProps []>([])
    const [allPatientData, updateAllPatientData] = useState<PatientProps[]>([])
    const [allAdmissionsData, updateAllAdmissionsData] = useState<AdmissionProps []>([])
      
    // Get the token from sessionStorage
    const userToken = sessionStorage.getItem('userToken');

    //fetch dashboard data
    const fetchDashboardData = async () => { 
        try {
            const UserAuthConfig = {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('userToken')}`, 
                },
            };
            const dashResponse = await axios.get(`${baseURL}/api/user/getdashboarddata`, UserAuthConfig);
            const dashData = dashResponse.data;
            updateAllDashData(dashData);
        } catch (error) {
            console.log(error)
        }  
    }

    //fetch doctor data
    const fetchDoctors = async () => { 
        try {
            const authConfig = {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('userToken')}`, 
                },
            };
            const doctorResponse = await axios.get(`${baseURL}/api/user/getalldoctors`, authConfig);
            const doctorData = doctorResponse.data.payload;
            updateAllDoctorData(doctorData);
            return doctorData;
        } catch (error) {
            console.log(error);
        }  
    };

    //fetch patient data
    const fetchPatients = async () => { 
        try {
            const authConfig = {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('userToken')}`,
                },
            };
            const patientResponse = await axios.get(`${baseURL}/api/user/getallpatients`, authConfig);
            const patientData = patientResponse.data.payload;
            updateAllPatientData(patientData);
            return patientData;
        } catch (error) {
            console.log(error)
        }  
    }
    

    //fetch admission data
    const fetchAdmissions = async () => { 
        try {
            const UserAuthConfig = {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('userToken')}`,
                },
            };
            const admissionResponse = await axios.get(`${baseURL}/api/user/getalladmissions`, UserAuthConfig);
            const admissionData = admissionResponse.data;
            updateAllAdmissionsData(admissionData);
        } catch (error) {
            console.log(error)
        }  
    }

    return <AppContext.Provider value={{
        baseURL,
        fetchDoctors,
        allDoctorData,
        allDashData,
        fetchDashboardData,
        updateAllDoctorData,
        fetchPatients,
        allPatientData,
        updateAllPatientData,
        fetchAdmissions,
        allAdmissionsData, 
        updateAllAdmissionsData
    }}>{children}</AppContext.Provider>;
};

const AppContextExports = { AppProvider, AppContext };

export default AppContextExports