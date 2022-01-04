import React, { useContext, useState } from "react";
import { Calendar, Modal } from 'antd';
import { observer } from "mobx-react-lite";
import { IEvent } from "../../../models/IEvent";
import s from './EventsCalendar.module.scss'
import { Moment } from "moment";
import { formatDate } from "../../../utils/formateDate";
import { Context } from "../../..";
import CalendarCeil from "../CalendarCeil/CalendarCeil";


const EventsCalendar: React.FC = ({ }) => {
   const [visible, setVisible] = useState<boolean>(false)
   const [active, setActive] = useState<IEvent | null>(null)

   const { store } = useContext(Context);

   const dateCellRender = (ceilDate: Moment) => {
      const formated = formatDate(ceilDate);

      return (
         <div className={s.ceil}>
            {store.eventsStore?.events?.map((item) => {
               if (formated === item.date) {
                  return (
                     <CalendarCeil
                        setActive={setActiveItem}
                        openModal={openModal}
                        key={item.date}
                        item={item}
                     />
                  )
               }
            })}
         </div>
      )
   }

   const handleOk = async () => {
      if (!active) return;

      await store.eventsStore.fetchDelete(active?.id)

      setActive(null)
      setVisible(false)
   }

   const openModal = () => {
      setVisible(true)
   }

   const handleCancel = () => {
      setActive(null)
      setVisible(false)
   }

   const setActiveItem = (item: IEvent) => {
      setActive(item)
   }

   return (
      <>
         <Modal
            title="Title"
            visible={visible}
            onOk={handleOk}
            confirmLoading={store.eventsStore.isDeleting}
            onCancel={handleCancel}
         >
            {active
               && <div className={s.body}>
                  Отменить событие <span>{active.date}</span>?
               </div>}
         </Modal>
         {!store.eventsStore.isCreating
            ? <Calendar dateCellRender={dateCellRender} />
            : null}
      </>
   )
}

export default observer(EventsCalendar)
