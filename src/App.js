import React from "react";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import MiniDrawer from "./shared/component/navigation";
import AddBuilding from "./buildings/pages/AddBuilding";
import AddRoom from "./rooms/pages/AddRoom";
import UpdateRoom from "./rooms/pages/UpdateRoom";
import HomePage from "./shared/pages/HomePage";
import regeneratorRuntime from "regenerator-runtime";
export default function App() {
  return (
    <Router>
      <div>
        <MiniDrawer>
          <Switch>
            <Route path="/" exact>
              <HomePage></HomePage>
            </Route>
            <Route path="/add-building" exact>
              <AddBuilding></AddBuilding>
            </Route>
            <Route path="/add-room" exact>
              <AddRoom></AddRoom>
            </Route>
            <Route path="/update-room" exact>
              <UpdateRoom></UpdateRoom>
            </Route>
            <Redirect to="/"></Redirect>
          </Switch>
        </MiniDrawer>
      </div>
    </Router>
  );
}

