import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
    withStyles,
    makeStyles,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow
} from '@material-ui/core';
import { useHttpClient } from '../../shared/custom-hooks/http-hook';

const { dialog } = require('electron').remote;
const { Notification } = require('electron').remote;

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white
    },
    body: {
        fontSize: 14
    }
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover
        }
    }
}))(TableRow);

function createData(
    time,
    monday,
    tuesday,
    wednesday,
    thursday,
    friday,
    saturday,
    sunday
) {
    return {
        time,
        monday,
        tuesday,
        wednesday,
        thursday,
        friday,
        saturday,
        sunday
    };
}

const useStyles = makeStyles({
    table: {
        minWidth: 700
    }
});

const SpecificTable = ({ timetable, type }) => {
    const { id } = useParams();
    const classes = useStyles();
    const [value, setValue] = useState();
    const [rows, setRows] = useState([]);
    const [daysArray, setDaysArray] = useState([]);
    const [isLoadingMat, setIsLoadingMat] = useState();
    const [matrix, setMatrix] = useState(
        Array.from({ length: 10 }, () => Array.from({ length: 10 }, () => null))
    );
    const [fetchedDays, setFetchedDays] = useState();
    const [fetchedTime, setFetchedTime] = useState();

    const {
        isLoading,
        error1,
        sendRequest,
        errorPopupCloser
    } = useHttpClient();
    const [reload, setReload] = useState();

    useEffect(() => {
        const loadDays = async () => {
            const fetchedDays = await sendRequest(
                `https://timetable-generator-api.herokuapp.com/api/workdays/`
            );
            setFetchedDays(fetchedDays);
            for (var i = 0; i < fetchedDays.countDays; i++) {
                await setDaysArray((state) => [...state, i]);
            }
        };
        const loadTime = async () => {
            const fetchedTime = await sendRequest(
                `https://timetable-generator-api.herokuapp.com/api/worktime/`
            );
            setFetchedTime(fetchedTime);
        };
        loadTime();
        loadDays();
    }, [sendRequest, reload]);

    useEffect(() => {
        if (id == 'hall') {
            setValue(hallData);
        } else if (id == 'student-group') {
            setValue(studentData);
        } else {
            setValue(lectureData);
        }

        if (fetchedDays && fetchedTime) {
            const setData = async () => {
                var i = 0;

                while (i < fetchedTime.time.hours) {
                    for (var j = 0; j < 7; j++) {
                        let copy = [...matrix];
                        copy[i][j] = timetable.filter(function (el) {
                            return (
                                el.column == j &&
                                el.stRow <= i &&
                                el.endRow >= i
                            );
                        })[0];
                        await setMatrix(copy);
                    }

                    await setRows((oldArray) => [
                        ...oldArray,
                        createData(
                            `${i + 8}.30`,
                            `-`,
                            '-',
                            '-',
                            '-',
                            '-',
                            null,
                            null
                        )
                    ]);

                    i++;
                }
            };
            setData();
        }
    }, [id, fetchedDays, fetchedTime]);

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
        <React.Fragment>
            <Table className={classes.table} aria-label='customized table'>
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Time table</StyledTableCell>
                        {fetchedDays
                            ? Object.keys(fetchedDays.days[0]).map((key, i) =>
                                  fetchedDays.days[0][key] == true ? (
                                      <StyledTableCell align='left'>
                                          {key}
                                      </StyledTableCell>
                                  ) : (
                                      ''
                                  )
                              )
                            : ''}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, i) => {
                        return (
                            <StyledTableRow key={row.time}>
                                <StyledTableCell>{row.time}</StyledTableCell>
                                {daysArray.map((j) => {
                                    return (
                                        <StyledTableCell align='left'>
                                            {matrix[i][j] != null ? (
                                                <p align='left'>
                                                    {
                                                        matrix[i][j].session1
                                                            .subjectCode
                                                    }{' '}
                                                    {
                                                        matrix[i][j].session1
                                                            .subject.subjectName
                                                    }
                                                    <br />
                                                    {
                                                        matrix[i][j].session1
                                                            .tag.tagType
                                                    }
                                                    {type != 'lecturer' ? (
                                                        <React.Fragment>
                                                            <br />
                                                            {
                                                                matrix[i][j]
                                                                    .session1
                                                                    .selectedLecturer
                                                                    .lecturerName
                                                            }
                                                        </React.Fragment>
                                                    ) : (
                                                        ''
                                                    )}
                                                    {type != 'student' ? (
                                                        <React.Fragment>
                                                            <br />
                                                            {
                                                                matrix[i][j]
                                                                    .session1
                                                                    .studentGroup
                                                            }
                                                        </React.Fragment>
                                                    ) : (
                                                        ''
                                                    )}
                                                    {type != 'room' ? (
                                                        <React.Fragment>
                                                            <br />
                                                            {
                                                                matrix[i][j]
                                                                    .session1
                                                                    .groupId
                                                            }
                                                        </React.Fragment>
                                                    ) : (
                                                        ''
                                                    )}
                                                </p>
                                            ) : (
                                                '-'
                                            )}
                                        </StyledTableCell>
                                    );
                                })}
                            </StyledTableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </React.Fragment>
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

export default SpecificTable;
