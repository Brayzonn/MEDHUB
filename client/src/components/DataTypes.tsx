import {TableColumn } from 'react-data-table-component';


// google auth logic for sign in
export interface AccessToken {
        access_token: string,
        authuser?: string,
        expires_in: number,
        hd?: string,
        prompt: string,
        scope: string,
        token_type: string,
}


export interface InputFormProps{
        labelName:  string,
        labelSpan?: string,
        inputValue?: string,
        formValue?: string,
        inputName:  string,
        inputType:  string,
        placeholder?: string,
}

export interface DecodedDataInterface {
        UserId: string, 
        role: string, 
        userName:string,
}

export interface DecodedJwt{
        exp : number,
        iat : number,
        id: DecodedDataInterface
}

//dashboard data props
export interface DashboardDataProps {
        patientCount: number,
        doctorCount: number,
        nurseCount?: number,
        admissionsCount: number,
        staffCount?: number,
} 

export interface dahshboarddataSchema  {
        image : string,
        number: number,
        tag:string
}

//doctor object props----------------------------
export interface DoctorTableProps {
        columns: TableColumn<DoctorProps>[];
        data:  DoctorProps[];
}


export interface AddDoctorFormInterface {
        doctorSpecialty: string,
        doctorAddress: string,
        doctorPhone: string,
        doctorEmail: string,
        doctorAge: string,
        doctorName: string,
        doctorDegree: string,
        employmentType: string,
        doctorDepartment: string,
        doctorImage: string,
        doctorJoinDate: string,
}

export interface DoctorProps {
        profile: { doctorName: string; doctorImage: string };
        doctorDepartment: string;
        doctorEmail: string,
        doctorSpecialty: string;
        doctorJoinDate: string;
        doctorAddress: string,
        doctorPhone: string,
        doctorAge: string,
        doctorDegree: string,
        employmentType: string,
        doctorID: string,
        updatedAt?: string | Date;
}

export interface EditDoctorProps {
        updateDoctorProfileState: React.Dispatch<React.SetStateAction<boolean>>,
        updateEditDoctorState: React.Dispatch<React.SetStateAction<boolean>>,
        updateProfileVisibility: React.Dispatch<React.SetStateAction<boolean>>,
        updateNewDoctorProfile: (doctorID: string)=> void
}

interface DoctorProfileListProps{
        header: string ,
        data: string,
        identifier: string,
}

export interface DoctorProfileProps {
        doctorData: DoctorProfileListProps[],
        updateDoctorProfileState:React.Dispatch<React.SetStateAction<boolean>>,
        setIsConfirmationDialogOpen: React.Dispatch<React.SetStateAction<boolean>>,
        isConfirmationDialogOpen: boolean,
        deleteDoctorFunction: (doctorID: string) => void,
        updateNewDoctorProfile: (doctorID: string) => void,
        doctorEditState: boolean,
        updateEditDoctorState:React.Dispatch<React.SetStateAction<boolean>>
        activeDoctor: DoctorProps,
        updateButtonLoadingAnimation: React.Dispatch<React.SetStateAction<boolean>>,
        buttonLoadingAnimation: boolean,
        isDoctorProfileVisible: boolean,
        updateProfileVisibility: React.Dispatch<React.SetStateAction<boolean>>,
}
//----------------------------
//patient
export interface PatientTableProps {
        columns: TableColumn<PatientProps>[];
        data:  PatientProps[];
} 
export interface AddPatientFormInterface{
        patientName: string; 
        patientImage: string;
        patientAge: string;
        patientBloodType: string;
        patientHeight: string;
        patientGenotype: string;
        patientWeight: string;
        patientConditions?: string []; 
        patientJoinDate: string;
        patientBirthDate: string;
        patientPhoneNumber: string;
        patientEmail: string;
        patientEMO: string;
}

export interface PatientProps {
        profile: { patientName: string; patientImage: string };
        patientID: string;
        patientNotes: string [] ;
        patientAge: string;
        patientBloodType: string;
        patientHeight: string;
        patientGenotype: string;
        patientWeight: string;
        patientConditions: string []; 
        patientJoinDate: string;
        patientBirthDate: string;
        admissionStatus: boolean;
        patientPhoneNumber: string;
        patientEmail: string;
        patientEMO: string;
        updatedAt?: string | Date;
}

interface PatientProfileListProps{
        header: string ,
        data: string | string[],
        identifier: string,
}
    
export interface PatientProfileProps {
        activePatientProfile: PatientProps,
        updateProfileVisibility:React.Dispatch<React.SetStateAction<boolean>>,
        updateEditPatientState:React.Dispatch<React.SetStateAction<boolean>>,
        buttonLoadingAnimation: boolean,
        setIsConfirmationDialogOpen: React.Dispatch<React.SetStateAction<boolean>>,
        patientData: PatientProfileListProps[],
        updatePatientEditState: React.Dispatch<React.SetStateAction<boolean>>,
        patientEditState: boolean,
        updatePatientProfile: () => void,
        isPatientProfileVisible: boolean,
        updatePatientProfileVisibility: React.Dispatch<React.SetStateAction<boolean>>,
}

//staff
export interface StaffProps {
        profile: { staffName: string, staffImage: string },
        staffAge: string,
        staffDateOfBirth: string,
        staffTimeRole: string,
        staffJoinDate: string,
        staffID: string,
        staffEmail: string,
        staffPhone: string,
        staffAddress: string,
}

export interface StaffFormProps {
        staffName: string,
        staffImage: string,
        staffAge: string,
        staffDateOfBirth: string,
        staffTimeRole: string,
        staffDegree: string,
        staffJoinDate: string,
        staffID: string,
        staffEmail: string,
        staffPhone: string,
}

//admissions
export interface AdmissionProps {
        buttonAction?: ()=> void,
        roomNumber: string,
        checkinDate: string,
        roomStatus: string,
        occupantName: string,
}


//nurse
export interface NurseProps {
        profile: { nurseName: string; nurseImage: string };
        nurseAge: string,
        nurseDateOfBirth: string,
        nurseTimeRole: string,
        nurseDegree: string,
        nurseJoinDate: string,
        nurseID: string,
        nurseEmail: string,
        nursePhone: string,
}

export interface NurseFormProps {
        nurseName: string,
        nurseImage: string,
        nurseAge: string,
        nurseDateOfBirth: string,
        nurseTimeRole: string,
        nurseDegree: string,
        nurseJoinDate: string,
        nurseID: string,
        nurseEmail: string,
        nursePhone: string,
}

