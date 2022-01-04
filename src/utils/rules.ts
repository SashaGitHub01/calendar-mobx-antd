import moment from "moment";
import { Moment } from "moment";
import { IEvent } from "../models/IEvent";
import { formatDate } from "./formateDate";

export const rules = {
   required: () => ({
      required: true,
      message: 'Обязательное поле'
   }),

   correctDate: (events: IEvent[]) => ({
      validator(_: any, val: Moment) {
         const nowDate = new Date().toDateString()
         const isInvalid = val?.isBefore(
            (moment(nowDate))
         );

         const isIncludes = events.find(({ date }) => date == formatDate(val))

         if (isInvalid || isIncludes) return Promise.reject(new Error('Некорректная дата'))

         return Promise.resolve();
      }
   })
}