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
      allClinicRoomData: AdmissionProps[];
      updateAllClinicRoomData: Dispatch<SetStateAction<AdmissionProps[]>>;

      fetchDoctors: () => Promise<DoctorProps[]>;
      fetchPatients: () => Promise<PatientProps[]>;
      fetchClinicRoomData: () => Promise<AdmissionProps[]>; 
      fetchDashboardData : () => Promise<void>; 
}

const AppContext = createContext<AppContextProps>({  
      allDoctorData: [],
      updateAllDoctorData: () => {},
      baseURL: '',
      allPatientData: [],
      updateAllPatientData: () => {},
      allClinicRoomData: [],
      allDashData : [],
      fetchDashboardData:  async () => {},
      updateAllClinicRoomData: () => {},
      fetchDoctors: async () => [],
      fetchPatients: async () => [],
      fetchClinicRoomData: async () => [],
});

// Define the provider component
const AppProvider = ({ children }: { children: ReactNode }) => {
    //base url
    const baseURL = process.env.VITE_SERVER_URL ? process.env.VITE_SERVER_URL : 'http://localhost:3300';

    const [allDashData, updateAllDashData] = useState<DashboardDataProps[]>([])
    const [allDoctorData, updateAllDoctorData] = useState<DoctorProps []>([])
    const [allPatientData, updateAllPatientData] = useState<PatientProps[]>([])
    const [allClinicRoomData, updateAllClinicRoomData] = useState<AdmissionProps []>([])

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
            const UserAuthConfig = {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('userToken')}`, 
                },
            };
            const doctorResponse = await axios.get(`${baseURL}/api/user/getalldoctors`, UserAuthConfig);
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
            const UserAuthConfig = {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('userToken')}`,
                },
            };
            const patientResponse = await axios.get(`${baseURL}/api/user/getallpatients`, UserAuthConfig);
            const patientData = patientResponse.data.payload;
            updateAllPatientData(patientData);
            return patientData;
        } catch (error) {
            console.log(error)
        }  
    }
    

    //fetch admission data
    const fetchClinicRoomData = async () => { 
        try {
            const UserAuthConfig = {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('userToken')}`,
                },
            };
            const admissionResponse = await axios.get(`${baseURL}/api/user/getallclinicrooms`, UserAuthConfig);
            const admissionData = admissionResponse.data.payload;
            updateAllClinicRoomData(admissionData);
            return admissionData;
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
        fetchClinicRoomData,
        allClinicRoomData, 
        updateAllClinicRoomData
    }}>{children}</AppContext.Provider>;
};

const AppContextExports = { AppProvider, AppContext };

export default AppContextExports