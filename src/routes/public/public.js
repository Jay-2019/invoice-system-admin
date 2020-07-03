import React from 'react'
import PublicRoute from "./publicRoute";
import {
    SignInAdmin,
    ResetPassword
} from "../../components/index";


const publicRoutes = (props) => {
    const routes = [
        { path: "/", component: SignInAdmin },
        { path: "/adminSignIn", component: SignInAdmin },
        { path: "/resetPassword", component: ResetPassword },

    ];
    return routes.map((route, index) => {
        return <PublicRoute key={index} exact path={route.path} component={(prop) => <route.component test={props} {...prop} />} />
    });
}
export default publicRoutes;