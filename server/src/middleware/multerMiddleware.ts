import multer from 'multer';
import path from 'path';



const doctorImageStorage = multer.diskStorage({
        destination: 'images/doctorimages',
        filename: (req, file, cb) => {
                const tempFileName = `temp-${Date.now()}${path.extname(file.originalname)}`;
                cb(null, tempFileName);
        }
});

const doctorUpload = multer({storage: doctorImageStorage, 
        limits: {
            fileSize: 1024 * 1024 * 10,
        },
          
        fileFilter: (req, file, cb) => {
            const ALLOWED_FILE_TYPES = /\.(jpg|jpeg|png|gif)$/i;
            if (!file.originalname.match(ALLOWED_FILE_TYPES)) {
                return cb(new Error("Invalid file type. Only JPG, PNG, and GIF are allowed."));
            }
            cb(null, true);
        }
                                    
});

const patientImageStorage = multer.diskStorage({
    destination: 'images/patientimages',
    filename: async (req, file, cb) => {
            const tempFileName = `temp-${Date.now()}${path.extname(file.originalname)}`;
            cb(null, tempFileName);
    }
});

const patientUpload = multer({storage: patientImageStorage, 
    limits: {
        fileSize: 1024 * 1024 * 10,
    },
      
    fileFilter: (req, file, cb) => {
        const ALLOWED_FILE_TYPES = /\.(jpg|jpeg|png|gif)$/i;
        if (!file.originalname.match(ALLOWED_FILE_TYPES)) {
            return cb(new Error("Invalid file type. Only JPG, PNG, and GIF are allowed."));
        }
        cb(null, true);
    }
                                
});



export {doctorUpload, patientUpload }