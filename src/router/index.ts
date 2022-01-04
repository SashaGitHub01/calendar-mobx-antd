import React from "react"
import Events from "../pages/Events/Events"
import Login from "../pages/Login/Login"

export interface IRoute {
   element: React.ComponentType,
   path: string
}


export enum Paths {
   LOGIN = '/login',
   EVENTS = '/'
}

export const publicRoutes: IRoute[] = [
   { path: Paths.LOGIN, element: Login }
]

export const privateRoutes: IRoute[] = [
   { path: Paths.EVENTS, element: Events },
   { path: Paths.LOGIN, element: Login }
]