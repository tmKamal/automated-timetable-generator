import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
    makeStyles,
    TableContainer,
    Paper,
    Typography,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from '@material-ui/core';
import SpecificTable from './SpecificTable';
import { useHttpClient } from '../../shared/custom-hooks/http-hook';
import SearchBar from '../../shared/component/searchbar/SearchBar';
const { dialog } = require('electron').remote;
const { Notification } = require('electron').remote;

const useStyles = makeStyles({
    table: {
        minWidth: 700
    }
});
const StudentGroupTable = () => {
    const { id } = useParams();
    const classes = useStyles();
    const [value, setValue] = useState();
    const [rows, setRows] = useState([]);
    const [timetable, setTimeTable] = useState([
        {
            column: 0,
            stRow: 0,
            endRow: 2,
            sesion: {
                name: 'IT2050',
                lecturer: 'DR nuwan',
                room: 'B4O4',
                studentGroup: 'Y2S1 (SE) 1'
            }
        },
        {
            column: 0,
            stRow: 3,
            endRow: 4,
            sesion: {
                name: 'IT2040',
                lecturer: 'Mr Anuradha',
                room: 'AO4',
                studentGroup: 'Y1S1 (IT) 1'
            }
        },
        {
            column: 1,
            stRow: 2,
            endRow: 4,
            sesion: {
                name: 'IT3050',
                lecturer: 'Ms Lushaka',
                room: 'N3D',
                studentGroup: 'Y3S1 (cyber) 1'
            }
        },
        {
            column: 3,
            stRow: 4,
            endRow: 5,
            sesion: {
                name: 'IT4020',
                lecturer: 'DR Bhathiya',
                room: 'B401',
                studentGroup: 'Y3S2 (SE) 3'
            }
        }
    ]);

    const [title, setTitle] = useState();
    const [groupData, setGroupData] = useState();
    const [selectedGroup, setSelectedGroup] = useState();

    useEffect(() => {
        const fetchGroup = async () => {
            try {
                const response = await sendRequest(
                    'https://timetable-generator-api.herokuapp.com/api/studentGroup/'
                );
                if (error) {
                    console.log(error);
                }
                if (response) {
                    setGroupData(response);
                }
                console.log(response);
            } catch (err) {
                console.log(error);
            }
        };
        fetchGroup();
    }, []);
    const { isLoading, error, sendRequest, errorPopupCloser } = useHttpClient();
    const [reload, setReload] = useState();

    function handleChange(e) {
        setSelectedGroup(e.target.value);
        var t = groupData.students.filter((f) => f.id == e.target.value)[0];
        var tempTitle = `${t.academicYearSem} ${t.programme} batch ${t.groupNumber}`;
        setTitle(tempTitle);
        console.log(t.academicYearSem);
    }

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
    return (
        <TableContainer component={Paper}>
            <Typography
                style={{ marginBottom: '30px' }}
                component='h1'
                variant='h4'
                align='center'
            >
                Timetable for {title ? '' : 'specific'} student group {title}
            </Typography>

            <Typography
                style={{ marginBottom: '30px', marginLeft: '30%' }}
                component='h1'
                variant='h4'
                align='left'
            >
                <FormControl
                    style={{ width: '552px' }}
                    variant='outlined'
                    className={classes.formControl}
                >
                    <InputLabel id='demo-simple-select-outlined-label'>
                        Select Student group
                    </InputLabel>
                    <Select
                        labelId='demo-simple-select-outlined-label'
                        id='demo-simple-select-outlined'
                        value={selectedGroup}
                        onChange={handleChange}
                        label='studentGroup'
                    >
                        {!isLoading &&
                            groupData &&
                            groupData.students.map((s) => {
                                return (
                                    <MenuItem key={s.id} value={s.id}>
                                        {s.academicYearSem +
                                            ' (' +
                                            s.programme +
                                            ') ' +
                                            s.groupNumber}
                                    </MenuItem>
                                );
                            })}
                    </Select>
                </FormControl>
            </Typography>

            {title ? (
                <React.Fragment>
                    <SpecificTable
                        timetable={timetable}
                        type='student'
                    ></SpecificTable>
                    <Button
                        type='submit'
                        variant='contained'
                        color='primary'
                        className={classes.button}
                        align='right'
                        style={{ margin: '20px', float: 'right' }}
                        onClick={printTable}
                    >
                        Print Time table
                    </Button>
                </React.Fragment>
            ) : (
                ''
            )}
        </TableContainer>
    );
};
export default StudentGroupTable;
