import React, { useState, useEffect } from 'react';
import redTick from '../../images/redtick.png';
import greenTick from '../../images/greentick.png';

interface MessageType {
  messages: string[];
  type: string;
}

const Notification: React.FC<MessageType> = ({ messages, type }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
        const timeoutId = setTimeout(() => {
        setVisible(false);
        }, 6000);

        return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className={`z-50 transitionPropertyNotif fixed top-4 max-w-[300px] ${visible ? 'right-4' : 'right-[-50vw]'}`}>
            {messages.map((message, index) => (
                    <div
                            key={index}
                            className={`p-2 mb-2 border-l-[8px] ${type !== 'success' ? 'border-l-[#FE585E]' : 'border-l-[#0CA16E]'} 
                            flex justify-between items-center shadow-sm border border-[#f1f1f1] rounded-[10px] bg-white w-[300px] min-h-[50px]`}
                    >
                            <div className="w-[100%] h-full flex items-center space-x-3">
                                    <img src={type !== 'success' ? redTick : greenTick} alt="checkmark" className="w-[15px] h-[15px]" />
                                    <div className="flex flex-col justify-center">
                                            <h3 className="text-[15px] font-[550] ">{type !== 'success' ? 'Error' : 'Success'}</h3>
                                            <p className="text-[14px] text-[#797979]">{message}</p>
                                    </div>
                            </div>

                            {/* <button
                                onClick={() => setVisible(false)}
                                className="border-l border-l-[#ececec] w-[20%] h-full flex justify-center items-center text-[13px] font-[400] text-[#b4b3b3]"
                            >
                                CLOSE
                            </button> */}
                    </div>
            ))}
    </div>
  );
};

export default Notification;
