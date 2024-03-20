import { useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';



const AdminRoutes = () => {

    
    
    const admintoken = window.sessionStorage.getItem(`adminToken`);         

    //clear session storage timeout
    useEffect(() => {
        const timeout = setTimeout(() => {
            window.sessionStorage.clear();
        }, 1800000);
    
        return () => clearTimeout(timeout);
    }, []);
  
    return admintoken ? <Outlet /> : <Navigate to = '/admin/signin' />
};

export default AdminRoutes;