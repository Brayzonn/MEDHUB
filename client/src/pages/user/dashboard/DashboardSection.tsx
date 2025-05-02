import { useEffect, useState } from 'react';
import { useGlobalContext } from '../../../context/useGlobalContext';
import{dahshboarddataSchema} from '../../../types/DataTypes';
import spinner from '../../../images/loadingspinner.svg'
import alladmittedpatients from '../../../images/allpatientlogo.png';
import alldoctorlogo from '../../../images/alldoctorlogo.png';
import allappntmntlogo from '../../../images/allappntmentlogo.png';
import allpatientlogo from '../../../images/alladmittedpatients.png';

const DashboardSection = () => {

    const {fetchDashboardData, allDashData}  =  useGlobalContext();

    const [patientCount, updatePatientCount] = useState<number>()
    const [doctorCount, updateDoctorCount]   =   useState<number>()
    const [staffCount, updateStaffCount]     = useState<number>()
    const [admittedPatientsCount, updateAdmittedPatientsCount] = useState<number>()

    useEffect(()=>{
        fetchDashboardData();  
    }, []);

    useEffect(() => {
        if (allDashData && allDashData.length > 0) {
            updatePatientCount(allDashData[0].patientCount);
            updateDoctorCount(allDashData[0].doctorCount);
            updateStaffCount(allDashData[0].staffCount || 0); 
            updateAdmittedPatientsCount(allDashData[0].admissionsCount);
        }          
    }, [allDashData]); 

    const dashboardDisplayData: dahshboarddataSchema[] = [
        { image: allpatientlogo,        number: patientCount || 0,              tag: 'Total Patients' },
        { image: alldoctorlogo,         number: doctorCount || 0,               tag: 'Total Doctors' },
        { image: allappntmntlogo,       number: staffCount || 0,                tag: 'Total Staff' },
        { image: alladmittedpatients,   number: admittedPatientsCount || 0,     tag: 'Admitted Patients' },
    ];
    

    if (!allDashData || allDashData.length === 0 ) {
        return (
        <div className="relative overflow-hidden flex flex-col justify-center items-center bg-transparent text-black w-full min-h-screen">
                <img src={spinner} alt="loading" className="w-[50px] h-[50px]" />
        </div>

        )
    } else {
        return (
                <div className='relative pt-[130px] px-[1rem] min-h-[10rem] w-[75%] lx:w-[82%]'>
                        <div className='w-full min-h-[200px] flex justify-evenly flex-wrap lx:justify-start'>
                                
                                {dashboardDisplayData.map((data, index) => (
                                        <div key = {index} className='p-2 m-[1rem] flex items-center space-x-3 shadow-lg bg-gradient-to-r from-slate-50 to-slate-100 min-w-[240px] h-[120px] border border-white rounded-[15px] '>
                                            
                                                <img src={data.image} alt='icon' className='h-[50px] w-[50px]'/>
            
                                                <div className='flex flex-col space-y-1 justify-center'>
                                                        <p className='text-[19px] font-[550] text-black'>{data.number}</p>
                                                        <p className='text-[15px] text-[#ABABAB]'>{data.tag}</p>
                                                </div>
                                        </div>
                                ))}  
                                         
                        </div>
            
            
                </div>
        )   
    }


}

export default DashboardSection