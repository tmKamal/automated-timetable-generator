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
            _id: '5f7d24f8ca92e03eb49f55d5',
            column: 0,
            stRow: 0,
            endRow: 1,
            session1: {
                parallel: {
                    sessions: []
                },
                lecturers: ['5f68d4559df6152c98f795f3'],
                favRoom: [],
                alive: false,
                type: 'normal',
                _id: '5f7740608abcf8001755e8fb',
                tag: '5f6864438035a20684da5b34',
                studentGroup: '5f76f3d1329c6b61682de4a4',
                subject: '5f7564d07fe8824e482e620a',
                subjectCode: 'IT1010',
                studentCount: 120,
                groupId: 'Y1.S1.IT.1',
                duration: 2,
                notAvailable: [],
                __v: 0,
                id: '5f7740608abcf8001755e8fb'
            },
            id: '5f7d24f8ca92e03eb49f55d5'
        },
        {
            _id: '5f7d24f8ca92e03eb49f55d4',
            column: 0,
            stRow: 2,
            endRow: 2,
            session1: {
                parallel: {
                    sessions: []
                },
                lecturers: ['5f68d4559df6152c98f795f3'],
                favRoom: [],
                alive: false,
                type: 'normal',
                _id: '5f7d1dabec7c460017fa89d3',
                tag: '5f6864508035a20684da5b35',
                studentGroup: '5f76f3d1329c6b61682de4a4',
                subject: '5f7564d07fe8824e482e620a',
                subjectCode: 'IT1010',
                studentCount: 120,
                groupId: 'Y1.S1.IT.1',
                duration: 1,
                notAvailable: [],
                __v: 0,
                id: '5f7d1dabec7c460017fa89d3'
            },
            id: '5f7d24f8ca92e03eb49f55d4'
        }
    ]);

    const [title, setTitle] = useState();

    const [selectedLecturer, setSelectedLecturer] = useState();

    const [lecturerData, setLecturerData] = useState();
    useEffect(() => {
        const fetchLecturer = async () => {
            try {
                const response = await sendRequest(
                    'https://timetable-generator-api.herokuapp.com/api/lecturer/'
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
        setTimeTable(t.timetable);
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

export default LecturerTable;
