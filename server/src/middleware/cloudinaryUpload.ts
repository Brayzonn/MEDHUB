import multer from 'multer';
import path from 'path';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../utils/cloudinary';

const storage = new CloudinaryStorage({
    cloudinary,
    params: (req, file) => {
        const folderType = ['/user/addnewpatient', '/user/updatepatientprofile'].includes(req.path)
        ? 'patientImages'
        : 'doctorImages';
      
        return { 
           folder: folderType,
           allowedFormats: ['jpg', 'jpeg', 'png', 'webp'],
           public_id: path.parse(file.originalname).name,
           transformation: [{ width: 500, height: 500, crop: 'limit' }],
        };
    },
});
  

const cloudinaryUpload = multer({ storage });

export default cloudinaryUpload;
