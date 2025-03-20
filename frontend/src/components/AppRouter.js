import React, { useContext } from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import { publicRoutes, authRoutes, adminRoutes } from "../routes";
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from "../utils/consts";
import { observer } from "mobx-react-lite";
import { jwtDecode } from "jwt-decode";
import { Context } from "../index";

const AppRouter = observer(() => {
    const isAuth = localStorage.getItem("token")
    // let isAdmin = false

    // if (isAuth) {
    //     const decodedToken = jwtDecode(isAuth)
    //     isAdmin = decodedToken.role === 'admin'
    // }

    return (
        <Routes>
            {
                isAuth && authRoutes.map(({ path, Component }) =>
                    <Route key={path} path={path} element={Component} exact />
                )
            }
            {publicRoutes.map(({ path, Component }) =>
                <Route key={path} path={path} element={Component} exact />
            )}
            <Route path="*" element={<Navigate replace to={LOGIN_ROUTE}/>} />
        </Routes>
    );
});

export default AppRouter;
