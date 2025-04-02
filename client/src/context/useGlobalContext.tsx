import { useContext } from 'react';
import AppContextExports from './context';


export const useGlobalContext = () => {
    const {  AppContext } = AppContextExports;
    return useContext(AppContext);
};
