import  { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import {useGoogleLogin } from '@react-oauth/google';

import UseScreenWidth from '../../components/globalComponents/UseScreenWidth';
import { useGlobalContext } from '../../context/useGlobalContext';
import { AccessToken } from '../../components/DataTypes';

import googleicon from '../../images/googleimage.png'
import whiteBtnLoader from '../../images/buttonloaderwhite.svg';
import siginillustration from '../../../src/images/Privacy policy-rafiki.svg';

import { RiEyeLine, RiEyeOffLine } from 'react-icons/ri';



const Signin = () => {

    const screenWidth = UseScreenWidth();
    const userToken = sessionStorage.getItem('userToken');
    const navigate = useNavigate();
    const {baseURL} =  useGlobalContext();

    const [buttonLoadingAnimation, updateButtonLoadingAnimation] = useState<boolean>(false)
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };


    //google auth logic
    const googleAuthSignin = useGoogleLogin({
        onSuccess: (codeResponse) => {
                googleApi(codeResponse)
        },
        onError: (error) => console.log('Login Failed:', error)
    })

    const googleApi = async (codeResponse: AccessToken) => {
            try {
                const googleApiCall = await axios.get(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${codeResponse.access_token}`, {
                    headers: {
                        Authorization: `Bearer ${codeResponse.access_token}`,
                        Accept: 'application/json'
                    }
                })  

                const userData = googleApiCall.data;

                if(userData){
                    const userValues = {
                        email: userData.email,
                        fullName: userData.name,
                    }

                    const sininGoogleApiCall = await axios.post(`${baseURL}/api/google/signin`, {...userValues})
                    const signInResponseData = sininGoogleApiCall.data
                    const signInResponseStatus: boolean =  signInResponseData.status;

                    if(signInResponseStatus === false){
                        toast.error(signInResponseData.message)
                    }else{
                        sessionStorage.setItem('userToken', JSON.stringify(signInResponseData.token))
                        toast.success('Sign in successful, please wait.')

                        setTimeout(()=>{
                            navigate('/user/dashboard');  
                        }, 2500)  
                    }
                }      
            
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    if (error.response && error.response.data && error.response.data.message) {
                          toast.error(`Error: ${error.response.data.message}`);
                    } else {
                          toast.error('Something went wrong');
                    }
                    updateButtonLoadingAnimation(false);
                } else {
                        console.error('Unexpected error:', error);
                        toast.error('An unexpected error occurred');
                        updateButtonLoadingAnimation(false);
                }
            }          
    } 

    //manual sign in logic
    interface SigninFormFieldDataSchema {
        email: string,
        password: string, 
    }
    const [signinFormFieldData, updateSigninFormFieldData] = useState<SigninFormFieldDataSchema>({
        email: '',
        password: '', 
    });

    const submitSigninData = async () =>{
        if(userToken){
            navigate('/user/dashboard'); 
        }else{
            try {
                updateButtonLoadingAnimation(true)
                if(signinFormFieldData.email === '' || signinFormFieldData.password === ''){
                    toast.error('Complete all fields')
                    updateButtonLoadingAnimation(false)
                }
    
                else{
                    const signupApiCall = await axios.post(`${baseURL}/api/signin`, {...signinFormFieldData})
                    const signInResponseData = signupApiCall.data;
                    const signInResponseStatus: boolean =  signInResponseData.status;
    
                    if(signInResponseStatus === false){
                        toast.error(signInResponseData.message)
                    }
                    else{
                        sessionStorage.setItem('userToken', JSON.stringify(signInResponseData.token))
                        updateSigninFormFieldData({
                            email: '',
                            password: '', 
                        })
                        toast.success('Sign in successful')
    
                        setTimeout(()=>{
                            navigate('/user/dashboard');  
                        }, 2500) 
                    }
                    updateButtonLoadingAnimation(false)
                }     
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    if (error.response && error.response.data && error.response.data.message) {
                          toast.error(`Error: ${error.response.data.message}`);
                    } else {
                          toast.error('Something went wrong');
                    }
                    updateButtonLoadingAnimation(false);
              } else {
                    console.error('Unexpected error:', error);
                    toast.error('An unexpected error occurred');
                    updateButtonLoadingAnimation(false);
              }
            }
        }
       

    }


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
                                                                                        value={signinFormFieldData.email}
                                                                                        onChange={(e)=>{ updateSigninFormFieldData({...signinFormFieldData, email: e.target.value })}}
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
                                                                                            value={signinFormFieldData.password}
                                                                                            onChange={(e)=>{ updateSigninFormFieldData({...signinFormFieldData, password: e.target.value })}}
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
                                                                

                                                                <button onClick={()=>submitSigninData()} 
                                                                    disabled = {buttonLoadingAnimation ? true : false} 
                                                                    className='bg-purpleSubColor px-2 flex justify-center items-center text-white border-purpleSubColor border-[1px] rounded-[5px] w-full h-[45px] transition-properties hover:bg-[#181762]'>
                                                                        {buttonLoadingAnimation ? 
                                                                            <img src = {whiteBtnLoader} className='w-[30px] h-[30px]' alt='loader'/>    
                                                                        :
                                                                            <>
                                                                                <p>Sign in</p>
                                                                            </>
                                                                        }
                                                                </button>
                                                                    
                                                                <div className='py-[0.40rem] w-[80%] flex justify-center items-center'>
                                                                        <div className='bg-[#e1e1e1] h-[1px] w-full'></div>
                                                                </div>

                                                                <button onClick={()=> !userToken ? googleAuthSignin() : navigate('/user/dashboard')} className='shadow-md bg-white border-[#e1e1e1] border-[1px] rounded-[5px] w-full min-h-[42px] flex items-center justify-center space-x-2 hover:bg-[#f1f1f1]'>
                                                                    <img src={googleicon} alt='google-icon' className='w-[20px] h-[20px]'/>
                                                                    <p className='text-black font-bold text-[14px]'> Sign in with Google</p>
                                                                </button>

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