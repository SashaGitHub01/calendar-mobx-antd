import React, { useContext, useEffect, useState } from "react";
import s from './Events.module.scss';
import { Modal } from 'antd';
import MyButton from "../../UI/MyButton/MyButton";
import EventsCalendar from "../../components/Events/EventsCalendar/EventsCalendar";
import EventsForm from "../../components/Events/EventsForm/EventsForm";
import { Context } from "../..";
import { observer } from "mobx-react-lite";

const Events = () => {
   const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
   const { store } = useContext(Context);

   useEffect(() => {
      store.usersStore.fetchUsers();
      store.eventsStore.fetchEvents();
   }, [])

   const handleOk = () => {
      setIsModalVisible(true)
   }

   const handleCancel = () => {
      setIsModalVisible(false)
   }

   return (
      <>
         {!store.eventsStore.isLoading
            ? <div className={s.events}>
               <EventsCalendar />
               <Modal
                  title="Добавить событие"
                  visible={isModalVisible}
                  onOk={handleOk}
                  onCancel={handleCancel}
                  footer={null}
               >
                  <EventsForm closeModal={handleCancel} />
               </Modal>
               <div className={s.footer}>
                  <MyButton onClick={handleOk}>
                     Добавить событие
                  </MyButton>
               </div>
            </div>
            : null}
      </>
   )
}

export default observer(Events)