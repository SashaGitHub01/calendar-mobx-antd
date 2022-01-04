import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "../..";
import Header from "./Header/Header";
import s from './Layout.module.scss';

const Layout: React.FC = ({ children }) => {

   return (
      <div className={s.wrapper}>
         <Header />
         <main className={s.main}>
            {children}
         </main>
      </div>
   )
}

export default Layout
