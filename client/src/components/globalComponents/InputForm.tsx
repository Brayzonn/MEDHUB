import  {InputFormProps, AddDoctorFormInterface, PatientProps} from '../DataTypes'

interface DoctorInputFormInterface{
        InputFormData: InputFormProps[],
        prevValues: AddDoctorFormInterface,
        onChangeFunc?: React.Dispatch<React.SetStateAction<AddDoctorFormInterface>>
}

const DoctorInputForm: React.FC<DoctorInputFormInterface> = ({prevValues, InputFormData, onChangeFunc}) => {
        return (
        <>
                {InputFormData.map((data: InputFormProps, index: number) => (
                        <div key={index} className='flex flex-col justify-end space-y-1'>
                                <label className='text-[14px] text-[#636363]'>{data.labelName} <span>{data.labelSpan}</span></label>
                                <input type={data.inputType} name={data.inputName}
                                        // value={formValue}
                                        onChange={(e) =>  onChangeFunc?.({...prevValues, [data.inputName]: e.target.value})}
                                        placeholder={data.placeholder}
                                        className='shadow-inner p-2 border-[#e1e1e1] border-[1px] rounded-[5px] w-[200px] min-h-[42px] text-black bg-white flex items-center justify-between' 
                                />
                        </div>
                ))}
        </>
        )
}

interface PatientInputFormInterface{
        InputFormData: InputFormProps[],
        prevValues: PatientProps,
        formValue?: PatientProps,
        onChangeFunc?: React.Dispatch<React.SetStateAction<PatientProps>>
}

const PatientInputForm: React.FC<PatientInputFormInterface> = ({prevValues, formValue, InputFormData, onChangeFunc}) => {
        return (
        <>
                {InputFormData.map((data: InputFormProps, index: number) => (
                        <div key={index} className='flex flex-col justify-end space-y-1'>
                                <label className='text-[14px] text-[#636363]'>{data.labelName} <span>{data.labelSpan}</span></label>
                                <input type={data.inputType} name={data.inputName}
                                        value={formValue ? (formValue[data.inputName as keyof PatientProps] as string) : ''}
                                        onChange={(e) =>  onChangeFunc?.({...prevValues, [data.inputName]: e.target.value})}
                                        placeholder={data.placeholder}
                                        className='shadow-inner p-2 border-[#e1e1e1] border-[1px] rounded-[5px] w-[200px] min-h-[42px] text-black bg-white flex items-center justify-between' 
                                />
                        </div>
                ))}
        </>
        )
}

export {DoctorInputForm, PatientInputForm}