import mongoose, { Schema, Document} from 'mongoose';


//user schema
interface UserProps{
    fullName: string,
    email: string,
    password: string,
    role: string,
    date: Date,
}

const userSchema = new Schema<UserProps>({
    fullName: String ,
    email: String,
    password: String,
    role: String,
    date: { type: Date, default: Date.now }
})

const userModel = mongoose.model('userModel', userSchema);

//doctor schema
interface DoctorProp{
    profile: { doctorName: string, doctorImage: string },
    doctorDepartment: string,
    doctorEmail: string,
    doctorSpecialty: string,
    doctorJoinDate: string,
    doctorAddress: string,
    doctorPhone: string,
    doctorAge: string,
    doctorDegree: string,
    employmentType: string,
    doctorID: string,
    date: Date,
}

const doctorSchema= new Schema<DoctorProp>({ 
    profile: { doctorName: String, doctorImage: String },
    doctorDepartment: String,
    doctorEmail: String,
    doctorSpecialty: String,
    doctorJoinDate: String,
    doctorAddress: String,
    doctorPhone: String,
    doctorAge: String,
    doctorDegree: String,
    employmentType: String,
    doctorID: String,
    date: { type: Date, default: Date.now }
}, { timestamps: true });

const doctorModel = mongoose.model('doctorModel', doctorSchema);


//patient schema
export interface PatientNotesProps {
    date: Date;
    noteHeader: string;
    noteText: string;
    prescription: string;
    lastEdited: Date;
}

interface PatientProp {
    profile: { patientName: string; patientImage: string };
    patientID: string;
    patientNotes: PatientNotesProps[];
    patientAge: string;
    patientBloodType: string;
    patientHeight: string;
    patientGenotype: string;
    patientWeight: string;
    patientConditions: string[];
    patientJoinDate: string;
    patientBirthDate: string;
    admissionStatus: boolean;
    admissionRoomID: string;
    patientPhoneNumber: string;
    patientEmail: string;
    patientEMO: string;
    date: Date;
}

const patientNotesSchema = new Schema<PatientNotesProps>(
    {
      date: { type: Date, default: Date.now }, 
      noteHeader: String,
      noteText: String,
      prescription: [String],
      lastEdited: Date 
    },
    { _id: true } 
  );
  
  
const PatientSchema = new Schema<PatientProp>(
    {
      profile: {
        patientName: String,
        patientImage: String,
      },
      patientID: String,
      patientNotes: [patientNotesSchema], 
      patientAge: String,
      patientBloodType: String,
      patientHeight: String,
      patientGenotype: String,
      patientWeight: String,
      patientConditions: [String],
      patientJoinDate: String,
      patientBirthDate: String,
      patientPhoneNumber: String,
      patientEmail: String,
      admissionStatus: { type: Boolean, default: false },
      admissionRoomID: String,
      patientEMO: String,
      date: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

const patientModel = mongoose.model('patientModel', PatientSchema);

//admissions schema
interface admissionsProp {
    roomNumber: string,
    occupantID: string,
    occupantName: string,
    roomType: string,
    isRoomAvailable: Boolean,
    checkInDate: Date,
}

const admissionsSchema = new Schema<admissionsProp>({ 
    roomNumber:   String,
    occupantID:   String,
    roomType: String,
    occupantName: String,
    isRoomAvailable: { type: Boolean, default: true , required: true},
    checkInDate: { type: Date },
});

const admissionsModel = mongoose.model('admissionsModel', admissionsSchema);


export {userModel, doctorModel, patientModel, admissionsModel};