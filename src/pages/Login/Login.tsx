import React, { useContext, useEffect } from "react";
import MyInput from "../../UI/MyInput/MyInput";
import s from './Login.module.scss';
import { Context } from "../..";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input } from "antd";
import { rules } from "../../utils/rules";

const Login = () => {
   const { store } = useContext(Context);
   const { isAuth } = store.authStore
   const nav = useNavigate();

   const [form] = Form.useForm();

   useEffect(() => {
      if (isAuth) nav('/')
   }, [isAuth])

   const initial = {
      password: '',
      username: ''
   }

   const onSubmit = async (values: any) => {
      await store.authStore.fetchLogin(values)
      console.log(values);

      if (!store.authStore.signError) nav('/')
   }

   return (
      <div className={s.login}>
         <div className={s.login_window}>
            <div className={s.login_head}>
               Вход
            </div>
            <Form
               className={s.form}
               onFinish={onSubmit}
               initialValues={initial}
            >
               <Form.Item
                  name='username'
                  style={{ margin: 0 }}
                  rules={[rules.required(), { max: 25, min: 3 }]}
               >
                  <Input
                     type={'text'}
                  />
               </Form.Item>
               <Form.Item
                  name='password'
                  style={{ margin: 0 }}
                  rules={[rules.required(), { max: 25, min: 3 }]}
               >
                  <Input
                     type={'password'}
                  />
               </Form.Item>
               <Button
                  type="primary"
                  htmlType="submit"
               >
                  Войти
               </Button>
            </Form>
         </div>
      </div>
   )
}

export default observer(Login)
