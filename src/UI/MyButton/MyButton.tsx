import React from "react";
import s from './MyButton.module.scss'

interface IMyButton {
   onClick?: () => void,
   disabled?: boolean,
   type?: 'submit'
}

const MyButton: React.FC<IMyButton> = ({ children, onClick, disabled, type }) => {
   return (
      <button
         className={s.button}
         onClick={onClick}
         disabled={disabled}
         type={type || 'button'}
      >
         <span>{children}</span>
      </button>
   )
}

export default MyButton
