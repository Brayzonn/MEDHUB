import Calendar from 'react-calendar';
import { useState } from 'react';
import 'react-calendar/dist/Calendar.css';


type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const Calender = () => {
    const [value, onChange] = useState<Value>(new Date());
 
    return (
        <div>
            <Calendar onChange={onChange} value={value} />
        </div>
    )
}

export default Calender