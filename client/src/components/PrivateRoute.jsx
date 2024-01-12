import React from "react";
import Cookies from "js-cookie";
import { Outlet, Navigate } from "react-router-dom";

export const PrivateRoute = ()=>{

    const role = Cookies.get('role');

    return role ==  "merchant" ? <Outlet/> : <Navigate to={"/"} />

}