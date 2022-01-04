import { Button, Modal } from "antd";
import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../..";
import { IEvent } from "../../../models/IEvent";
import s from './CalendarCeil.module.scss';

interface ICalendarCeil {
   item: IEvent,
   openModal: () => void,
   setActive: (item: IEvent) => void
}

const CalendarCeil: React.FC<ICalendarCeil> = ({ item, openModal, setActive }) => {
   const [isOwner, setIsOwner] = useState<boolean>(false)
   const { store } = useContext(Context);

   useEffect(() => {
      if (item && store.authStore.user) {
         setIsOwner(item.creator === store.authStore.user.id)
      }
   }, [item, store.authStore.user])

   const handleClick = () => {
      setActive(item);
      openModal()
   }

   return (
      <>
         <div className={s.ceil}>
            <div className={s.descr} >
               {item.description}
            </div>
            {isOwner
               && <Button
                  onClick={handleClick}
                  type="primary" size="middle"
               >
                  Отменить
               </Button>}
         </div>
      </>
   )
}

export default observer(CalendarCeil)
