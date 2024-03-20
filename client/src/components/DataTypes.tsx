//global props
//.....
//Input form props
export interface InputFormProps{
        labelName:  string,
        labelSpan?: string,
        inputValue?: string,
        formValue?: string,
        inputName:  string,
        inputType:  string,
        placeholder?: string,
}

//user token data props
export interface DecodedDataInterface {
        UserId: string, 
        role: string, 
        UserName:string,
}

//dashboard data props
export interface DashboardDataProps {
        patientCount: number,
        doctorCount: number,
        nurseCount: number,
        admittedPatientsCount: number,
        staffCount: number,
} 

//doctor object props
export interface AddDoctorFormInterface {
        doctorSpecialty: string,
        doctorAddress: string,
        doctorPhone: string,
        doctorAge: string,
        doctorName: string,
        doctorDegree: string,
        employmentType: string,
        doctorDept: string,
        doctorImage: string,
        doctorjoindate: string,
}

export interface DoctorProps {
        profile: { doctorName: string; doctorImage: string };
        doctorDepartment: string;
        doctorSpecialty: string;
        doctorJoinDate: string;
        doctorAddress: string,
        doctorPhone: string,
        doctorAge: string,
        doctorDegree: string,
        employmentType: string,
        doctorID: string,
}

//admissions
export interface AdmissionProps {
        buttonAction?: ()=> void,
        roomNumber: string,
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

//patient
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
        patientJoindate: string;
        patientBirthDate: string;
        admissionStatus: boolean;
        patientPhoneNumber: string;
        patientEmail: string;
        patientEMO: string;
}

//staff
export interface StaffProps {
        profile: { staffName: string; staffImage: string };
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

