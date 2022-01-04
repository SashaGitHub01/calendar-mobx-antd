import { IEvent } from "../models/IEvent";
import { instance } from "./instance";
import { IEventBody } from "./types/IEventBody";
import { IResponse } from "./types/IResponse";

export class EventService {
   static getAll = async (): Promise<IEvent[]> => {
      const res = await instance.get<IResponse<IEvent[]>>('/events');

      return res.data.data
   }

   static create = async (body: IEventBody): Promise<IEvent> => {
      const res = await instance.post<IResponse<IEvent>>('/events', body);

      return res.data.data
   }

   static delete = async (id: string): Promise<IEvent> => {
      const res = await instance.delete<IResponse<IEvent>>(`/events/${id}`);

      return res.data.data
   }
}