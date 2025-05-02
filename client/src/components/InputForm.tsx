import  {PatientInputFormInterface, DoctorInputFormInterface, InputFormProps, AddDoctorFormInterface} from '../types/DataTypes'

const DoctorInputForm: React.FC<DoctorInputFormInterface> = ({prevValues, formValue, InputFormData, onChangeFunc}) => {
        return (
        <>
                {InputFormData.map((data: InputFormProps, index: number) => (
                        <div key={index} className='flex flex-col justify-end space-y-1'>
                                <label className='text-[14px] text-[#636363]'>{data.labelName} <span>{data.labelSpan}</span></label>
                                <input type={data.inputType} name={data.inputName}
                                        value={formValue ? (formValue[data.inputName as keyof AddDoctorFormInterface] as string) : ''}
                                        onChange={(e) =>  onChangeFunc?.({...prevValues, [data.inputName]: e.target.value})}
                                        placeholder={data.placeholder}
                                        className='shadow-inner p-2 border-[#e1e1e1] border-[1px] rounded-[5px] w-[200px] min-h-[42px] text-black bg-white flex items-center justify-between' 
                                />
                        </div>
                ))}
        </>
        )
}



const PatientInputForm = <T,>({ prevValues, formValue, InputFormData, onChangeFunc }: PatientInputFormInterface<T>) => {
        return (
            <>
                {InputFormData.map((data: InputFormProps, index: number) => (
                    <div key={index} className="flex flex-col justify-end space-y-1">
                        <label className="text-[14px] text-[#636363]">
                            {data.labelName} <span>{data.labelSpan}</span>
                        </label>
    
                        {data.isTextArea ? (
                            <textarea
                                name={data.inputName}
                                value={formValue ? (formValue[data.inputName as keyof T] as string) : ''}
                                onChange={(e) => onChangeFunc?.({ ...prevValues, [data.inputName]: e.target.value })}
                                placeholder={data.placeholder}
                                className={data.customClassName || 'shadow-inner p-2 border border-[#e1e1e1] rounded-[5px] w-[200px] min-h-[80px] text-black bg-white'}
                            />
                        ) : (
                            <input
                                type={data.inputType}
                                name={data.inputName}
                                value={formValue ? (formValue[data.inputName as keyof T] as string) : ''}
                                onChange={(e) => onChangeFunc?.({ ...prevValues, [data.inputName]: e.target.value })}
                                placeholder={data.placeholder}
                                className={data.customClassName || 'shadow-inner p-2 border border-[#e1e1e1] rounded-[5px] w-[200px] min-h-[42px] text-black bg-white'}
                            />
                        )}
                    </div>
                ))}
            </>
        );
    };





export {DoctorInputForm, PatientInputForm}