import {TableColumn } from 'react-data-table-component';


// google auth logic for sign in
export interface AccessTokenProps {
        access_token: string,
        authuser?: string,
        expires_in: number,
        hd?: string,
        prompt: string,
        scope: string,
        token_type: string,
}


//manual sign up logic
export   interface SignupFormFieldDataSchema {
        email: string,
        fullName: string,
        password: string, 
        confirmPassword: string
}

export interface AllPasswordRequirementsProps {
        text: string,
        status: boolean
}


export interface InputFormProps{
        labelName:  string,
        labelSpan?: string,
        inputValue?: string,
        formValue?: string,
        inputName:  string,
        inputType:  string,
        placeholder?: string,
        customClassName?: string,
        isTextArea?: boolean,
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

//sidenav props
export interface NavLinks {
        to: string;
        icon: string;
        text: string;
        disabled?: boolean;
}
      
      
export  interface SideNavProps {
        navLinks: NavLinks[];
        setIsHovered: React.Dispatch<React.SetStateAction<boolean>>;
        widthClass: string;
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

export interface DoctorInputFormInterface{
        InputFormData: InputFormProps[],
        prevValues: AddDoctorFormInterface,
        formValue?: AddDoctorFormInterface,
        onChangeFunc?: React.Dispatch<React.SetStateAction<AddDoctorFormInterface>>
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
        fetchUpdatedActiveDoctorData: (doctorID: string) => void
}

interface DoctorProfileListProps{
        header: string ,
        data: string,
        identifier: string,
}

export interface DoctorProfileProps {
        doctorData: DoctorProfileListProps[],
        fetchUpdatedActiveDoctorData:  (doctorID: string)=> void,
        updateDoctorProfileState:React.Dispatch<React.SetStateAction<boolean>>,
        setIsConfirmationDialogOpen: React.Dispatch<React.SetStateAction<boolean>>,
        isConfirmationDialogOpen: boolean,
        deleteDoctorFunction: (doctorID: string) => void,
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
export interface PatientInputFormInterface<T> {
        InputFormData: InputFormProps[];
        prevValues: T;
        formValue?: T;
        onChangeFunc?: React.Dispatch<React.SetStateAction<T>>;
        nestedKey?: keyof T; 
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
        patientNotes?: string [] ;
        patientJoinDate: string;
        patientBirthDate: string;
        patientPhoneNumber: string;
        patientEmail: string;
        patientEMO: string;
}

export interface PatientNotesProps {
        date?: Date;
        noteHeader: string;
        noteText: string;
        prescription: string;
        lastEdited?: Date;
        _id: string;
}

export interface PatientProps {
        profile: { patientName: string; patientImage: string };
        patientID: string;
        patientNotes: PatientNotesProps[];
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

export interface EditPatientProps {
        updatePatientProfileState: React.Dispatch<React.SetStateAction<boolean>>,
        updateEditPatientState: React.Dispatch<React.SetStateAction<boolean>>,
        fetchUpdatedActivePatientData: (patientID: string) => void
}

interface PatientProfileListProps{
        header: string ,
        data: string | string[],
        identifier: string,
}
    
export interface PatientProfileProps {
        activePatientProfile: PatientProps,
        fetchUpdatedActivePatientData:  (patientID: string)=> void
        buttonLoadingAnimation: boolean,
        updateButtonLoadingAnimation: React.Dispatch<React.SetStateAction<boolean>>,
        isConfirmationDialogOpen: boolean,
        deletePatientFunction: (patientID: string) => void,
        setIsConfirmationDialogOpen: React.Dispatch<React.SetStateAction<boolean>>,
        patientData: PatientProfileListProps[],
        updatePatientEditState: React.Dispatch<React.SetStateAction<boolean>>,
        patientEditState: boolean,
        // updatePatientProfile: () => void,
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

//admissions--------------------------------------------------
export interface AdmissionProps {
        buttonAction?: ()=> void,
        roomNumber: string,
        roomType?: string,
        occupantID: string,
        occupantName: string,
        isRoomAvailable: boolean,
        checkInDate?: Date,
}

export interface AdmitPatientsProps{
        allClinicRooms: AdmissionProps[],
        isAdmitPatientActive?: boolean,
        closeAdmitPatients: ()=> void,
        showSelectedRoom: (roomId: string) => void,
 }

export interface RoomOptionsProps {
        RoomOptions: AdmissionProps,
        buttonLoadingAnimation:boolean ,
        updateRoomOptionsActive: React.Dispatch<React.SetStateAction<boolean>>,
        roomOptionsActive:boolean,
        roomOptionsCheckOutFnc: (roomNumber:string) => void,
        roomOptionsCheckInFnc: (roomNumber:string) => void,
}



