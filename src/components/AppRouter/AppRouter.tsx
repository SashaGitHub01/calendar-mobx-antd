import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Routes, Route, } from "react-router-dom";
import { Context } from "../..";
import NotFound from "../../pages/NotFound/NotFound";
import { privateRoutes, publicRoutes } from "../../router";

const AppRouter = () => {
   const { store } = useContext(Context);
   const isAuth = store.authStore.isAuth

   return (
      <Routes>
         {isAuth
            ? privateRoutes.map((route) => (
               <Route
                  path={route.path}
                  element={<route.element />}
                  key={route.path}
               />
            ))
            : publicRoutes.map((route) => (
               <Route
                  path={route.path}
                  element={<route.element />}
                  key={route.path}
               />
            ))}
         <Route path='*' element={<NotFound />} />
      </Routes>
   )
}

export default observer(AppRouter)
