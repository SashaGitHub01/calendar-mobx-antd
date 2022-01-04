import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "../../..";
import s from './Header.module.scss';

const Header = () => {
   const { store } = useContext(Context)
   const { isAuth, user, fetchLogout } = store.authStore

   return (
      <header className={s.header}>
         <div className={s.header_row}>
            <nav className={s.nav}>
               {isAuth
                  ? <div className={s.user_menu}>
                     <div className={s.user_name}>
                        {user?.username}
                     </div>
                     <div className={s.quit} onClick={fetchLogout}>
                        Выйти
                     </div>
                  </div>
                  : <div className={s.sign_btn}>
                     <span>Войти</span>
                  </div>}
            </nav>
         </div>
      </header>
   )
}

export default observer(Header)
