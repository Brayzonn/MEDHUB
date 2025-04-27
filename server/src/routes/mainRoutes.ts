const router = require("express").Router();
import { Request, Response, NextFunction } from 'express'

import { ensureAuthenticated } from '../config/auth';
import {signIn, signUp, googleSignin, getDashboardData, addNewDoctor, deleteDoctor, updateDoctorProfile, getAllDoctors, getAllPatients, addNewPatient, deletePatient, updatePatientProfile, createPatientNote, updatePatientNote, deletePatientNote, addClinicRoom, checkInPatient, checkOutPatient, allClinicRooms } from '../controllers/mainController'

//api welcome
router.get('/', (req: Request, res: Response , next: NextFunction)=>{
    res.send('HELLO HUMAN')
})

//auth endpoints
router.post('/signin', signIn)
router.post('/signup', signUp)
router.post('/google/signin', googleSignin)

//dashboard endpoint
router.get('/user/getdashboarddata', ensureAuthenticated, getDashboardData)

//doctor endpoints
router.get('/user/getalldoctors',    ensureAuthenticated, getAllDoctors)
router.post('/user/addnewdoctor',    ensureAuthenticated, addNewDoctor)
router.delete('/user/deletedoctor',  ensureAuthenticated, deleteDoctor)
router.post('/user/updatedoctorprofile',  ensureAuthenticated, updateDoctorProfile)

//patient endpoints
router.get('/user/getallpatients',    ensureAuthenticated, getAllPatients)
router.post('/user/addnewpatient',    ensureAuthenticated, addNewPatient)
router.delete('/user/deletepatient',  ensureAuthenticated, deletePatient)
router.post('/user/updatepatientprofile',  ensureAuthenticated, updatePatientProfile)

router.post('/user/createpatientnotes',    ensureAuthenticated, createPatientNote)
router.post('/user/updatepatientnotes',    ensureAuthenticated, updatePatientNote)
router.delete('/user/deletepatientnote',   ensureAuthenticated, deletePatientNote)

//admission endpoints
router.get('/user/getallclinicrooms',    ensureAuthenticated, allClinicRooms)
router.post('/user/createclinicroom', ensureAuthenticated, addClinicRoom) 
router.post('/user/checkinpatient', ensureAuthenticated, checkInPatient)
router.post('/user/checkoutpatient', ensureAuthenticated, checkOutPatient)
 

export default router 