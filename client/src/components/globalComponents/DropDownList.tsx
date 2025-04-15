import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useState } from "react";

import {AddDoctorFormInterface, AddPatientFormInterface, NurseFormProps, StaffFormProps} from '../DataTypes'

    //doctor dropdown
    interface dropdownContainer {
        buttonName: string,
        buttonId: string,
        listOptions: string[]
    }

    interface DoctordropDownProps {
        allDropDownContainer: dropdownContainer[],
        doctorInitialValues?: AddDoctorFormInterface,
        setSubmitFormDropdown: React.Dispatch<React.SetStateAction<AddDoctorFormInterface>>,
    }

    const DoctorDropDownList: React.FC<DoctordropDownProps> = ({setSubmitFormDropdown, doctorInitialValues, allDropDownContainer }) => {

        const [doctorDropDownStates, updateDoctorDropDownStates] = useState<number[]>(Array(allDropDownContainer.length).fill(-1));
        const [test, uptest] = useState<{ [key: string]: string }>({});

        return (
            <>
            {allDropDownContainer.map((dropdown: dropdownContainer, index: number) => (
                <div className="relative flex items-end space-y-1" key={index}>
                        <button
                                onClick={() => {
                                    const newStates = [...doctorDropDownStates];
                                    newStates[index] = newStates[index] === -1 ? index : -1;
                                    updateDoctorDropDownStates(newStates);
                                }}
                                className="shadow-inner p-2 border-[#e1e1e1] border-[1px] rounded-[5px] w-[200px] min-h-[42px] text-black bg-white flex items-center justify-between"
                        >
                                <p className="text-[#636363]">
                                    {doctorDropDownStates[index] !== -1 ? 
                                        (test[dropdown.buttonName] === undefined ? dropdown.buttonName : test[dropdown.buttonName]) 
                                    :
                                        doctorInitialValues?.[dropdown.buttonId as keyof AddDoctorFormInterface] as string || dropdown.buttonName     
                                    }
                                </p>
                                {doctorDropDownStates[index] !== -1 ? <FaChevronUp className="text-[#636363]" /> : < FaChevronDown className="text-[#636363]" />}
                        </button>

                        {doctorDropDownStates[index] !== -1 && (
                                <ul className="absolute z-50 left-0 p-2 overflow-y-auto flex flex-col space-y-1 top-[100%] text-[14px] w-[200px] max-h-[550px] bg-black border border-black border-r-[#fff] rounded-[5px] text-white">
                                        {dropdown.listOptions.map((objectData: string, optionIndex: number, array: string[]) => (
                                            <li
                                                key={optionIndex}
                                                onClick={() => {
                                                    const newTest = { ...test };
                                                    newTest[dropdown.buttonName] = objectData;
                                                    uptest(newTest);
                                                    setSubmitFormDropdown((prevForm: AddDoctorFormInterface) => ({ ...prevForm, [dropdown.buttonId]: objectData }));
                                                    const newStates = [...doctorDropDownStates];
                                                    newStates[index] = -1;
                                                    updateDoctorDropDownStates(newStates);
                                                }}
                                                className={`${optionIndex !== array.length - 1 && 'border-b border-b-[#3e3e3e]'} py-1 cursor-pointer`}
                                            >
                                                {objectData}
                                            </li>
                                        ))}
                                </ul>
                        )}
                </div>
            ))}
            </>
        );
    };




    // add patient drop down
    interface dropDownPropsPatient {
            allPatientDropDownContainer: dropdownContainer[],
            patientInitialValues?: AddPatientFormInterface,
            setPatientSubmitFormDropdown: React.Dispatch<React.SetStateAction<AddPatientFormInterface>>,
    }

    const PatientDropDownList: React.FC<dropDownPropsPatient> = ({patientInitialValues, setPatientSubmitFormDropdown, allPatientDropDownContainer }) => {

        const [patientDropDownStates, updatePatientDropDownStates] = useState<number[]>(Array(allPatientDropDownContainer.length).fill(-1));
        const [test, uptest] = useState<{ [key: string]: string }>({});

        return (
            <>
            {allPatientDropDownContainer.map((dropdownFeature: dropdownContainer, index: number) => (
                <div className="relative flex items-end space-y-1" key={index}>
                        <button
                                onClick={() => {
                                    const newStates = [...patientDropDownStates];
                                    newStates[index] = newStates[index] === -1 ? index : -1;
                                    updatePatientDropDownStates(newStates);
                                }}
                                className="shadow-inner p-2 border-[#e1e1e1] border-[1px] rounded-[5px] w-[200px] min-h-[42px] text-black bg-white flex items-center justify-between"
                        >
                                <p className="text-[#636363]">
                                    {patientDropDownStates[index] !== -1 ? 
                                        (test[dropdownFeature.buttonId] === undefined ? dropdownFeature.buttonName : test[dropdownFeature.buttonName]) 
                                    : 
                                        patientInitialValues?.[dropdownFeature.buttonId as keyof AddPatientFormInterface] as string || dropdownFeature.buttonName}
                                </p>
                                {patientDropDownStates[index] !== -1 ? <FaChevronUp className="text-[#636363]" /> : < FaChevronDown className="text-[#636363]" />}
                        </button>

                        {patientDropDownStates[index] !== -1 && (
                                <ul className="absolute z-50 left-0 p-2 overflow-y-auto flex flex-col space-y-1 top-[100%] text-[14px] w-[200px] max-h-[550px] bg-black border border-black border-r-[#fff] rounded-[5px] text-white">
                                        {dropdownFeature.listOptions.map((objectData: string, optionIndex: number, array: string[]) => (
                                            <li
                                                key={optionIndex}
                                                onClick={() => {
                                                        const newTest = { ...test };
                                                        newTest[dropdownFeature.buttonId] = objectData;
                                                        uptest(newTest);
                                                        setPatientSubmitFormDropdown((prevForm: AddPatientFormInterface) => ({ ...prevForm, [dropdownFeature.buttonId]: objectData }));
                                                        const newStates = [...patientDropDownStates];
                                                        newStates[index] = -1;
                                                        updatePatientDropDownStates(newStates);
                                                }}
                                                className={`${optionIndex !== array.length - 1 && 'border-b border-b-[#3e3e3e]'} py-1 cursor-pointer`}
                                            >
                                                {objectData}
                                            </li>
                                        ))}
                                </ul>
                        )}
                </div>
            ))}
            </>
        );
    };





    // add nurse drop down
    interface dropDownPropsNurse {
            allNurseDropDownContainer: dropdownContainer[],
            setNurseSubmitFormDropdown: React.Dispatch<React.SetStateAction<NurseFormProps>>,
    }


    const DropDownListNurse: React.FC<dropDownPropsNurse> = ({ setNurseSubmitFormDropdown, allNurseDropDownContainer }) => {

        const [nurseDropDownStates, updateNurseDropDownStates] = useState<number[]>(Array(allNurseDropDownContainer.length).fill(-1));
        const [test, uptest] = useState<{ [key: string]: string }>({});

        return (
            <>
            {allNurseDropDownContainer.map((dropdownFeature: dropdownContainer, index: number) => (
                <div className="relative flex items-end space-y-1" key={index}>
                        <button
                                onClick={() => {
                                    const newStates = [...nurseDropDownStates];
                                    newStates[index] = newStates[index] === -1 ? index : -1;
                                    updateNurseDropDownStates(newStates);
                                }}
                                className="shadow-inner p-2 border-[#e1e1e1] border-[1px] rounded-[5px] w-[200px] min-h-[42px] text-black bg-white flex items-center justify-between"
                        >
                                <p className="text-[#636363]">
                                    {nurseDropDownStates[index] !== -1 ? (test[dropdownFeature.buttonName] === undefined ? dropdownFeature.buttonName : test[dropdownFeature.buttonName]) : test[dropdownFeature.buttonName]}
                                </p>
                                {nurseDropDownStates[index] !== -1 ? <FaChevronUp className="text-[#636363]" /> : < FaChevronDown className="text-[#636363]" />}
                        </button>

                        {nurseDropDownStates[index] !== -1 && (
                                <ul className="absolute z-50 left-0 p-2 overflow-y-auto flex flex-col space-y-1 top-[100%] text-[14px] w-[200px] max-h-[550px] bg-black border border-black border-r-[#fff] rounded-[5px] text-white">
                                        {dropdownFeature.listOptions.map((objectData: string, optionIndex: number, array: string[]) => (
                                            <li
                                                key={optionIndex}
                                                onClick={() => {
                                                    const newTest = { ...test };
                                                    newTest[dropdownFeature.buttonName] = objectData;
                                                    uptest(newTest);
                                                    setNurseSubmitFormDropdown((prevForm: NurseFormProps) => ({ ...prevForm, [dropdownFeature.buttonId]: objectData }));
                                                    const newStates = [...nurseDropDownStates];
                                                    newStates[index] = -1;
                                                    updateNurseDropDownStates(newStates);
                                                }}
                                                className={`${optionIndex !== array.length - 1 && 'border-b border-b-[#3e3e3e]'} py-1 cursor-pointer`}
                                            >
                                                {objectData}
                                            </li>
                                        ))}
                                </ul>
                        )}
                </div>
            ))}
            </>
        );
    };




    // add staff drop down
    interface dropDownPropsStaff {
            allStaffDropDownContainer: dropdownContainer[],
            setStaffSubmitFormDropdown: React.Dispatch<React.SetStateAction<StaffFormProps>>,
    }


    const DropDownListStaff: React.FC<dropDownPropsStaff> = ({ setStaffSubmitFormDropdown, allStaffDropDownContainer }) => {

        const [staffDropDownStates, updateStaffDropDownStates] = useState<number[]>(Array(allStaffDropDownContainer.length).fill(-1));
        const [test, uptest] = useState<{ [key: string]: string }>({});

        return (
            <>
            {allStaffDropDownContainer.map((dropdownFeature: dropdownContainer, index: number) => (
                <div className="relative flex items-end space-y-1" key={index}>
                        <button
                                onClick={() => {
                                    const newStates = [...staffDropDownStates];
                                    newStates[index] = newStates[index] === -1 ? index : -1;
                                    updateStaffDropDownStates(newStates);
                                }}
                                className="shadow-inner p-2 border-[#e1e1e1] border-[1px] rounded-[5px] w-[200px] min-h-[42px] text-black bg-white flex items-center justify-between"
                        >
                                <p className="text-[#636363]">
                                    {staffDropDownStates[index] !== -1 ? (test[dropdownFeature.buttonName] === undefined ? dropdownFeature.buttonName : test[dropdownFeature.buttonName]) : test[dropdownFeature.buttonName]}
                                </p>
                                {staffDropDownStates[index] !== -1 ? <FaChevronUp className="text-[#636363]" /> : < FaChevronDown className="text-[#636363]" />}
                        </button>

                        {staffDropDownStates[index] !== -1 && (
                                <ul className="absolute z-50 left-0 p-2 overflow-y-auto flex flex-col space-y-1 top-[100%] text-[14px] w-[200px] max-h-[550px] bg-black border border-black border-r-[#fff] rounded-[5px] text-white">
                                        {dropdownFeature.listOptions.map((objectData: string, optionIndex: number, array: string[]) => (
                                            <li
                                                key={optionIndex}
                                                onClick={() => {
                                                    const newTest = { ...test };
                                                    newTest[dropdownFeature.buttonName] = objectData;
                                                    uptest(newTest);
                                                    setStaffSubmitFormDropdown((prevForm: StaffFormProps) => ({ ...prevForm, [dropdownFeature.buttonId]: objectData }));
                                                    const newStates = [...staffDropDownStates];
                                                    newStates[index] = -1;
                                                    updateStaffDropDownStates(newStates);
                                                }}
                                                className={`${optionIndex !== array.length - 1 && 'border-b border-b-[#3e3e3e]'} py-1 cursor-pointer`}
                                            >
                                                {objectData}
                                            </li>
                                        ))}
                                </ul>
                        )}
                </div>
            ))}
            </>
        );
    };

export {PatientDropDownList, DoctorDropDownList, DropDownListNurse, DropDownListStaff} 
