import React from 'react';
const { dialog } = require('electron').remote;
const { Notification } = require('electron').remote;
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles, Paper, Typography } from '@material-ui/core';
import { useHttpClient } from '../../shared/custom-hooks/http-hook';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > *': {
            margin: theme.spacing(1)
        }
    },
    generateButton: {
        margin: theme.spacing(1),
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
        padding: '10px',
        width: '-webkit-fill-available',
        fontSize: '13px',

        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        padding: '10px 30px'
    },
    paper: {
        marginTop: theme.spacing(10),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3)
        }
    }
}));

const TableGenerate = () => {
    const classes = useStyles();
    const history = useHistory();

    const printTable = (e) => {
        dialog
            .showMessageBox({
                type: 'question',
                buttons: ['Cancel', 'Yes, please', 'No, thanks'],
                defaultId: 2,
                title: 'Printing the timetable',
                message: 'Do you want to print the timetable?',
                detail:
                    'This will start to print the time table with available printer',
                checkboxLabel: 'Remember my answer',
                checkboxChecked: false
            })
            .then((result) => {
                if (result.response === 1) {
                    const title = 'Start printing';
                    const body = 'Time table printing in progress';
                    const data = { title, body };
                    notify(data);
                } else {
                    console.log('canceled');
                }
            });
    };
    const conflict = () => {
        dialog.showMessageBox({
            type: 'warning',
            buttons: ['ok'],
            defaultId: 0,
            title: 'Conflicts found',
            message: 'While generating timetable we found some conflicts',
            detail:
                'Please check Lecturers, sessions and student groups, make sure there are no overlaping sessions',
            checkboxLabel: 'Remember my answer',
            checkboxChecked: false
        });
    };

    const notify = (data) => {
        console.log(Notification.isSupported());
        let iconAd =
            'F:/Electron/automated-timetable-generator/assets/icon.png';

        const notifi = {
            title: data.title,
            body: data.body,
            icon: iconAd
        };

        new Notification(notifi).show();
    };
    const { isLoading, error, sendRequest, errorPopupCloser } = useHttpClient();
    const handleOnclick = async () => {
        try {
            let res = await sendRequest(
                'https://timetable-generator-api.herokuapp.com/api/studentGroup/timetable/create'
            );
            console.log(res.status);
            if (res.status == 200) {
                let data = {};
                data.title = 'Timetable Generated';
                data.body = 'Timetable has been generated successfully';

                notify(data);
            } else {
                conflict();
            }
        } catch (e) {
            console.log(e);
        }
    };
    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Typography
                    style={{ marginBottom: '30px' }}
                    component='h1'
                    variant='h4'
                    align='center'
                >
                    Generate Timetable
                </Typography>
                <ButtonGroup
                    variant='contained'
                    color='primary'
                    aria-label='contained primary button group'
                    style={{ marginBottom: '30px' }}
                >
                    <Button
                        onClick={handleOnclick}
                        className={classes.generateButton}
                    >
                        Generate Timetable
                    </Button>
                    <Button
                        onClick={() => history.push('/full-table')}
                        className={classes.generateButton}
                    >
                        View Timetable
                    </Button>
                    <Button
                        className={classes.generateButton}
                        onClick={() => history.push('/lecturer-timetable')}
                    >
                        lecturer's timetable
                    </Button>
                    <Button
                        className={classes.generateButton}
                        onClick={() => history.push('/student-timetable')}
                    >
                        Student group's timetable
                    </Button>

                    <Button
                        className={classes.generateButton}
                        onClick={() => history.push('/room-timetable')}
                    >
                        lecture hall's timetable
                    </Button>
                    <Button
                        className={classes.generateButton}
                        onClick={printTable}
                    >
                        Print timetable
                    </Button>
                </ButtonGroup>
            </Paper>
        </div>
    );
};
export default TableGenerate;
