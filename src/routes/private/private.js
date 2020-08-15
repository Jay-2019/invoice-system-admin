import React from 'react'
import PrivateRoute from "./privateRoute";


import {
    // Subjects Components
    CreateSubject,
    UpdateSubject,
    ListSubject,
    DeleteSubject,

    // Branches Components
    CreateBranch,
    ListBranch,
    UpdateBranch,
    DeleteBranch,

    // Course-Fee Components
    CourseFeeDueDate,
    DisplayCourseFeeDueDate,

    // Course-Fee-Type Components
    CourseFeeType,

    // Back-Fee Components
    BackFeeType,
    BackFeeDueDate,

    // Sign-Out Components
    SignOut,
} from "../../components/index";

const privateRoutes = (props) => {
    const routes = [

        // Subjects Routes
        { path: "/createSubject/:adminAuthToken", component: CreateSubject },
        { path: "/listSubject/:adminAuthToken", component: ListSubject },
        { path: "/updateSubject/:subjectId/:adminAuthToken", component: UpdateSubject },
        { path: "/deleteSubject/:subjectId/:adminAuthToken", component: DeleteSubject },

        // Branches Routes
        { path: "/createBranch/:adminAuthToken", component: CreateBranch },
        { path: "/listBranch/:adminAuthToken", component: ListBranch },
        { path: "/updateBranch/:branchId/:adminAuthToken", component: UpdateBranch },
        { path: "/deleteBranch/:branchId/:adminAuthToken", component: DeleteBranch },

        // Course-Fee-Due-Date Routes 
        { path: "/updateCourseFeeDueDate/:adminAuthToken", component: CourseFeeDueDate },
        { path: "/displayCourseFeeDueDate/:adminAuthToken", component: DisplayCourseFeeDueDate },

        //  Course-Fee-Type Routes
        { path: "/updateCourseFeeType/:documentId/:adminAuthToken", component: CourseFeeType },

        //  Back-Fee Routes
        { path: "/updateBackFeeType/:documentId/:adminAuthToken", component: BackFeeType },
        { path: "/updateBackFeeDueDate/:documentId/:adminAuthToken", component: BackFeeDueDate },

        // Sign-Out Routes
        { path: "/signOut", component: SignOut },
    ];

    return routes.map((route, index) => {
        return <PrivateRoute key={index} path={route.path} component={(prop) => <route.component {...prop} />} />
    })

}
export default privateRoutes;