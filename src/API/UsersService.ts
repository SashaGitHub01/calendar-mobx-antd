import { IUser } from "../models/IUser";
import { instance } from "./instance";
import { IResponse } from "./types/IResponse";

export class UsersService {
   static getAll = async (): Promise<IUser[]> => {
      const res = await instance.get<IResponse<IUser[]>>('/users/');

      return res.data.data
   }
}