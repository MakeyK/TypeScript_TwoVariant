import { Component } from "react"
import { ADMIN_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE } from "./utils/consts"
import Admin from "./pages/admin"
import Registration from "./pages/registration"
import Login from './pages/login'


export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: <Admin/>
    }
]

export const publicRoutes = [
    {
        path: REGISTRATION_ROUTE,
        Component: <Registration />
    },
    {
        path: LOGIN_ROUTE,
        Component: <Login />
    }
]