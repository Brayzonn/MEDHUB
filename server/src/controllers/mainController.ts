import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import cloudinary from '../utils/cloudinary';
import generateUserToken from '../utils/jwtTokenFunc';
import {generateUniqueDoctorId, generateUniquePatientId} from '../utils/genIDFuncs';



import {userModel, doctorModel, patientModel, admissionsModel} from '../models/usermodel'
import validateLogin from '../utils/signinLogic';

require('dotenv').config();


//auth controllers-----------------------------------------------------
const signUp = async (req: Request, res: Response , next: NextFunction) => {

    try {
        const {fullName, email, password} = req.body;

        //check required fields
        if( !fullName || !email || !password){
           return res.status(200).json({ payload: 'Please enter all fields' })
        }
    
        // check valid email
        let emailPattern= /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    
        if(!email.match(emailPattern)){
            return res.status(200).json({ payload: 'Invalid email pattern' })
        }
    
        //password length and min characters
        let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{6,20}$/;
    
        if(!password.match(passwordRegex)){
            return res.status(200).json({ payload: 'Password should contain at least 6 characters. An uppercase letter, lowercase letter, number, and a special character.'  }) 
        }
        else{
            const userResponse = await userModel.findOne({email:email.toLowerCase()})
    
            if(userResponse){
                return res.status(200).json({ payload: 'User with this email already exists.' });
            }else{
                const newUser = new userModel({
                    email: email.toLowerCase(),
                    fullName: fullName,
                    role: 'user',
                    password,
                })

                // Hash password
                const salt = await bcrypt.genSalt(10);
                const hash = await bcrypt.hash(newUser.password, salt);
                newUser.password = hash;

                // Save user
                await newUser.save();

                //send success message to client
                res.status(200).json({payload: 'User Registered Successfully'});

            }
        }        
    } catch (error) {
        console.error(error);
        return res.status(500).json({  payload: 'Something went wrong, please try again later' });        
    }

}


//sign in
const signIn = async (req: Request, res: Response , next: NextFunction) => {

    try {
        const {email, password} = req.body;

        //validate sign in attempt
        const signInResponse = await validateLogin(email.toLowerCase(), password);

        if (signInResponse.errMsg) {
            return res.status(200).json({ payload: signInResponse.errMsg});
        }else{
            if(signInResponse.role === 'user'){
                //generate token if no errors
                const token = generateUserToken({userID: signInResponse.userId, role: signInResponse.role, userName: signInResponse.userName});   

                //send data to client
                res.status(200).json({ payload: signInResponse.successMessage, token: token })
            }  
        }
 
    } catch (error) {
        console.error(error);
        return res.status(500).json({ payload: 'Something went wrong, please try again later' });      
    }

}

const googleSignin = async (req: Request, res: Response , next: NextFunction) => {
    try {

        const {email, fullName} = req.body;

        const userExists = await userModel.findOne({email: email.toLowerCase()})

        if(userExists){
            const token = generateUserToken({userID: userExists._id, role: userExists.role, userName: userExists.fullName});   

            return res.status(200).json({ payload: 'Sign in successful', token: token })
        }else{
            const newUser = new userModel({
                email: email.toLowerCase(),
                fullName: fullName,
                role: 'user',
                password: '',
            })
    
            const savedUser = await newUser.save();

            const token = generateUserToken({userID: savedUser._id, role: savedUser.role, userName: savedUser.fullName});   

            return res.status(200).json({payload: 'Sign in successful', token: token })

        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({payload: 'Something went wrong, please try again later' });      
    }
}


//dashboard controller-----------------------------------------------------
const getDashboardData = async (req: Request, res: Response , next: NextFunction) => {
    try {
        const doctorCount = await doctorModel.countDocuments({});
        const patientCount = await patientModel.countDocuments({});
        const admissionsCount = await admissionsModel.countDocuments({});

        res.status(200).json([
            {
                doctorCount,
                patientCount,
                admissionsCount,
            }
        ]);
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({payload: "Something went wrong, please try again later" });
    }
}



//doctors endpoint functions-----------------------------------------------------
const addNewDoctor = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { 
                doctorSpecialty, doctorAddress, doctorPhone, doctorAge, doctorName, 
                doctorDegree, employmentType, doctorDepartment, doctorEmail, doctorJoinDate 
            } = req.body;

            // Ensure all required fields are provided
            if (!doctorSpecialty || !doctorAddress || !doctorPhone || !doctorAge || !doctorName || !doctorDegree || !employmentType || !doctorDepartment || !doctorEmail || !doctorJoinDate) {
                return res.status(400).json({ payload: "Complete all fields" });
            }

            const uploadedFile = req.file;

            //if no file was uploaded
            if (!uploadedFile) {
                return res.status(400).json({ payload: "No file uploaded" });
            }
            const doctorID = await generateUniqueDoctorId();

           //rename uploaded file in cloudinary
           const oldImageId = uploadedFile.filename;  
           const newImageId = `doctorImages/${doctorID}`; 
           
           const renamedResult = await cloudinary.uploader.rename(
               oldImageId,
               newImageId,
               { overwrite: true }
           );

            // Create new doctor record
            const doctorSchema = new doctorModel({
                profile: { doctorName: doctorName.toLowerCase(), doctorImage: renamedResult.secure_url },
                doctorDepartment,
                doctorEmail: doctorEmail.toLowerCase(),
                doctorSpecialty,
                doctorJoinDate,
                doctorAddress,
                doctorPhone,
                doctorAge,
                doctorDegree,
                employmentType,
                doctorID
            });

            await doctorSchema.save();
            return res.status(201).json({ payload: "Doctor added successfully" });
              
        } catch (error) {
            console.error("Error adding doctor:", error);
            return res.status(500).json({ payload: "Something went wrong, please try again later" });
        }
};


const updateDoctorProfile = async (req: Request, res: Response, next: NextFunction) => {     
        try {
            const {
                doctorID,
                doctorSpecialty,
                doctorAddress,
                doctorPhone,
                doctorAge,
                doctorName,
                doctorDegree,
                employmentType,
                doctorDepartment,
                doctorEmail,
                doctorJoinDate,
            } = req.body;

            // Ensure all fields are filled
            if (!doctorSpecialty || !doctorAddress || !doctorPhone || !doctorAge || !doctorName || !doctorDegree || !employmentType || !doctorDepartment || !doctorEmail || !doctorJoinDate) {
                return res.status(400).json({payload: "Complete all fields"});
            }

            const uploadedFile = req.file;
    
            if (uploadedFile) {
                const currentImageFilename = uploadedFile.filename;
                const oldImageId = `doctorImages/${doctorID}`;
                const newImageId = `doctorImages/${doctorID}`;

                await cloudinary.uploader.destroy(oldImageId);

                const renamedResult = await cloudinary.uploader.rename(
                    currentImageFilename,
                    newImageId,
                    { overwrite: true }
                );

                const updateDoctor = await doctorModel.updateOne(
                    { doctorID },
                    {
                        $set: {
                        profile: {
                            doctorName,
                            ...(renamedResult.secure_url && { doctorImage: renamedResult.secure_url }),
                        },
                        doctorSpecialty,
                        doctorAddress,
                        doctorPhone,
                        doctorAge,
                        doctorDegree,
                        employmentType,
                        doctorDepartment,
                        doctorEmail,
                        doctorJoinDate,
                        },
                    }
                );
    
                if (updateDoctor.modifiedCount > 0) {
                    return res.status(200).json({ payload: "Doctor details updated successfully" });
                } else {
                    return res.status(404).json({ payload: "No changes made" });
                }
                  
                
            }else{
                const existingDoctor = await doctorModel.findOne({ doctorID });

                if (!existingDoctor) {
                    return res.status(404).json({ payload: "Doctor not found" });
                }

                const updateDoctor = await doctorModel.updateOne(
                    { doctorID },
                    {
                        $set: {
                        "profile.doctorName": doctorName,
                        doctorSpecialty,
                        doctorAddress,
                        doctorPhone,
                        doctorAge,
                        doctorDegree,
                        employmentType,
                        doctorDepartment,
                        doctorEmail,
                        doctorJoinDate,
                        },
                    }
                );

                if (updateDoctor.modifiedCount > 0) {
                    return res.status(200).json({ payload: "Patient details updated successfully" });
                } else {
                    return res.status(404).json({ payload: "No changes made" });
                }
            }
        }catch (error) {
            console.error("Unexpected error in updateDoctorProfile:", error);
            return res.status(500).json({ payload: "An unexpected error occurred" });
        }
};


const deleteDoctor = async (req: Request, res: Response , next: NextFunction) => {
    try {
        const {doctorID} = req.body;

        const doctorImageID = `doctorImages/${doctorID}`;

        const deleteDoctorCall = await doctorModel.deleteOne({doctorID: doctorID})

        if(deleteDoctorCall.deletedCount > 0){
            await cloudinary.uploader.destroy(doctorImageID);
            res.status(200).json({payload: 'Doctor Deleted successfully'});
        }else{
            res.status(404).json({payload: 'Doctor data could not be deleted'});
        }  
    } catch (error) {
        console.error('Error fetching all doctors:', error);
        return res.status(500).json({ payload: 'Something went wrong, please try again later' });
    }
}

const getAllDoctors = async (req: Request, res: Response , next: NextFunction) => {
    try {
        const allDoctors = await doctorModel.find({}).sort({ date: -1 });
        return res.status(200).json({ payload: allDoctors });
                
    } catch (error) {
        console.error('Error fetching all doctors:', error);
        return res.status(500).json({ message: 'Something went wrong, please try again later' });
    }
};


//patients endpoint functions-----------------------------------------------------
const getAllPatients = async (req: Request, res: Response , next: NextFunction) => {
    try {
        const allPatients = await patientModel.find({}).sort({ date: -1 });
        return res.status(200).json({ payload: allPatients });
                
    } catch (error) {
        console.error('Error fetching all doctors:', error);
        return res.status(500).json({ message: 'Something went wrong, please try again later' });
    }
};

const addNewPatient = async (req: Request, res: Response , next: NextFunction) => {
        try {
            const {
                patientName,
                patientAge,
                patientBloodType,
                patientHeight,
                patientGenotype,
                patientWeight,
                patientJoinDate,
                patientBirthDate,
                patientPhoneNumber,
                patientEmail,
                patientConditions,
                patientEMO,
            } = req.body;

            // Ensure all required fields are provided
            if ( !patientName || !patientAge || !patientConditions || !patientEMO || !patientBloodType || !patientHeight || !patientGenotype || 
                !patientWeight || !patientJoinDate || !patientBirthDate || !patientPhoneNumber || !patientEmail) {
                return res.status(400).json({ payload: "Complete all fields" });
            }

            const uploadedFile = req.file;

            //if no file was uploaded
            if (!uploadedFile) {
                return res.status(400).json({ payload: "No file uploaded" });
            }
            const patientID = await generateUniquePatientId();

            //rename uploaded file in cloudinary
            const oldImageId = uploadedFile.filename;  
            const newImageId = `patientImages/${patientID}`; 
            
            const renamedResult = await cloudinary.uploader.rename(
                oldImageId,
                newImageId,
                { overwrite: true }
            );
            
            // Create new patient record
            const savePatient = new patientModel({
                profile: { patientName: patientName, patientImage:  renamedResult.secure_url},
                patientID: patientID,
                patientAge: patientAge,
                patientBloodType: patientBloodType,
                patientHeight: patientHeight,
                patientGenotype: patientGenotype,
                patientWeight: patientWeight,
                patientConditions: patientConditions,
                patientJoinDate: patientJoinDate,
                patientBirthDate: patientBirthDate,
                patientPhoneNumber: patientPhoneNumber, 
                patientEmail: patientEmail,
                admissionStatus: false,
                patientEMO: patientEMO,
            });

            await savePatient.save();
            return res.status(201).json({ payload: "Patient added successfully" });
    
        } catch (error) {
            console.error("Error adding patient:", error);
            return res.status(500).json({ payload: "Something went wrong, please try again later" });
        }
};

const updatePatientProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {
            patientName,
            patientID,
            patientAge,
            patientBloodType,
            patientHeight,
            patientGenotype,
            patientWeight,
            patientJoinDate,
            patientBirthDate,
            patientPhoneNumber,
            patientEmail,
            patientConditions,
            patientEMO,
        } = req.body;

        if (
            !patientName || !patientAge || !patientConditions || !patientEMO || !patientBloodType || !patientHeight ||
            !patientGenotype || !patientWeight || !patientJoinDate || !patientBirthDate || !patientPhoneNumber || !patientEmail
        ) {
            return res.status(400).json({ payload: "Complete all fields" });
        }

        const uploadedFile = req.file;

        if (uploadedFile) {
            const currentImageFilename = uploadedFile.filename;
            const oldImageId = `patientImages/${patientID}`;
            const newImageId = `patientImages/${patientID}`;

            await cloudinary.uploader.destroy(oldImageId);

            const renamedResult = await cloudinary.uploader.rename(
                currentImageFilename,
                newImageId,
                { overwrite: true }
            );

            const updatePatient = await patientModel.updateOne(
                { patientID },
                {
                    $set: {
                        profile: {
                            patientName,
                            ...(renamedResult.secure_url && { patientImage: renamedResult.secure_url }),
                        },
                        patientAge,
                        patientBloodType,
                        patientHeight,
                        patientGenotype,
                        patientWeight,
                        patientConditions,
                        patientJoinDate,
                        patientBirthDate,
                        patientPhoneNumber,
                        patientEmail,
                        patientEMO,
                    },
                }
            );

            if (updatePatient.modifiedCount > 0) {
                return res.status(200).json({ payload: "Patient details updated successfully" });
            } else {
                return res.status(404).json({ payload: "No changes made" });
            }
        } else {
            const existingPatient = await doctorModel.findOne({ patientID });

            if (!existingPatient) {
                return res.status(404).json({ payload: "Patient not found" });
            }
            
            const updatePatient = await patientModel.updateOne(
                { patientID },
                {
                    $set: {
                        "profile.patientName": patientName,
                        patientAge,
                        patientBloodType,
                        patientHeight,
                        patientGenotype,
                        patientWeight,
                        patientConditions,
                        patientJoinDate,
                        patientBirthDate,
                        patientPhoneNumber,
                        patientEmail,
                        patientEMO,
                    },
                }
            );

            if (updatePatient.modifiedCount > 0) {
                return res.status(200).json({ payload: "Patient details updated successfully" });
            } else {
                return res.status(404).json({ payload: "No changes made" });
            }
        }

    } catch (error) {
        console.error("Unexpected error in updatePatientProfile:", error);
        return res.status(500).json({ payload: "An unexpected error occurred" });
    }
};


const createPatientNote = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { patientID, noteHeader, noteText, prescription } = req.body;

        if (!patientID || !noteHeader || !noteText || !prescription) {
            return res.status(400).json({ payload: 'Complete all fields' });
        }

        const newPatientNote = {
            noteHeader,
            noteText,
            prescription,
            lastEdited: new Date(),
            date: new Date()
        };

        const createPatientNote = await patientModel.updateOne(
            { patientID },
            {
                $push: {
                    patientNotes: newPatientNote
                }
            }
        );

        if (createPatientNote.modifiedCount === 0) {
            return res.status(404).json({ payload: 'Patient not found or note not added' });
        }
          
        return res.status(200).json({ payload: 'Note updated successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ payload: 'Server error' });
    }
};

const updatePatientNote = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { patientID, noteHeader, noteText, prescription, _id } = req.body;

        if (!patientID || !noteHeader || !noteText || !prescription || !_id) {
            return res.status(400).json({ payload: 'Missing credentials' });
        }

        const updatePatientNote = await patientModel.updateOne(
            {
                patientID,
                "patientNotes._id": _id
            },
            {
                $set: {
                    "patientNotes.$.noteHeader": noteHeader,
                    "patientNotes.$.noteText": noteText,
                    "patientNotes.$.prescription": prescription,
                    "patientNotes.$.lastEdited": Date.now(),
                }
            }
        );


        if (updatePatientNote.modifiedCount === 0) {
            return res.status(404).json({ payload: 'Note not updated' });
        }
          
        return res.status(200).json({ payload: 'Note updated successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ payload: 'Server error' });
    }
};

const deletePatientNote = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { patientID, patientNoteID } = req.body;

        if (!patientID || !patientNoteID) {
            return res.status(400).json({ payload: 'Could not delete note' });
        }

        const result = await patientModel.updateOne(
            { patientID },
            {
                $pull: {
                    patientNotes: { _id: patientNoteID }
                }
            }
        );

        if (result.modifiedCount === 0) {
            return res.status(404).json({ payload: 'Note not deleted' });
        }

        return res.status(200).json({ payload: 'Note deleted successfully' });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ payload: 'Server error' });
    }
};


  
const deletePatient = async (req: Request, res: Response , next: NextFunction) => {
    try {
        const {patientID} = req.body;

        const patientImageID = `patientImages/${patientID}`;

        const deletePatientCall = await patientModel.deleteOne({patientID: patientID})

        if(deletePatientCall.deletedCount > 0){
            await cloudinary.uploader.destroy(patientImageID);
            res.status(200).json({payload: 'Patient Deleted successfully'});
        }else{
            res.status(404).json({payload: 'Patient data could not be deleted'});
        }     
      
    } catch (error) {
        return res.status(500).json({ payload: 'Something went wrong, please try again later' });
    }
};



//admissions end point controllers-----------------------------------------------------
const allClinicRooms = async (req: Request, res: Response , next: NextFunction) => {
    try {
        const allRooms = await admissionsModel.find({}).sort({ date: -1 });
        return res.status(200).json({ payload: allRooms });
                
    } catch (error) {
        console.error('Error fetching all rooms:', error);
        return res.status(500).json({ message: 'Something went wrong, please try again later' });
    }
}


const addClinicRoom = async (req: Request, res: Response , next: NextFunction) => {
    try {
        const {roomNumber} = req.body;

        const existing = await admissionsModel.findOne({ roomNumber: roomNumber });

        if (existing) {
            return res.status(400).json({ payload: 'Room already exists' });
        }

        const createRoom = new admissionsModel({
            roomNumber: roomNumber,
            occupantID: '',
            occupantName: '',
            isRoomAvailable: true,
            checkInDate: Date.now(),
        });

        await createRoom.save();

        return res.status(200).json({ payload: 'Room added successfully' });

    } catch (error) {
        return res.status(500).json({ payload: 'Something went wrong, please try again later' }); 
    }

}


const checkInPatient = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { patientID, roomNumber } = req.body;
    
        const findPatient = await patientModel.findOne({ patientID });

        if (!findPatient) {
            return res.status(404).json({ payload: "Patient not found, contact support." });
        }
  
        const findRoom = await admissionsModel.findOne({ roomNumber });

        if (!findRoom) {
            return res.status(404).json({ payload: "Room not found" });
        }
  
        if (!findRoom.isRoomAvailable) {
            return res.status(400).json({ payload: "Room is currently unavailable" });
        }
  
        const updateRoom = await admissionsModel.updateOne(
            { roomNumber },
            {
            $set: {
                isRoomAvailable: false,
                occupantID: patientID,
                occupantName: findPatient.profile.patientName,
                checkInDate: new Date(),
            },
            }
        );
    
        if (updateRoom.modifiedCount === 0) {
            return res.status(500).json({ payload: "Room not updated" });
        }

        const updatePatient = await patientModel.updateOne(
            { patientID },
            { $set: { admissionStatus: true } }
        )

        if (updatePatient.modifiedCount === 0) {
            return res.status(500).json({ payload: "Patient status not updated" });
        }
    
        return res.status(200).json({ payload: "Patient checked in successfully" });
  
    } catch (error) {
        console.error(error);
        return res.status(500).json({ payload: 'Something went wrong, please try again later' });
    }
};
  

const checkOutPatient = async (req: Request, res: Response , next: NextFunction) => {
    try {
        const {patientID, roomNumber} = req.body;
        
        const findRoom = await admissionsModel.findOne({ roomNumber });

        if (!findRoom) {
            return res.status(404).json({ payload: "Room not found" });
        }
              
        const updateRoom = await admissionsModel.updateOne(
            { roomNumber },
            {
                $set: {
                    isRoomAvailable: true,
                    occupantID: '',
                    occupantName: '',
                    checkInDate: '',
                },
            }
        );
            
        if (updateRoom.modifiedCount === 0) {
            return res.status(500).json({ payload: "Patient not checked-out" });
        }

        const updatePatient = await patientModel.updateOne(
            { patientID },
            { $set: { admissionStatus: false } }
        )
        
        if (updatePatient.modifiedCount === 0) {
            return res.status(500).json({ payload: "Patient not checked-out" });
        }
    
        return res.status(200).json({ payload: "Patient checked out successfully" });
        
    } catch (error) {
        return res.status(500).json({ payload: 'Something went wrong, please try again later' }); 
    }

}

export {getAllPatients, deletePatient, addNewPatient, updatePatientProfile, createPatientNote, updatePatientNote, deletePatientNote,
        getDashboardData, signIn, signUp, googleSignin, 
        addNewDoctor, getAllDoctors, deleteDoctor, updateDoctorProfile,
        addClinicRoom, checkInPatient, checkOutPatient, allClinicRooms
}