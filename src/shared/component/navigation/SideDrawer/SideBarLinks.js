
import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Collapse,
    makeStyles
} from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import StarBorder from '@material-ui/icons/StarBorder';

const useStyles = makeStyles((theme) => ({
    nested: {
        paddingLeft: theme.spacing(4)
    }
}));

const SideBarLinks = () => {
    const classes = useStyles();
    const [roomOpen, setRoomOpen] = React.useState(false);
    const [daysOpen, setDaysOpen] = React.useState(false);

    const handleClickRoom = () => {
        setRoomOpen(!roomOpen);
    };
    return (
        <List>
            {/*============== Building ===================== */}
            <NavLink
                style={{ textDecoration: 'none' }}
                to='/add-building'
                className='MuiTypography-colorInherit '
            >
                <ListItem button>
                    <ListItemIcon>
                        <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary='Building' />
                </ListItem>
            </NavLink>
            {/*============== Building End===================== */}
            {/* ============== Room ===================== */}
            <ListItem button onClick={handleClickRoom}>
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
                        to='/update-room'
                        className='MuiTypography-colorInherit '
                    >
                        <ListItem button className={classes.nested}>
                            <ListItemIcon>
                                <StarBorder />
                            </ListItemIcon>
                            <ListItemText primary='Update Room' />
                        </ListItem>
                    </NavLink>
                </List>
            </Collapse>
            {/* ============== Room End ===================== */}

            {/* ============== Workingdays ===================== */}
            <ListItem button onClick={() => setDaysOpen(!daysOpen)}>
                <ListItemIcon>
                    <InboxIcon />
                </ListItemIcon>
                <ListItemText primary='Working Days' />
                {daysOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={daysOpen} timeout='auto' unmountOnExit>
                <List component='div' disablePadding>
                    <NavLink
                        style={{ textDecoration: 'none' }}
                        to='/add-workdays'
                        className='MuiTypography-colorInherit '
                    >
                        <ListItem button className={classes.nested}>
                            <ListItemIcon>
                                <StarBorder />
                            </ListItemIcon>
                            <ListItemText primary='Add Working Days' />
                        </ListItem>
                    </NavLink>
                </List>
                <List component='div' disablePadding>
                    <NavLink
                        style={{ textDecoration: 'none' }}
                        to='/update-workdays'
                        className='MuiTypography-colorInherit '
                    >
                        <ListItem button className={classes.nested}>
                            <ListItemIcon>
                                <StarBorder />
                            </ListItemIcon>
                            <ListItemText primary='Update Days' />
                        </ListItem>
                    </NavLink>
                </List>
            </Collapse>
            {/* ============== Room End ===================== */}
        </List>
    );
};
export default SideBarLinks;
