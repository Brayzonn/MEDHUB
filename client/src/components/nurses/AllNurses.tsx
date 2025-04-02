import { useState } from "react";
import { TableColumn } from 'react-data-table-component';

import AddNurse from "./AddNurse";
import Table from "./Table";
import NurseProfile from "./NurseProfile";


import { CiSearch } from "react-icons/ci";
import { FaChevronRight } from "react-icons/fa";


const AllNurses = () => {
    const [allNurseState, updateAllNurseState] = useState<boolean>(true)
    const [addNurseState, updateAddNurseState] = useState<boolean>(false)
  
    const [searchResults, setSearchResults] = useState<TableDataProps []>([])
    const [isInputActive, setInputIsActive] = useState<boolean>(false)
  
    
  
    //filter nurse data based off search parameters
    const searchInputValue = (searchValue: string) => {
          const filtered : TableDataProps[]= data.filter((row) =>
              row.profile.nurseName.toLowerCase().includes(searchValue.toLowerCase())
          );
          setSearchResults(filtered);
    }
  
    const [isNurseProfileVisible, updateNurseProfileVisibility] = useState<boolean>(false);
    const [nurseEditState, updateNurseEditState] = useState<boolean>(false);

  
  
    const [nurseData] = useState([
          { header: 'ss', data: 'sggs'}
    ])
  
    const fetchNurse = (nurseID:string) =>{
      console.log(nurseID)
    }
  
  
    //data for table
    interface TableDataProps {
        profile: { nurseName: string; nurseImage: string };
        nurseAge: string,
        nurseDateOfBirth: string,
        nurseTimeRole: string,
        nurseDegree: string,
        nurseJoinDate: string,
        nurseID: string,
        nurseEmail: string,
        nursePhone: string,
    }
  
    const columns: TableColumn<TableDataProps>[] = [
            {
                  name: 'Nurse',
                  selector: (row) => row.profile.nurseName,
            },
            {
                  name: 'Time Role',
                  selector: (row) => row.nurseTimeRole ,
            },
  
            {
                  name: 'Age',
                  selector: (row) => row.nurseAge,
            },
  
            {
                  name: 'Degree',
                  selector: (row) => row.nurseDegree,
            },
  
            {
                  name: 'Join Date',
                  selector: (row) => row.nurseJoinDate,
            },
  
            {
                  name: 'Action',
                  cell: (row) =>(
                        <button onClick={()=> {updateNurseProfileVisibility(true); fetchNurse(row.profile.nurseName); window.scrollTo(0, 400); }} className="w-[30px] h-[30px] flex justify-center items-center relative border bg-gradient-to-r from-slate-500 to-slate-800 border-white rounded-full">
                              <FaChevronRight className = 'text-white' />  
                        </button>
                  )
            }
    ];
  
  
    const data = [
            {
                  profile: {nurseName: 'Esther Howard', nurseImage : ''},
                  nurseAge: '25',
                  nurseDateOfBirth: '15/02/1994',
                  nurseTimeRole: 'Night',
                  nurseDegree: 'MBBS, MS',
                  nurseJoinDate: '20-10-2024',
                  nurseID: '6373',
                  nurseEmail: '',
                  nursePhone: '',
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
                                All Nurses
                            </button>
  
                            <button
                                  onClick={()=> {
                                          updateAddNurseState(true);
                                          updateAllNurseState(false)
                                  }}
                                  className={`h-full text-capitalize font-[500] text-[14px] transition-properties ${addNurseState && 'border-b-[#1e293b] border-b-[2.5px]'} `}
                            >
                                Add Nurse
                            </button>
                      </div>
  
                      {allNurseState ? 
                              <>  
                                  <div className='relative w-full flex justify-between items-center'>
                                          <p className='text-[14px] font-bold'>All Nurses</p>
  
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
                                          {< NurseProfile nurseEditState={nurseEditState} updateNurseEditState = {updateNurseEditState} nurseData={nurseData} isNurseProfileVisible={isNurseProfileVisible} updateNurseProfileVisibility={updateNurseProfileVisibility}/> }
                                  </div>
                              </> 
                              : 
                                  <AddNurse />
                      }
                     
                    
              </div>
    )
}

export default AllNurses