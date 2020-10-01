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
const LecturerTable = () => {
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
                name: 'Foll',
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
                lecturer: 'DR bfdbd',
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
                lecturer: 'DR DASUN',
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
                lecturer: 'DR bnuwabbfn',
                room: 'B401',
                studentGroup: 'Y3S2 (SE) 3'
            }
        }
    ]);

    const [title, setTitle] = useState();

    const [selectedLecturer, setSelectedLecturer] = useState();

    const [lecturerData, setLecturerData] = useState();
    useEffect(() => {
        const fetchLecturer = async () => {
            try {
                const response = await sendRequest(
                    'http://localhost:8000/api/lecturer/'
                );
                if (error) {
                    console.log(error);
                }
                if (response) {
                    setLecturerData(response);
                }
                console.log(response);
            } catch (err) {
                console.log(error);
            }
        };
        fetchLecturer();
    }, []);
    const { isLoading, error, sendRequest, errorPopupCloser } = useHttpClient();
    const [reload, setReload] = useState();

    function handleChange(e) {
        setSelectedLecturer(e.target.value);
        var t = lecturerData.lecturers.filter((f) => f.id == e.target.value)[0];
        var tempTitle = `${t.lecturerName}`;
        setTitle(tempTitle);
        console.log(e.target.value);
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
                Timetable for {title ? title : 'specific Lecturer'}
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
                        Select Lecturer
                    </InputLabel>
                    <Select
                        labelId='demo-simple-select-outlined-label'
                        id='demo-simple-select-outlined'
                        value={selectedLecturer}
                        onChange={handleChange}
                        label='studentGroup'
                    >
                        {!isLoading &&
                            lecturerData &&
                            lecturerData.lecturers.map((s) => {
                                return (
                                    <MenuItem key={s.id} value={s.id}>
                                        {s.lecturerName}
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
                        type='lecturer'
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
const hallData = [
    { title: 'A401', year: 1994 },
    { title: 'A402r', year: 1972 },
    { title: 'B401', year: 1974 },
    { title: 'A611', year: 2008 },
    { title: 'N3D', year: 1957 },
    { title: 'N3C', year: 1993 },
    { title: 'N3E', year: 1994 }
];

const lectureData = [
    { title: 'Dr Nimal perera', year: 1994 },
    { title: 'Mr Kamal bandara', year: 1972 },
    { title: 'Mr aruna sirisena', year: 1974 },
    { title: 'Mr saman ', year: 2008 },
    { title: 'amal', year: 1957 },
    { title: 'nihal', year: 1993 },
    { title: 'sumith', year: 1994 }
];

const studentData = [
    { title: 'Y01S01', year: 1994 },
    { title: 'Y01S02', year: 1972 },
    { title: 'Y02S01', year: 1974 },
    { title: 'Y02S02', year: 2008 },
    { title: 'Y03S01', year: 1957 },
    { title: 'Y03S02', year: 1993 },
    { title: 'Y014S01', year: 1994 }
];

const timetable = [
    {
        column: 0,
        stRow: 0,
        endRow: 2,
        sesion: {
            name: 'IT2020',
            lecturer: 'DR nuwan'
        }
    },
    {
        column: 0,
        stRow: 3,
        endRow: 4,
        sesion: {
            name: 'IT2040',
            lecturer: 'DR bfdbd'
        }
    },
    {
        column: 1,
        stRow: 2,
        endRow: 4,
        sesion: {
            name: 'IT3050',
            lecturer: 'DR fffuwan'
        }
    },
    {
        column: 3,
        stRow: 4,
        endRow: 5,
        sesion: {
            name: 'IT4020',
            lecturer: 'DR bnuwabbfn'
        }
    }
];
export default LecturerTable;
