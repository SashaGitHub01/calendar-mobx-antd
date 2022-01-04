import { makeAutoObservable } from "mobx";
import { string } from "yup";
import { AuthService } from "../../API/AuthService";
import { ILoginBody } from "../../API/types/ILoginBody";
import { IUser } from "../../models/IUser";

export class Auth {
   user: IUser | null = null
   isAuth: boolean = false
   isInitialized: boolean = false
   isSigningIn: boolean = false
   signError: string | null = null
   error: string | null = null


   constructor() {
      makeAutoObservable(this)
   }

   setUser = (user: IUser | null) => {
      this.user = user;
      this.isAuth = true;
      this.isInitialized = true;
      this.error = null
   }

   reset = () => {
      this.user = null;
      this.isAuth = false;
      this.error = null;
   }

   setError = (err: string) => {
      this.isInitialized = true;
      this.error = err
   }


   setSignInError = (err: string) => {
      this.isSigningIn = false;
      this.signError = err
   }

   setIsSigningIn = () => {
      this.isSigningIn = true;
   }

   async fetchLogin(body: ILoginBody) {
      try {
         this.setIsSigningIn();

         const res = await AuthService.login(body);

         if (res) {
            this.setUser(res);
         } else {
            this.setSignInError('Неверный логин или пароль')
         }

      } catch (err: any) {
         this.setSignInError('Неверный логин или пароль')
      }
   }

   async fetchAuth() {
      try {
         const res = await AuthService.auth();

         if (res) {
            this.setUser(res);
         } else {
            this.setError('Неверный логин или пароль')
         }

      } catch (err: any) {
         this.setError('Ошибка входа')
      }
   }

   fetchLogout = async () => {
      try {
         await AuthService.logout();
         this.reset()
      } catch (err: any) {

         this.setError('Ошибка выхода')
      }
   }
}