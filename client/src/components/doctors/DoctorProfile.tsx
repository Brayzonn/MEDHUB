import userplaceholder from '../../images/userplaceholderlogo.png'

const DoctorProfile = () => {
  return (
    <div className='z-50 absolute top-0 left-0 w-full h-full flex justify-center items-center text-[#161616]'>
        <div className="shadow-2xl relative p-3 w-[95%] h-[80%] bg-white border border-[#f7f7f7] rounded-[15px]">
            
                  <h5 className='text-[13.50px] font-bold tracking-wide pb-[3rem]'>Doctor profile</h5>


                  <div className="w-full min-h-full flex flex-col space-y-[1rem]">
                        <div className="w-full flex space-x-6">
                                <img src={userplaceholder} alt="profile" className="w-[120px] h-[120px] border border-inherit rounded-full" />

                                <div className='flex flex-col space-y-2'>
                                      <div className='flex items-center space-x-1'>
                                          <h3 className='text-[24px] font-bold text-black'>John Doe</h3>
                                          <p className='text-[20px] text-[#555555]'>(Pediatrician)</p>
                                      </div>
                                      



                                </div>
                        </div>
                  </div>
      
              
        </div> 
    </div>
  )
}

export default DoctorProfile