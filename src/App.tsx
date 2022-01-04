import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';
import { Context } from '.';
import AppRouter from './components/AppRouter/AppRouter';
import Layout from './components/Layout/Layout';
import { useNavigate } from 'react-router';

function App() {
   const { store } = useContext(Context);
   const nav = useNavigate();

   const { isInitialized, isAuth } = store.authStore

   useEffect(() => {
      store.authStore.fetchAuth();
   }, [])

   useEffect(() => {
      if (isInitialized && !isAuth) {
         nav('/login')
      }
   }, [isAuth, isInitialized])

   return (
      <>
         <Layout>
            {!isInitialized
               ? <div className='loader'>Loading...</div>
               : <AppRouter />}
         </Layout>
      </>
   );
}

export default observer(App);
