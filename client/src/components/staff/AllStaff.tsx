import { useState } from "react";
import { TableColumn } from 'react-data-table-component';

import AddStaff from "./AddStaff";
import Table from "./Table";
import StaffProfile from "./StaffProfile";


import { CiSearch } from "react-icons/ci";
import { FaChevronRight } from "react-icons/fa";

const AllStaff = () => {
    const [allNurseState, updateAllNurseState] = useState<boolean>(true)
    const [addNurseState, updateAddNurseState] = useState<boolean>(false)
  
    const [searchResults, setSearchResults] = useState<TableDataProps []>([])
    const [isInputActive, setInputIsActive] = useState<boolean>(false)
  
    
  
    //filter nurse data based off search parameters
    const searchInputValue = (searchValue: string) => {
          const filtered : TableDataProps[]= data.filter((row) =>
              row.profile.staffName.toLowerCase().includes(searchValue.toLowerCase())
          );
          setSearchResults(filtered);
    }
  
    const [isStaffProfileVisible, updateStaffProfileVisibility] = useState<boolean>(false);
    const [staffEditState, updateStaffEditState] = useState<boolean>(false);

  
  
    const [staffData] = useState([
          { header: 'ss', data: 'sggs'}
    ])
  
    const fetchStaff = (staffID:string) =>{
  
    }
  
  
    //data for table
    interface TableDataProps {
        profile: { staffName: string; staffImage: string };
        staffAge: string,
        staffDateOfBirth: string,
        staffTimeRole: string,
        staffJoinDate: string,
        staffID: string,
        staffEmail: string,
        staffPhone: string,
        staffAddress: string,
    }
  
    const columns: TableColumn<TableDataProps>[] = [
            {
                  name: 'Staff',
                  selector: (row) => row.profile.staffName,
            },
            {
                  name: 'Time Role',
                  selector: (row) => row.staffTimeRole ,
            },
  
            {
                  name: 'Age',
                  selector: (row) => row.staffAge,
            },
  
            {
                  name: 'Phone',
                  selector: (row) => row.staffPhone,
            },
  
            {
                  name: 'Join Date',
                  selector: (row) => row.staffJoinDate,
            },
  
            {
                  name: 'Action',
                  cell: (row) =>(
                        <button onClick={()=> {updateStaffProfileVisibility(true); fetchStaff(row.profile.staffName); window.scrollTo(0, 400); }} className="w-[30px] h-[30px] flex justify-center items-center relative border bg-gradient-to-r from-slate-500 to-slate-800 border-white rounded-full">
                              <FaChevronRight className = 'text-white' />  
                        </button>
                  )
            }
    ];
  
  
    const data = [
            {
                profile: { staffName: '', staffImage: '' },
                staffAge: '',
                staffDateOfBirth: '',
                staffTimeRole: '',
                staffJoinDate: '',
                staffID: '',
                staffEmail: '',
                staffPhone: '',
                staffAddress: '',
            },
    ];
  
  
  
    return (
              <div className='overflow-hidden relative w-[75%] shadow-sm mt-[100px] mb-4 py-4 px-[2rem] mx-6 flex flex-col space-y-6 text-[#161616]  bg-gradient-to-r from-slate-50 to-slate-100 border border-white rounded-[15px] lx:w-[82%]'>
                      <h5 className='font-bold tracking-wide text-[14px]'>Nurses</h5>
  
                      <div className='w-full min-h-[3rem] flex items-center space-x-[4rem] border-b border-b-[#f1f1f1]'>
                            <button
                                  onClick={()=> {
                                          updateAddNurseState(false);
                                          updateAllNurseState(true)
                                  }}
                                  className={`h-full text-capitalize font-[500] text-[14px] transition-properties  ${allNurseState && 'border-b-[#1e293b] border-b-[2.5px]'} `}
                            >
                                All Staff
                            </button>
  
                            <button
                                  onClick={()=> {
                                          updateAddNurseState(true);
                                          updateAllNurseState(false)
                                  }}
                                  className={`h-full text-capitalize font-[500] text-[14px] transition-properties ${addNurseState && 'border-b-[#1e293b] border-b-[2.5px]'} `}
                            >
                                Add Staff
                            </button>
                      </div>
  
                      {allNurseState ? 
                              <>  
                                  <div className='relative w-full flex justify-between items-center'>
                                          <p className='text-[14px] font-bold'>All Staff</p>
  
                                          <div className="relative w-[300px] h-[45px]">
                                              <CiSearch className="absolute left-2 top-1/2 transform -translate-y-1/2" />
                                              <input 
                                                  type='text'
                                                  name='searchdoctors'
                                                  onBlur={()=> setInputIsActive(false) }
                                                  onChange={(e)=> {searchInputValue(e.target.value); setInputIsActive(true)}}
                                                  placeholder='Search'
                                                  className='pl-8 bg-[#f3f3f8] px-2 border-white border-[1px] rounded-[5px] w-[300px] h-[45px] text-black text-[16px] focus:border-greyMainBackground focus:bg-greyMainBackground focus:outline-none'
                                              />
                                          </div>
                                  </div>
  
                                  <div className="min-h-[10rem] w-full flex flex-col justify-center items-center space-y-[2rem]">
                                          {!isInputActive ?
                                              <Table columns={columns} data={data} />
                                              :
                                              <Table columns={columns} data={searchResults} />
                                          }
                                          {< StaffProfile staffEditState={staffEditState} updateStaffEditState = {updateStaffEditState} staffData={staffData} isStaffProfileVisible={isStaffProfileVisible} updateStaffProfileVisibility={updateStaffProfileVisibility}/> }
                                  </div>
                              </> 
                              : 
                                  <AddStaff />
                      }
                     
                    
              </div>
    )
}

export default AllStaff