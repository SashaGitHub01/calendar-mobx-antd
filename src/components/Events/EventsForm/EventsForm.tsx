import React, { useContext, useState } from "react";
import MyInput from "../../../UI/MyInput/MyInput";
import s from './EventsForm.module.scss';
import { Button, DatePicker, Form, Input, Select } from 'antd';
import { useFormik } from "formik";
import MyButton from "../../../UI/MyButton/MyButton";
import moment, { Moment } from 'moment';
import { formatDate } from "../../../utils/formateDate";
import * as Yup from 'yup';
import { Context } from "../../..";
import { observer } from "mobx-react-lite";
import { rules } from "../../../utils/rules";

interface IEventsForm {
   closeModal: () => void
}

const EventsForm: React.FC<IEventsForm> = ({ closeModal }) => {
   const [date, setDate] = useState<string>('');
   const [form] = Form.useForm()

   const { store } = useContext(Context);

   const onSubmit = async (values: any) => {
      await store.eventsStore.fetchCreate({
         ...values,
         date,
      })

      if (!store.eventsStore.createError) {
         setDate('');
         closeModal();
         form.resetFields();
      }
   }

   const pickDate = (val: Moment | null) => {
      if (!val) return;

      if (val) {
         setDate(formatDate(val))
      }
   }

   return (
      <Form className={s.form} onFinish={onSubmit} form={form}>
         <Form.Item
            style={{ margin: 0 }}
            name={'date'}
            rules={[
               rules.required(),
               rules.correctDate(store.eventsStore.events)
            ]}
         >
            <DatePicker
               style={{ width: '100%' }}
               onChange={pickDate}
            />
         </Form.Item>
         <Form.Item
            name={'guests'}
            style={{ margin: 0 }}
            rules={[rules.required()]}
         >
            <Select
               mode="multiple"
               allowClear
               placeholder='Выберите пользователей'
               style={{ width: '100%' }}
            >
               {store.usersStore.users &&
                  store.usersStore.users.map(({ id, username }) => (
                     <Select.Option
                        value={id}
                        key={id}
                        disabled={id == store.authStore.user?.id}
                     >
                        {username}
                     </Select.Option>
                  ))}
            </Select>
         </Form.Item>
         <Form.Item
            noStyle
            name="description"
            rules={[rules.required()]}
         >
            <Input placeholder="Описание" />
         </Form.Item>
         <Form.Item noStyle>
            <Button
               htmlType="submit"
               type="primary"
               disabled={false}
            >
               Создать
            </Button>
         </Form.Item>
      </Form>
   )
}

export default observer(EventsForm)
