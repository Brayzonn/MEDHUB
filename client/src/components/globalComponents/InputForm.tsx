
interface ObjectProps{
        labelName:  string,
        labelSpan?: string,
        inputValue?: string,
        inputName:  string,
        inputType:  string,
        placeholder?: string,

}
interface InputFormProps{
        InputFormData: ObjectProps[]
}

const InputForm: React.FC<InputFormProps> = ({InputFormData}) => {
  return (
    <>
        {InputFormData.map((data: ObjectProps, index: number) => (
                <div key={index} className='flex flex-col justify-end space-y-1'>
                        <label className='text-[14px] text-[#636363]'>{data.labelName} <span>{data.labelSpan}</span></label>
                        <input type={data.inputType} name={data.inputName}
                                // value={addDoctorForm.doctorName}
                                placeholder={data.placeholder}
                                className='shadow-inner p-2 border-[#e1e1e1] border-[1px] rounded-[5px] w-[200px] min-h-[42px] text-black bg-white flex items-center justify-between' 
                        />
                </div>
        ))}
    </>
  )
}

export default InputForm