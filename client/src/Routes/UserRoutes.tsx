import { useEffect } from 'react'
import { Outlet, Navigate } from 'react-router-dom';
import { useGlobalContext } from '../context/useGlobalContext'


const UserRoutes = () => {
    
    const{ fetchDoctor, fetchNurse, fetchPatient, fetchStaff, fetchAdmissions} = useGlobalContext();
    
    const userToken = window.sessionStorage.getItem(`userToken`);     

    useEffect(() => {
        const fetchData = async () => {
            try {
                await Promise.all([fetchDoctor(), fetchNurse(), fetchPatient(), fetchStaff(), fetchAdmissions()]);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [fetchDoctor, fetchNurse, fetchPatient, fetchStaff, fetchAdmissions]);
    

    //clear session storage timeout
    useEffect(() => {
        const timeout = setTimeout(() => {
            window.sessionStorage.clear();
        }, 10800000);
    
        return () => clearTimeout(timeout);
    }, []);

    return userToken ? <Outlet /> : <Navigate to = '/user/signin' />
};

export default UserRoutes;