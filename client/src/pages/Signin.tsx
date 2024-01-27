import siginillustration from '../../src/images/Privacy policy-rafiki.svg';
import { RiEyeLine, RiEyeOffLine } from 'react-icons/ri';
import UseScreenWidth from '../components/globalComponents/UseScreenWidth';
import { Link } from 'react-router-dom';
import  { useState } from 'react';

const Signin = () => {

    const screenWidth = UseScreenWidth();


    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };
  

    //if not desktop screen, display error message
    if(screenWidth < 891 ){

            return (
                    <div className='relative w-full h-screen flex flex-col justify-center items-center'>
                            
                            <p className='text-center text-[20px] font-[550]'>Please load app on desktop</p>
                            <div className='text-[25px]'>🙂</div>

                    </div>
            )
    }else{

            return (
                <div className="absolute h-[100vh] w-full flex flex-col justify-start items-start overflow-hidden bg-greyMainBackground">
                        <div className="relative h-full w-full overflow-x-hidden flex flex-col justify-start items-start text-black">              
                                                    
                                <div className="relative w-full h-full flex flex-start justify-center space-x-4 p-4 ">

                                            {/* signin box */}
                                            <div className='w-[50%] flex flex-col justify-center items-center space-y-6'>
                                                    
                                                    <div>
                                                        <p className='text-[25px] font-[550]'>medata</p>
                                                    </div>

                                                    <div className="shadow-lg flex flex-col justify-center items-center space-y-2 w-[370px] min-h-[420px] py-3 px-6 bg-white border border-white rounded-[15px] shadow-[0_35px_60px_-15px_rgba(231, 231, 231, 0.3)]">
                                                                <h5 className='text-[20px] pt-[1rem] font-[550] tracking-wide'>Staff Login</h5>
                                                                <p className='text-[14.40px] pb-[1.3rem] text-[#3c3b3b]'>Enter your account details to sign in</p>

                                                                <div className='w-full flex flex-col space-y-[1rem]'>
                                                                            <div className='flex flex-col space-y-2'>
                                                                                    <label className='text-[15px] text-[#636363]'>Email</label>
                                                                                    <input type="email" name='email' 
                                                                                    placeholder='Enter email'
                                                                                    className='bg-inherit px-2 border-[#e1e1e1] border-[1px] rounded-[5px] w-full h-[42px] text-black text-[16px] focus:border-greyMainBackground focus:bg-greyMainBackground focus:outline-none' 
                                                                                    />
                                                                            </div>

                                                                            <div className='flex flex-col space-y-2 relative'>
                                                                                    <label className='text-[15px] text-[#636363]'>Password</label>
                                                                                    <div className='relative'>
                                                                                        <input
                                                                                            type={showPassword ? 'text' : 'password'}
                                                                                            name='password'
                                                                                            placeholder='Enter password'
                                                                                            className='bg-inherit px-2 border-[#e1e1e1] border-[1px] rounded-[5px] w-full h-[42px] pr-[30px] text-black text-[16px] focus:border-greyMainBackground focus:bg-greyMainBackground focus:outline-none'
                                                                                        />
                                                                                        <div
                                                                                            className='absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer'
                                                                                            onClick={togglePasswordVisibility}
                                                                                        >
                                                                                            {showPassword ? <RiEyeOffLine /> : <RiEyeLine />}
                                                                                        </div>
                                                                                    </div>
                                                                            </div>
                                                                </div>

                                                                <div className='w-full flex justify-end items-start'>
                                                                            <Link to = '/user/forgotpassword' className=' text-purpleSubColor text-right text-[14px] pb-[0.80rem] transition-properties hover:text-[#181762]'>Forgot Password?</Link>
                                                                </div>
                                                                

                                                                <button className='bg-purpleSubColor px-2 text-white border-purpleSubColor border-[1px] rounded-[5px] w-full h-[45px] transition-properties hover:bg-[#181762]'>Sign in</button>

                                                                <div className='py-[1rem] text-[#3c3b3b] text-[14px]'>Don't have an account? <Link className='text-black font-bold' to = '/signup'>Sign up</Link></div>
                    
                                                    </div>

                                            </div>

                                            {/* illustration box */}
                                            <div className='w-[50%] flex justify-start items-center  min-h-full'>
                                                    
                                                    <div className='bg-purpleSubColor px-[1rem] w-full h-full flex flex-col justify-center items-center border border-purpleSubColor rounded-[15px]'>
                                                                <h3 className='text-white font-bold text-[35px] text-center tracking-wider'>Welcome back! </h3>
                                                                <h3 className='text-white font-bold text-[35px] text-center tracking-wider max-w-[500px]'>Please sign in to your <span className='underline'>medata</span> account</h3>
                                                                <p className='py-[2rem] text-[#dcdcdc] font-[450] text-[15px] text-center max-w-[500px]'>Access and manage your hospital data with ease. Stay connected and in control of your medical information.</p>

                                                                <img src = {siginillustration}  className = 'w-[400px] h-auto object-cover' alt='logo' />
                                                    </div>

                                            </div>
                            
                                </div>
                        </div>
                </div>
            )
    }



}

export default Signin