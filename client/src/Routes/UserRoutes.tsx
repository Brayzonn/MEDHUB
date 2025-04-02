import { useEffect } from 'react'
import { Outlet, Navigate } from 'react-router-dom';


const UserRoutes = () => {
    
    const userToken = window.sessionStorage.getItem(`userToken`);     
    
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