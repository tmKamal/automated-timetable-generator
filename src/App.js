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
import ViewStudent from "./students/pages/ViewStudent";
import AddTag from "./tags/pages/AddTag";
import UpdateTag from "./tags/pages/UpdateTag";
import ViewLecturers from "./lecturers/pages/ViewLecturers";

import AddStudentGroup from "./students/pages/AddStudentGroup";
import UpdateStudentGroup from "./students/pages/UpdateStudentGroup";
import ViewStudentGroup from "./students/pages/ViewStudentGroup";

import Group from "./setAvailability/pages/Group";
import Lecturer from "./setAvailability/pages/Lecturer";
import Session from "./setAvailability/pages/Session";
import Subgroup from "./setAvailability/pages/Subgroup";

import ViewTag from "./tags/pages/ViewTag";

import UpdateRoom from "./rooms/pages/UpdateRoom";
import StudentStats from "./stats/pages/StudentStats";
import RoomForLecturer from "./rooms/pages/RoomForLecturer";
import RoomForSubject from "./rooms/pages/RoomForSubject";
import RoomNotAvailable from "./rooms/pages/RoomNotAvailable";
import ViewSessions from "./sessions/pages/ViewSessions";
import RoomForSession from "./rooms/pages/RoomForSession";
import RoomForGroup from "./rooms/pages/RoomForGroup";
import ConsecutiveSessions from "./sessions/pages/ConsecutiveSessions";


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
              <Route path="/update/room/:rid" exact>
                <UpdateRoom></UpdateRoom>
              </Route>
              <Route path="/view-stats-lecturer" exact>
                <LecturerStats></LecturerStats>
              </Route>
              <Route path="/view-stats-subjects" exact>
                <SubjectStats></SubjectStats>
              </Route>
              <Route path="/view-stats-students" exact>
                <StudentStats></StudentStats>
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
              <Route path="/view-sessions" exact>
                <ViewSessions></ViewSessions>
              </Route>
              <Route path="/specific-table/:id" exact>
                <SpecificTable></SpecificTable>
              </Route>
              <Route path="/add-student" exact>
                <AddStudent></AddStudent>
              </Route>
              <Route path="/add-studentGroup" exact>
                <AddStudentGroup></AddStudentGroup>
              </Route>
              <Route path="/update/student/:sid" exact>
                <UpdateStudent></UpdateStudent>
              </Route>
              <Route path="/update/studentGroup/:sid" exact>
                <UpdateStudentGroup></UpdateStudentGroup>
              </Route>
              <Route path="/view-student" exact>
                <ViewStudent></ViewStudent>
              </Route>
              <Route path="/view-studentGroup" exact>
                <ViewStudentGroup></ViewStudentGroup>
              </Route>
              <Route path="/add-tag" exact>
                <AddTag></AddTag>
              </Route>
              <Route path="/update/tag/:tagid" exact>
                <UpdateTag></UpdateTag>
              </Route>
              <Route path="/view-tag" exact>
                <ViewTag></ViewTag>
              </Route>

              <Route path="/setGroup" exact>
                <Group></Group>
              </Route>
              <Route path="/setLecturer" exact>
                <Lecturer></Lecturer>
              </Route>
              <Route path="/setSession" exact>
                <Session></Session>
              </Route>
              <Route path="/setSubgroup" exact>
                <Subgroup></Subgroup>
              </Route>

              <Route path="/room-for-lecturer" exact>
                <RoomForLecturer></RoomForLecturer>
              </Route>
              <Route path="/room-for-subject" exact>
                <RoomForSubject></RoomForSubject>
              </Route>
              <Route path="/unavailable-time-for-room" exact>
                <RoomNotAvailable></RoomNotAvailable>
              </Route>
              <Route path="/room-for-session" exact>
                <RoomForSession></RoomForSession>
              </Route>
              <Route path="/room-for-group" exact>
                <RoomForGroup></RoomForGroup>
              </Route>
              <Route path="/consecutive-sessions" exact>
                <ConsecutiveSessions></ConsecutiveSessions>
              </Route>

              <Redirect to="/"></Redirect>
            </Switch>
          </MiniDrawer>
        </div>
      </Router>
    </React.Fragment>
  );
}
