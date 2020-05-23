import React from 'react'
import { CourseFeeDueDate, CourseFeeType, BackFeeType, BackFeeDueDate, CreateSubject } from "../../components/index";
import PublicRoute from "./publicRoute";

const publicRoutes = (props) => {
    const routes = [
        { path: "/createSubject", component: CreateSubject },
        { path: "/updateCourseFeeDueDate", component: CourseFeeDueDate },
        { path: "/updateCourseFeeType", component: CourseFeeType },
        { path: "/updateBackFeeType", component: BackFeeType },
        { path: "/updateBackFeeDueDate", component: BackFeeDueDate }

    ];
    return routes.map((route, index) => {
        return <PublicRoute key={index} path={route.path} component={(prop) => <route.component test={props} {...prop} />} />
    });
}
export default publicRoutes;