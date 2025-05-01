import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation} from 'react-router-dom';

import { TbLogout2 } from "react-icons/tb";

import {SideNavProps} from '../components/DataTypes';


const SideNav: React.FC<SideNavProps> = ({ navLinks, setIsHovered, widthClass }) => {
  
  const navigate = useNavigate();
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [activeLink, setActiveLink] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
      const currentPath = location.pathname;
      setActiveLink(currentPath);
  }, [location]);

  return (
    <div className={`relative z-10 h-screen ${widthClass} pt-[150px] px-[1rem] flex flex-col justify-start items-start bg-white border-r border-r-[#F4F7FC] lx:w-[18%]`}>
          <div className={`relative w-full h-[80%] flex flex-col justify-start items-start space-y-[2rem] `}>
                {navLinks.map((link, index) =>
                        link.disabled ? (
                          <div
                                key={index}
                                className="w-full flex space-x-3 items-center justify-start p-2 border border-white rounded-md
                              text-gray-400 bg-gray-100 cursor-not-allowed opacity-60"
                          >
                                <img
                                  src={link.icon}
                                  className="w-[22px] h-[22px]"
                                  style={{ filter: 'brightness(0.6) grayscale(100%)' }}
                                  alt={`${link.text} Icon`}
                                />
                                <p className="text-[15px]">{link.text}</p>
                          </div>
                        ) : (
                          <NavLink
                                key={index}
                                to={link.to}
                                className={`w-full flex space-x-3 items-center justify-start p-2 border border-white rounded-md transition-properties hover:bg-blueSubBackgroundColor hover:text-white 
                                  ${hoveredLink === link.to ? 'bg-gradient-to-r from-slate-500 to-slate-800' : ''}
                                  ${activeLink === link.to ? ' bg-gradient-to-r from-slate-800 to-slate-900 text-white' : ''}`}
                                onMouseEnter={() => {
                                  setHoveredLink(link.to);
                                  setIsHovered(true);
                                }}
                                onMouseLeave={() => {
                                  setHoveredLink(null);
                                  setIsHovered(false);
                                }}
                          >
                                <img
                                  src={link.icon}
                                  className="w-[22px] h-[22px] transition-properties"
                                  alt={`${link.text} Icon`}
                                  style={{
                                    filter: `${(hoveredLink === link.to) || (activeLink === link.to)
                                      ? 'brightness(0) invert(1)'
                                      : 'brightness(1) invert(0)'}`,
                                  }}
                                />
                                <p className="transition-properties text-[15px]">{link.text}</p>
                          </NavLink>
                        )
                )}

          </div>

          <div className='relative w-full flex items-end pt-4 border-t border-t-[#e8e6e6]'>
                <button onClick={()=> {sessionStorage.clear(); navigate('/signin')}} className='w-[150px] min-h-[40px] flex justify-start items-center space-x-2 transition-properties hover:border hover:bg-gradient-to-r from-slate-500 to-slate-800 hover:rounded-md hover:justify-center hover:text-white '>
                      <TbLogout2 className = 'text-[20px] font-[650] text-[#776666]' />     
                      <p className='text-[15px] font-[500]'>Log out</p>
                </button>
          </div>
    </div>
  );
};

export default SideNav;