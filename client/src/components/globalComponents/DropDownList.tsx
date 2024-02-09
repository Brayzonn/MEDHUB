import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useState } from "react";

    //add doctor dropdown
    interface addDoctor {
        doctorSpecialty: string,
        doctorAddress: string,
        doctorPhone: string,
        doctorName: string,
        doctorAge: string,
        doctorDegree: string,
        employmentType: string,
        doctorDept: string,
    }

    interface dropdownContainer {
        buttonName: string,
        buttonId: string,
        listOptions: string[]
    }

    interface dropDownProps {
        allDropDownContainer: dropdownContainer[],
        setSubmitFormDropdown: React.Dispatch<React.SetStateAction<addDoctor>>,
    }

    const DropDownList: React.FC<dropDownProps> = ({ setSubmitFormDropdown, allDropDownContainer }) => {

        const [doctorSpecialtyDropDownStates, updateDoctorSpecialtyDropDownStates] = useState<number[]>(Array(allDropDownContainer.length).fill(-1));
        const [test, uptest] = useState<{ [key: string]: string }>({});

        return (
            <>
            {allDropDownContainer.map((dropdownFeature: dropdownContainer, index: number) => (
                <div className="relative flex items-end space-y-1" key={index}>
                        <button
                                onClick={() => {
                                    const newStates = [...doctorSpecialtyDropDownStates];
                                    newStates[index] = newStates[index] === -1 ? index : -1;
                                    updateDoctorSpecialtyDropDownStates(newStates);
                                }}
                                className="shadow-inner p-2 border-[#e1e1e1] border-[1px] rounded-[5px] w-[200px] min-h-[42px] text-black bg-white flex items-center justify-between"
                        >
                                <p className="text-[#636363]">
                                    {doctorSpecialtyDropDownStates[index] !== -1 ? (test[dropdownFeature.buttonName] === undefined ? dropdownFeature.buttonName : test[dropdownFeature.buttonName]) : (test[dropdownFeature.buttonName] === undefined ? dropdownFeature.buttonName : test[dropdownFeature.buttonName])}
                                </p>
                                {doctorSpecialtyDropDownStates[index] !== -1 ? <FaChevronUp className="text-[#636363]" /> : < FaChevronDown className="text-[#636363]" />}
                        </button>

                        {doctorSpecialtyDropDownStates[index] !== -1 && (
                                <ul className="absolute z-50 left-0 p-2 overflow-y-auto flex flex-col space-y-1 top-[100%] text-[14px] w-[200px] max-h-[550px] bg-black border border-black border-r-[#fff] rounded-[5px] text-white">
                                        {dropdownFeature.listOptions.map((objectData: string, optionIndex: number, array: string[]) => (
                                            <li
                                                key={optionIndex}
                                                onClick={() => {
                                                    const newTest = { ...test };
                                                    newTest[dropdownFeature.buttonName] = objectData;
                                                    uptest(newTest);
                                                    setSubmitFormDropdown((prevForm: addDoctor) => ({ ...prevForm, [dropdownFeature.buttonId]: objectData }));
                                                    const newStates = [...doctorSpecialtyDropDownStates];
                                                    newStates[index] = -1;
                                                    updateDoctorSpecialtyDropDownStates(newStates);
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
    interface PatientData {
            profile: { patientname: string; patientImage: string };
            patientID: string;
            patientNotes: string[] ;
            patientAge: string;
            patientBloodType: string;
            patientHeight: string;
            patientGenotype: string;
            patientWeight: string;
            patientConditions: string[]; 
            patientJoindate: string;
            patientBirthDate: string;
            patientPhoneNumber: string;
            patientEmail: string;
            admissionStatus:boolean;
            patientEMO: string;
    }

    interface dropdownContainerPatient {
            buttonName: string,
            buttonId: string,
            listOptions: string[]
    }

    interface dropDownPropsPatient {
            allPatientDropDownContainer: dropdownContainerPatient[],
            setPatientSubmitFormDropdown: React.Dispatch<React.SetStateAction<PatientData>>,
    }


    const DropDownListPatient: React.FC<dropDownPropsPatient> = ({ setPatientSubmitFormDropdown, allPatientDropDownContainer }) => {

        const [patientDropDownStates, updatePatientDropDownStates] = useState<number[]>(Array(allPatientDropDownContainer.length).fill(-1));
        const [test, uptest] = useState<{ [key: string]: string }>({});

        return (
            <>
            {allPatientDropDownContainer.map((dropdownFeature: dropdownContainerPatient, index: number) => (
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
                                    {patientDropDownStates[index] !== -1 ? (test[dropdownFeature.buttonName] === undefined ? dropdownFeature.buttonName : test[dropdownFeature.buttonName]) : (test[dropdownFeature.buttonName] === undefined ? dropdownFeature.buttonName : test[dropdownFeature.buttonName])}
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
                                                    newTest[dropdownFeature.buttonName] = objectData;
                                                    uptest(newTest);
                                                    setPatientSubmitFormDropdown((prevForm: PatientData) => ({ ...prevForm, [dropdownFeature.buttonId]: objectData }));
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

export {DropDownListPatient, DropDownList} 
