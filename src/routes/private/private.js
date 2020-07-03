import React from 'react'
import PrivateRoute from "./privateRoute";
import {
    CourseFeeDueDate,
    CourseFeeType,
    BackFeeType,
    BackFeeDueDate,
    CreateSubject,
    SignOut,
    CreateBranch

} from "../../components/index";

const privateRoutes = (props) => {
    const routes = [
        { path: "/createSubject/:id", component: CreateSubject },
        { path: "/updateCourseFeeDueDate/:id", component: CourseFeeDueDate },
        { path: "/updateCourseFeeType/:id", component: CourseFeeType },
        { path: "/updateBackFeeType/:id", component: BackFeeType },
        { path: "/updateBackFeeDueDate/:id", component: BackFeeDueDate },
        { path: "/signOut", component: SignOut },
        { path: "/createBranch/:id", component: CreateBranch },

    ];

    return routes.map((route, index) => {
        return <PrivateRoute key={index} path={route.path} component={(prop) => <route.component {...prop} />} />
    })

}
export default privateRoutes;