import alladmittedpatients from '../images/allpatientlogo.png';
import alldoctorlogo from '../images/alldoctorlogo.png';
import allappntmntlogo from '../images/allappntmentlogo.png';
import allpatientlogo from '../images/alladmittedpatients.png';

const DashboardSection = () => {

    interface dahshboarddataSchema  {
        image : string,
        number: number,
        tag:string

    }
    const dashboardDisplayData: dahshboarddataSchema[] = [

        { image: allpatientlogo,        number: 100,      tag: 'Total Patients' },
        { image: alldoctorlogo,         number: 10,       tag: 'Total Doctors' },
        { image: allappntmntlogo,       number: 150,      tag: 'Total Appointments' },
        { image: alladmittedpatients,   number: 150,      tag: 'Admitted Patients' },
 
    ];




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

export default DashboardSection