import { makeAutoObservable } from "mobx";
import { UsersService } from "../../API/UsersService";
import { IUser } from "../../models/IUser";

export class Users {
   users: IUser[] = []
   isLoading: boolean = false
   error: string | null = null

   constructor() {
      makeAutoObservable(this)
   }

   setIsLoading = () => {
      this.isLoading = true
   }

   setUsers = (users: IUser[]) => {
      this.isLoading = false
      this.error = null
      this.users = users
   }

   setError = (err: string) => {
      this.isLoading = false
      this.error = err
   }

   fetchUsers = async () => {
      try {
         this.setIsLoading()

         const res = await UsersService.getAll();

         this.setUsers(res);

      } catch (err) {
         this.setError('Ошибка загрузки')
      }
   }
}