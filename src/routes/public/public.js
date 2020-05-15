import React from 'react'
import CourseFeeDueDate from "../../components/index";
import PublicRoute from "./publicRoute";

const publicRoutes = (props) => {
    const routes = [
        { path: "/", component: CourseFeeDueDate },

    ];
    return routes.map((route, index) => {
        return <PublicRoute key={index} path={route.path} component={(prop) => <route.component test={props} {...prop} />} />
    });
}
export default publicRoutes;