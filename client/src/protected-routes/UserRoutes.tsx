import { useEffect, useState } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';

const UserRoutes = () => {
    const [userToken, setUserToken] = useState(() => sessionStorage.getItem('userToken'));
    const location = useLocation();

    useEffect(() => {
        const token = sessionStorage.getItem('userToken');
        const expiry = Number(sessionStorage.getItem('userTokenExpiry'));

        if (!token || !expiry || Date.now() > Number(expiry)) {
            sessionStorage.removeItem('userToken');
            sessionStorage.removeItem('userTokenExpiry');
            setUserToken(null);
        } else {
            setUserToken(token);
        }
    }, [location]);


    useEffect(() => {
        const expiry = sessionStorage.getItem('userTokenExpiry');
        if (expiry) {
            const timeout = setTimeout(() => {
                sessionStorage.removeItem('userToken');
                sessionStorage.removeItem('userTokenExpiry');
                setUserToken(null);
            }, Number(expiry) - Date.now());

            return () => clearTimeout(timeout);
        }
    }, [userToken]);

    return userToken ? <Outlet /> : <Navigate to="/signin" replace />;
};

export default UserRoutes;
