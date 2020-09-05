import React from "react";
import { NavLink } from "react-router-dom";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  makeStyles,
} from "@material-ui/core";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import StarBorder from "@material-ui/icons/StarBorder";

const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const SideBarLinks = () => {

    const classes = useStyles();
    const [roomOpen, setRoomOpen] = React.useState(false);
    const [daysOpen, setDaysOpen] = React.useState(false);
    const [timeOpen, setTimeOpen] = React.useState(false);
    const [buildingOpen, setBuildingOpen]=React.useState(false);
    const [statsOpen, setStatsOpen]=React.useState(false);
    const [studentOpen, setStudentOpen] = React.useState(false);
    const [lecturerOpen, setLecturerOpen] = React.useState(false);
    const [subjectOpen, setSubjectOpen] = React.useState(false);
   
    return (
        <List>
            
            {/* ============== Statistics new ===================== */}
            <ListItem button onClick={() => setStatsOpen(!statsOpen)}>
                <ListItemIcon>
                    <InboxIcon />
                </ListItemIcon>
                <ListItemText primary='Statistics' />
                {statsOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={statsOpen} timeout='auto' unmountOnExit>
                <List component='div' disablePadding>
                    <NavLink
                        style={{ textDecoration: 'none' }}
                        to='/view-stats-subjects'
                        className='MuiTypography-colorInherit '
                    >
                        <ListItem button className={classes.nested}>
                            <ListItemIcon>
                                <StarBorder />
                            </ListItemIcon>
                            <ListItemText primary='Subjects Stats' />
                        </ListItem>
                    </NavLink>
                </List>
                <List component='div' disablePadding>
                    <NavLink
                        style={{ textDecoration: 'none' }}
                        to='/view-stats-lecturer'
                        className='MuiTypography-colorInherit '
                    >
                        <ListItem button className={classes.nested}>
                            <ListItemIcon>
                                <StarBorder />
                            </ListItemIcon>
                            <ListItemText primary='Lecturer Stats' />
                        </ListItem>
                    </NavLink>
                </List>
            </Collapse>
            {/* ============== Statistics End ===================== */}
            {/* ============== Building new ===================== */}
            <ListItem button onClick={() => setBuildingOpen(!buildingOpen)}>
                <ListItemIcon>
                    <InboxIcon />
                </ListItemIcon>
                <ListItemText primary='Buildings' />
                {buildingOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={buildingOpen} timeout='auto' unmountOnExit>
                <List component='div' disablePadding>
                    <NavLink
                        style={{ textDecoration: 'none' }}
                        to='/add-building'
                        className='MuiTypography-colorInherit '
                    >
                        <ListItem button className={classes.nested}>
                            <ListItemIcon>
                                <StarBorder />
                            </ListItemIcon>
                            <ListItemText primary='Add Building' />
                        </ListItem>
                    </NavLink>
                </List>
                <List component='div' disablePadding>
                    <NavLink
                        style={{ textDecoration: 'none' }}
                        to='/view-buildings'
                        className='MuiTypography-colorInherit '
                    >
                        <ListItem button className={classes.nested}>
                            <ListItemIcon>
                                <StarBorder />
                            </ListItemIcon>
                            <ListItemText primary='View Buildings' />
                        </ListItem>
                    </NavLink>
                </List>
            </Collapse>
            {/* ============== Building End ===================== */}
            {/* ============== Room ===================== */}
            <ListItem button onClick={() => setRoomOpen(!roomOpen)}>
                <ListItemIcon>
                    <InboxIcon />
                </ListItemIcon>
                <ListItemText primary='Rooms' />
                {roomOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={roomOpen} timeout='auto' unmountOnExit>
                <List component='div' disablePadding>
                    <NavLink
                        style={{ textDecoration: 'none' }}
                        to='/add-room'
                        className='MuiTypography-colorInherit '
                    >
                        <ListItem button className={classes.nested}>
                            <ListItemIcon>
                                <StarBorder />
                            </ListItemIcon>
                            <ListItemText primary='Add Room' />
                        </ListItem>
                    </NavLink>
                </List>
                <List component='div' disablePadding>
                    <NavLink
                        style={{ textDecoration: 'none' }}
                        to='/view-room'
                        className='MuiTypography-colorInherit '
                    >
                        <ListItem button className={classes.nested}>
                            <ListItemIcon>
                                <StarBorder />
                            </ListItemIcon>
                            <ListItemText primary='View Room' />
                        </ListItem>
                    </NavLink>
                </List>
            </Collapse>

            {/* ============== Working Time End ===================== */}

            {/* ============== Lecturers ===================== */}
            <ListItem button onClick={()=>setLecturerOpen(!lecturerOpen)}>
                <ListItemIcon>
                    <InboxIcon />
                </ListItemIcon>
                <ListItemText primary='Lecturers' />
                {lecturerOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={lecturerOpen} timeout='auto' unmountOnExit>
                <List component='div' disablePadding>
                    <NavLink
                        style={{ textDecoration: 'none' }}
                        to='/add-lecturer'
                        className='MuiTypography-colorInherit '
                    >
                        <ListItem button className={classes.nested}>
                            <ListItemIcon>
                                <StarBorder />
                            </ListItemIcon>
                            <ListItemText primary='Add Lecturer' />
                        </ListItem>
                    </NavLink>
                </List>
                <List component='div' disablePadding>
                    <NavLink
                        style={{ textDecoration: 'none' }}
                        to='/view-lecturers'
                        className='MuiTypography-colorInherit '
                    >
                        <ListItem button className={classes.nested}>
                            <ListItemIcon>
                                <StarBorder />
                            </ListItemIcon>
                            <ListItemText primary='View Lecturers' />
                        </ListItem>
                    </NavLink>
                </List>
            </Collapse>
            {/* ============== Lecturers End ===================== */}

            {/* ============== Subjects ===================== */}
            <ListItem button onClick={()=>setSubjectOpen(!subjectOpen)}>
                <ListItemIcon>
                    <InboxIcon />
                </ListItemIcon>
                <ListItemText primary='Subjects' />
                {subjectOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={subjectOpen} timeout='auto' unmountOnExit>
                <List component='div' disablePadding>
                    <NavLink
                        style={{ textDecoration: 'none' }}
                        to='/add-subject'
                        className='MuiTypography-colorInherit '
                    >
                        <ListItem button className={classes.nested}>
                            <ListItemIcon>
                                <StarBorder />
                            </ListItemIcon>
                            <ListItemText primary='Add Subject' />
                        </ListItem>
                    </NavLink>
                </List>
                <List component='div' disablePadding>
                    <NavLink
                        style={{ textDecoration: 'none' }}
                        to='/view-subjects'
                        className='MuiTypography-colorInherit '
                    >
                        <ListItem button className={classes.nested}>
                            <ListItemIcon>
                                <StarBorder />
                            </ListItemIcon>
                            <ListItemText primary='View Subjects' />
                        </ListItem>
                    </NavLink>
                </List>
            </Collapse>
            {/* ============== Subjects End ===================== */}

            {/*============== Session ===================== */}
            <NavLink
                style={{ textDecoration: 'none' }}
                to='/add-session'
                className='MuiTypography-colorInherit '
            >
                <ListItem button>
                    <ListItemIcon>
                        <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary='Session' />
                </ListItem>
            </NavLink>
            {/*============== Session End===================== */}

            

            {/* ============== Room End ===================== */}
 
  
      


      {/* ============== Workingdays ===================== */}
      <ListItem button onClick={() => setDaysOpen(!daysOpen)}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="Working Days" />
        {daysOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={daysOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <NavLink
            style={{ textDecoration: "none" }}
            to="/add-workdays"
            className="MuiTypography-colorInherit "
          >
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary="Add Working Days" />
            </ListItem>
          </NavLink>
        </List>
        <List component="div" disablePadding>
          <NavLink
            style={{ textDecoration: "none" }}
            to="/update-workdays"
            className="MuiTypography-colorInherit "
          >
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary="Update Days" />
            </ListItem>
          </NavLink>
        </List>
      </Collapse>
      {/* ============== Workingdays End ===================== */}

      {/* ============== Working Time ===================== */}
      <ListItem button onClick={() => setTimeOpen(!timeOpen)}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="Working Time" />
        {timeOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={timeOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <NavLink
            style={{ textDecoration: "none" }}
            to="/add-worktime"
            className="MuiTypography-colorInherit "
          >
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary="Add Time" />
            </ListItem>
          </NavLink>
        </List>
        <List component="div" disablePadding>
          <NavLink
            style={{ textDecoration: "none" }}
            to="/update-worktime"
            className="MuiTypography-colorInherit "
          >
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary="Update Time" />
            </ListItem>
          </NavLink>
        </List>
      </Collapse>
      {/* ============== Working Time End ===================== */}
      {/*============== Generate table ===================== */}
      <NavLink
        style={{ textDecoration: "none" }}
        to="/table-generate"
        className="MuiTypography-colorInherit "
      >
        <ListItem button>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Table Generate" />
        </ListItem>
      </NavLink>
      {/*============== Generate table End===================== */}
      {/* ============== Student ===================== */}
      <ListItem button onClick={() => setStudentOpen(!studentOpen)}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="Students" />
        {studentOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={studentOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <NavLink
            style={{ textDecoration: "none" }}
            to="/add-student"
            className="MuiTypography-colorInherit "
          >
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary="Add Student" />
            </ListItem>
          </NavLink>
        </List>
        <List component="div" disablePadding>
          <NavLink
            style={{ textDecoration: "none" }}
            to="/update-student"
            className="MuiTypography-colorInherit "
          >
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary="Update Student" />
            </ListItem>
          </NavLink>

        </List>
      </Collapse>
      {/* ============== Student End ===================== */}
      {/*============== Tag ===================== */}
      <NavLink
        style={{ textDecoration: "none" }}
        to="/add-tag"
        className="MuiTypography-colorInherit "
      >
        <ListItem button>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Tag" />
        </ListItem>
      </NavLink>
      {/*============== Tag End===================== */}
    </List>
  );
};
export default SideBarLinks;
