import React from 'react'
import { CourseFeeDueDate, CourseFeeType } from "../../components/index";
import PublicRoute from "./publicRoute";

const publicRoutes = (props) => {
    const routes = [
        { path: "/updateCourseFeeDueDate", component: CourseFeeDueDate },
        { path: "/updateCourseFeeType", component: CourseFeeType },

    ];
    return routes.map((route, index) => {
        return <PublicRoute key={index} path={route.path} component={(prop) => <route.component test={props} {...prop} />} />
    });
}
export default publicRoutes;