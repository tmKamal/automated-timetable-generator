import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import MiniDrawer from "./shared/component/navigation";
import AddBuilding from "./buildings/pages/AddBuilding";
import AddRoom from "./rooms/pages/AddRoom";
import UpdateRoom from "./rooms/pages/UpdateRoom";
import AddWorkDays from "./workdays/pages/AddWorkDays";
import UpdateWorkDays from "./workdays/pages/UpdateWorkDays";
import AddWorkTime from "./worktime/pages/AddWorkTime";
import UpdateWorkTime from "./worktime/pages/UpdateWorkTime";
import TableGenerate from "./tablegenerate/pages/TableGenerate";
import SpecificTable from "./specificTable/pages/SpecificTable";
import AddStudent from "./students/pages/AddStudent";
import UpdateStudent from "./students/pages/UpdateStudent";
import HomePage from "./shared/pages/HomePage";
import { Helmet } from "react-helmet";
import regeneratorRuntime from "regenerator-runtime";

export default function App() {
  return (
    <React.Fragment>
      <Helmet>
        <meta
          http-equiv="Content-Security-Policy"
          content="script-src 'self';"
        />
      </Helmet>
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
              <Route path="/add-workdays" exact>
                <AddWorkDays></AddWorkDays>
              </Route>
              <Route path="/update-workdays" exact>
                <UpdateWorkDays></UpdateWorkDays>
              </Route>
              <Route path="/add-worktime" exact>
                <AddWorkTime></AddWorkTime>
              </Route>
              <Route path="/update-worktime" exact>
                <UpdateWorkTime></UpdateWorkTime>
              </Route>
              <Route path="/table-generate" exact>
                <TableGenerate></TableGenerate>
              </Route>
              <Route path="/specific-table/:id" exact>
                <SpecificTable></SpecificTable>
              </Route>
              <Route path="/add-student" exact>
                <AddStudent></AddStudent>
              </Route>
              <Route path="/update-student" exact>
                <UpdateStudent></UpdateStudent>
              </Route>
              <Redirect to="/"></Redirect>
            </Switch>
          </MiniDrawer>
        </div>
      </Router>
    </React.Fragment>
  );
}
