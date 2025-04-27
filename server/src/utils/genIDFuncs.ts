import generateRandomId from './randomIdGenerator';
import {doctorModel, patientModel} from '../models/usermodel';


const checkDoctorIdExists = async (doctorId: string): Promise<boolean> => {
    try {
        const existingDoctor = await doctorModel.findOne({ doctorID: doctorId });
        return !!existingDoctor; 
    } catch (error: any) {
        console.error('Database error while checking doctorID:', error);
        throw new Error(`Database error: ${error.message}`);
    }
};

const generateUniqueDoctorId = async (): Promise<string> => {
    try {
        const genDoctorId = generateRandomId(4);
        const isDuplicate = await checkDoctorIdExists(genDoctorId);
      
        if (isDuplicate) {
            return generateUniqueDoctorId();
        } else {
            return genDoctorId; 
        }
    } catch (error) {
        console.error('Error generating unique doctor ID:', error);
        throw new Error('Failed to generate unique doctor ID');
    }
};



const checkPatientIdExists = async (PatientID: string): Promise<boolean> => {
    try {
        const existingPatient = await patientModel.findOne({ PatientID: PatientID });
        return !!existingPatient; 
    } catch (error: any) {
        console.error('Database error while checking PatientID:', error);
        throw new Error(`Database error: ${error.message}`);
    }
};

const generateUniquePatientId = async (): Promise<string> => {
    try {
        const genPatientId = generateRandomId(4);
        const isDuplicate = await checkPatientIdExists(genPatientId);
      
        if (isDuplicate) {
            return generateUniquePatientId();
        } else {
            return genPatientId; 
        }
    } catch (error) {
        console.error('Error generating unique Patient ID:', error);
        throw new Error('Failed to generate unique Patient ID');
    }
};




export {generateUniqueDoctorId, generateUniquePatientId}