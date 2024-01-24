import  { useState } from 'react';
import { FaChevronDown } from "react-icons/fa";
import { IoLogInOutline } from "react-icons/io5";
import userplaceholder from '../../images/userplaceholderlogo.png'

const NavSection = () => {

         
  const [signoutbtn, updatesignoutbtn] = useState<boolean>(false);



  return (
        <nav className="relative w-full h-[70px] bg-white flex items-center justify-between px-[1rem] border-b border-b-[#F4F7FC]">
                <h1 className="text-black">MEDHUB</h1>

                <div className="flex items-center space-x-2">
                            <img src = {userplaceholder} alt="profile-icon" className = 'w-[30px] h-[30px] border-inherit rounded-full' />

                            <button onClick={()=> updatesignoutbtn(!signoutbtn)} className="flex items-center space-x-2 text-[#ABABAB] text-[15px]">
                                    <p>Sarah Johnson</p>
                                    <FaChevronDown className = "text-[13px]"/>
                            </button>

                            {signoutbtn && <button className='transition-properties absolute flex justify-center items-center space-x-1 text-[15px] top-[50px] 
                                                              right-[35px] w-[100px] h-[40px]border-white  border rounded-[3px] bg-white shadow-inner'>       
                                    <p className=''>Sign-out</p>
                                    <IoLogInOutline className = "text-[20px] text-black"/>  
                            </button>}
                </div>
        </nav>
  ) 
}

export default NavSection