import React from "react"
import { Switch } from "react-router-dom"


import Route from "./Route"
import DashBoard from "../pages/Dashboard"
import SignIn from "../pages/SignIn"
import SignUp from "../pages/SignUp"

const Routes: React.FC = () => (
        <Switch>
            <Route path="/" exact component={SignIn} />
            <Route path="/signup" component={SignUp} />

            <Route path="/dashboard" component={DashBoard} isPrivate />
        </Switch>
)


export default Routes