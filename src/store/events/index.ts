import { action, makeAutoObservable, runInAction } from "mobx";
import { EventService } from "../../API/EventsService";
import { IEventBody } from "../../API/types/IEventBody";
import { IEvent } from "../../models/IEvent";

export class Events {
   events: IEvent[] = []
   isLoading: boolean = false
   error: string | null = null
   isCreating: boolean = false
   createError: string | null = null
   isDeleting: boolean = false
   deleteError: string | null = null

   constructor() {
      makeAutoObservable(this)
   }

   setIsLoading = () => {
      this.isLoading = true
   }

   setIsCreating = () => {
      this.isCreating = true
   }

   setIsDeleting = () => {
      this.isDeleting = true
   }

   setEvents = (events: IEvent[]) => {
      this.isLoading = false
      this.error = null
      this.events = events
   }

   setError = (err: string) => {
      this.isLoading = false
      this.error = err
   }

   setCreateError = (err: string) => {
      this.isCreating = false
      this.createError = err
   }

   setDelError = (err: string) => {
      this.isDeleting = false
      this.deleteError = err
   }

   fetchEvents = async () => {
      try {
         this.setIsLoading()

         const res = await EventService.getAll();

         this.setEvents(res);

      } catch (err) {
         this.setError('Ошибка загрузки')
      }
   }

   fetchCreate = async (body: IEventBody) => {
      try {
         this.setIsCreating()

         const res = await EventService.create(body);

         runInAction(() => {
            this.events = [...this.events, res]
            this.isCreating = false
         })

      } catch (err) {
         this.setCreateError('Ошибка загрузки')
      }
   }

   fetchDelete = async (event: string) => {
      try {
         this.setIsDeleting();

         const filtred = this.events.filter(({ id }) => id !== event)

         await EventService.delete(event);

         runInAction(() => {
            this.events = filtred
            this.isDeleting = false
         })

      } catch (err) {
         this.setDelError('Ошибка при удалении')
      }
   }
}