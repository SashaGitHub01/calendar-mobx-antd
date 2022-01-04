import { IEvent } from "./IEvent";

export interface IUser {
   id: string,
   username: string,
   password?: string,
   events: IEvent[],
   createdEvents: IEvent[]
}