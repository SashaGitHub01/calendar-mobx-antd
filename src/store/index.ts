import { Auth } from "./auth";
import { Events } from "./events";
import { Users } from "./users";


export class RootStore {
   authStore: Auth;
   eventsStore: Events;
   usersStore: Users

   constructor() {
      this.authStore = new Auth()
      this.eventsStore = new Events()
      this.usersStore = new Users()
   }
};