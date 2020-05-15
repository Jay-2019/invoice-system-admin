import React from 'react'

import PrivateRoute from "./privateRoute";

const privateRoutes = (props) => {
    const routes = [
        // { path: "/studentProfile/:id", component: StudentProfile },
      
    ];
    return routes.map((route, index) => {
        return <PrivateRoute key={index} path={route.path} component={(prop) => <route.component {...prop} />} />
    });
}
export default privateRoutes;