import React from "react";
import s from './MyInput.module.scss';

interface IMyInput {
   value: string,
   name: string,
   title: string,
   type: string,
   onChange: (e: React.ChangeEvent<any>) => void
}

const MyInput: React.FC<IMyInput> = ({ type, value, onChange, title, name }) => {
   return (
      <div className={s.myinput}>
         <div className={s.title}>
            <span>{title}</span>
         </div>
         <input
            value={value}
            onChange={onChange}
            type={type}
            name={name}
         />
      </div>
   )
}

export default MyInput
