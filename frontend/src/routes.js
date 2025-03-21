import { Component } from "react"
import { ADMIN_ROUTE, DELETEMESSAGE_ROUTE, LOGIN_ROUTE, MESSAGE_ROUTE, REGISTRATION_ROUTE } from "./utils/consts"
import Admin from "./pages/admin"
import Registration from './pages/registration'
import Login from './pages/login'
import MessageGet from "./pages/getmessage"
import DeleteMessage from "./pages/delete"

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: <Admin/>
    },
    {
        path: MESSAGE_ROUTE,
        Component: <MessageGet/>
    },
    {
        path: DELETEMESSAGE_ROUTE,
        Component: <DeleteMessage/>
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