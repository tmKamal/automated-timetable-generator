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
import ViewRoom from "./rooms/pages/ViewRoom";
import AddWorkDays from "./workdays/pages/AddWorkDays";
import UpdateWorkDays from "./workdays/pages/UpdateWorkDays";
import AddWorkTime from "./worktime/pages/AddWorkTime";
import UpdateWorkTime from "./worktime/pages/UpdateWorkTime";
import TableGenerate from "./tablegenerate/pages/TableGenerate";
import SpecificTable from "./specificTable/pages/SpecificTable";
import HomePage from "./shared/pages/HomePage";
import { Helmet } from "react-helmet";
import regeneratorRuntime from "regenerator-runtime";

import AddLecturer from "./lecturers/pages/AddLecturer";
import UpdateLecturer from "./lecturers/pages/UpdateLecturer";
import AddSubject from "./subjects/pages/AddSubject";
import UpdateSubject from "./subjects/pages/UpdateSubject";
import AddSession from "./sessions/pages/AddSession";

import ViewBuildings from "./buildings/pages/ViewBuildings";
import ViewSubjects from "./subjects/pages/ViewSubjects";
import UpdateBuilding from "./buildings/pages/UpdateBuilding";
import LecturerStats from "./stats/pages/LecturerStats";
import SubjectStats from "./stats/pages/SubjectsStats";
import AddStudent from "./students/pages/AddStudent";
import UpdateStudent from "./students/pages/UpdateStudent";
import AddTag from "./tags/pages/AddTag";
import UpdateTag from "./tags/pages/UpdateTag";
import ViewLecturers from "./lecturers/pages/ViewLecturers";

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
              <Route path="/view-buildings" exact>
                <ViewBuildings></ViewBuildings>
              </Route>
              <Route path="/update/building/:bid" exact>
                <UpdateBuilding></UpdateBuilding>
              </Route>
              <Route path="/add-room" exact>
                <AddRoom></AddRoom>
              </Route>
              <Route path="/view-room" exact>
                <ViewRoom></ViewRoom>
              </Route>
              <Route path="/view-stats-lecturer" exact>
                <LecturerStats></LecturerStats>
              </Route>
              <Route path="/view-stats-subjects" exact>
                <SubjectStats></SubjectStats>
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
              <Route path="/add-lecturer" exact>
                <AddLecturer></AddLecturer>
              </Route>
              <Route path="/view-lecturers" exact>
                <ViewLecturers></ViewLecturers>
              </Route>
              <Route path="/update-lecturer/:lid" exact>
                <UpdateLecturer></UpdateLecturer>
              </Route>
              <Route path="/add-subject" exact>
                <AddSubject></AddSubject>
              </Route>
              <Route path="/view-subjects" exact>
                <ViewSubjects></ViewSubjects>
              </Route>
              <Route path="/update-subject/:sid" exact>
                <UpdateSubject></UpdateSubject>
              </Route>
              <Route path="/table-generate" exact>
                <TableGenerate></TableGenerate>
              </Route>
              <Route path="/add-session">
                <AddSession></AddSession>
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
              <Route path="/add-tag" exact>
                <AddTag></AddTag>
              </Route>
              <Route path="/update-tag" exact>
                <UpdateTag></UpdateTag>
              </Route>
              <Redirect to="/"></Redirect>
            </Switch>
          </MiniDrawer>
        </div>
      </Router>
    </React.Fragment>
  );
}
