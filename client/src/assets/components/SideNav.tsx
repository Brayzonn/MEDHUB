import React, { useState, useEffect } from 'react';
import { NavLink, useLocation} from 'react-router-dom';
import navLogo from '../../images/dashDoctorImageForNav.png';

interface NavLinks {
  to: string;
  icon: string;
  text: string;
}

interface SideNavProps {
  navLinks: NavLinks[];
  setIsHovered: React.Dispatch<React.SetStateAction<boolean>>;
  widthClass: string;
}

const SideNav: React.FC<SideNavProps> = ({ navLinks, setIsHovered, widthClass }) => {
    
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [activeLink, setActiveLink] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname;
    setActiveLink(currentPath);
  }, [location]);

  return (
    <div className={`relative h-full ${widthClass} pt-[5rem] px-[1rem] flex flex-col justify-start items-start space-y-[3rem] bg-white border-r border-r-[#F4F7FC] lx:w-[18%]`}>
                {navLinks.map((link, index) => (
                    <NavLink
                        key={index}
                        to={link.to}
                        className={`w-full flex space-x-3 items-center justify-start p-2 border border-white rounded-md transition-properties hover:bg-blueSubBackgroundColor hover:text-white 
                          ${hoveredLink === link.to ? 'bg-[#1c1b8d]' : ''}
                          ${activeLink === link.to ? 'bg-purpleSubColor text-white' : ''}`}
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
                                      filter: `${
                                        (hoveredLink === link.to) || (activeLink === link.to)
                                          ? 'brightness(0) invert(1)'
                                          : 'brightness(1) invert(0)'
                                      }`,
                                  }}
                              />
                              <p className="transition-properties text-[15px]">{link.text}</p>
                    </NavLink>
                ))}


                <img src={navLogo} alt='navlogo' className='bottom-[5rem] absolute w-[170px] h-[170px]'/>
    </div>
  );
};

export default SideNav;
