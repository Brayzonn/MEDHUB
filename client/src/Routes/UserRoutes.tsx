import { useEffect, useState } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';

const UserRoutes = () => {
    const [userToken, setUserToken] = useState(() => window.sessionStorage.getItem('userToken'));
    const location = useLocation();

    useEffect(() => {

        const timeout = setTimeout(() => {
            window.sessionStorage.clear();
            setUserToken(null);
        }, 10800000); // 3 hours


        const handleStorageChange = () => {
            const token = window.sessionStorage.getItem('userToken');
            setUserToken(token);
        };

        window.addEventListener('storage', handleStorageChange);
        
        return () => {
            clearTimeout(timeout);
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    useEffect(() => {
        const token = window.sessionStorage.getItem('userToken');
        setUserToken(token);
    }, [location]);

    return userToken ? <Outlet /> : <Navigate to = '/user/signin' replace />;
};

export default UserRoutes;
