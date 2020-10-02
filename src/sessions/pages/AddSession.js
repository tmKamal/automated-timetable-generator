import React, { useState, useEffect } from 'react';
import {
    CssBaseline,
    Paper,
    Typography,
    Grid,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
    makeStyles,
    Input,
    Checkbox,
    ListItemText
} from '@material-ui/core';
import { set } from 'mongoose';
import { Alert, AlertTitle } from '@material-ui/lab';
import { useHttpClient } from '../../shared/custom-hooks/http-hook';
import { Subject } from '@material-ui/icons';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        marginTop: theme.spacing(5),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto'
        }
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
    },

    buttons: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1)
    }
}));
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250
        }
    }
};

const AddSession = () => {
    const classes = useStyles();
    const { isLoading, error, sendRequest, errorPopupCloser } = useHttpClient();
    const [selectedDate, setSelectedDate] = React.useState(
        new Date('2020-09-23T08:00:00')
    );

    const [msg, setMsg] = useState();
    const [groupToggler, setGroupToggler] = useState('');
    const [groupData, setGroupData] = useState();

    const [values, setValues] = useState({
        lecturers: [],
        tag: '',
        studentGroup: '',
        subGroup: '',
        subject: '',
        studentCount: '',
        hours,
        minutes,
        duration: ''
    });
    const [subjectData, setSubjectData] = useState();
    useEffect(() => {
        const fetchSubject = async () => {
            try {
                const response = await sendRequest(
                    'https://timetable-generator-api.herokuapp.com/api/subject/'
                );
                if (error) {
                    console.log(error);
                }
                if (response) {
                    setSubjectData(response);
                }
                console.log(response);
            } catch (err) {
                console.log(error);
            }
        };
        fetchSubject();
    }, []);

    const [tagData, setTagData] = useState();
    useEffect(() => {
        const fetchTag = async () => {
            try {
                const response = await sendRequest(
                    'https://timetable-generator-api.herokuapp.com/api/tag/'
                );
                if (error) {
                    console.log(error);
                }
                if (response) {
                    setTagData(response);
                }
                console.log(response);
            } catch (err) {
                console.log(error);
            }
        };
        fetchTag();
    }, []);

    const [studentData, setStudentData] = useState();
    useEffect(() => {
        const fetchStudent = async () => {
            try {
                const response = await sendRequest(
                    'https://timetable-generator-api.herokuapp.com/api/student/'
                );
                if (error) {
                    console.log(error);
                }
                if (response) {
                    setStudentData(response);
                }
                console.log(response);
            } catch (err) {
                console.log(error);
            }
        };
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
        fetchStudent();
        fetchGroup();
    }, []);

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

    const {
        lecturers,
        tag,
        studentGroup,
        subGroup,
        subject,
        studentCount,
        hours,
        minutes,
        duration
    } = values;
    //subGroup
    const onChangeHandler = (inputFieldName) => (e) => {
        setValues({ ...values, [inputFieldName]: e.target.value });
        setMsg(null), errorPopupCloser();
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
        /* Extracting hour and minutes from the data obj using moment.js */
        console.log(moment(date).format('H'));
        console.log(moment(date).format('mm'));
        const h = Number(moment(date).format('H'));
        const m = Number(moment(date).format('mm'));
        setValues({ ...values, hours: h, minutes: m });
    };

    const onChangeTagHandler = (e) => {
        setValues({ ...values, tag: e.target.value });
        console.log(e.target.value);
        const selectedTag = tagData.tags.filter((t) => t.id == e.target.value);
        setGroupToggler(selectedTag[0].tagType);
        console.log(selectedTag);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        errorPopupCloser();
        const sub = subjectData.subjects.filter((s) => s.id == subject);
        console.log('selcted sub');
        console.log(sub);
        const subjectCode = sub[0].subjectCode;
        let groupId;
        if (studentGroup) {
            const mainG = groupData.students.filter(
                (s) => s.id == studentGroup
            );
            groupId = mainG[0].groupId;
        } else {
            const subG = studentData.students.filter((s) => s.id == subGroup);
            groupId = subG[0].groupId;
        }
        const location = {
            lecturers,
            tag,
            subjectCode,
            studentGroup,
            subGroup,
            subject,
            studentCount,
            duration,
            groupId
        };

        console.log(location);
        try {
            const responseData = sendRequest(
                'https://timetable-generator-api.herokuapp.com/api/session/',
                'POST',
                JSON.stringify(location),
                { 'Content-Type': 'application/json' }
            );
            if (error) {
                console.log(error);
            }
            console.log(responseData);
            if (responseData) {
                setValues({
                    lecturers: [],
                    tag: '',
                    studentGroup: '',
                    subject: '',
                    studentCount: '',
                    duration: '',
                    subGroup: ''
                });
                console.log(responseData);
                setMsg(responseData.msg);
            }
        } catch (err) {
            console.log(error);
        }
    };

    return (
        <React.Fragment>
            <CssBaseline />

            <main style={{ marginTop: '100px' }} className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography
                        style={{ marginBottom: '20px' }}
                        component='h1'
                        variant='h4'
                        align='center'
                    >
                        Add a Session
                    </Typography>

                    <form
                        onSubmit={submitHandler}
                        className={classes.form}
                        noValidate
                    >
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <FormControl
                                    style={{ width: '552px' }}
                                    variant='outlined'
                                    className={classes.formControl}
                                >
                                    <InputLabel id='demo-mutiple-checkbox-outlined-label'>
                                        Lecturers
                                    </InputLabel>
                                    <Select
                                        labelId='demo-mutiple-checkbox-outlined-label'
                                        id='demo-mutiple-checkbox-outlined'
                                        multiple
                                        value={lecturers}
                                        onChange={onChangeHandler('lecturers')}
                                        input={<Input />}
                                        renderValue={(selected) =>
                                            selected.join(', ')
                                        }
                                        MenuProps={MenuProps}
                                    >
                                        {!isLoading &&
                                            lecturerData &&
                                            lecturerData.lecturers.map((l) => {
                                                return (
                                                    <MenuItem
                                                        key={l.id}
                                                        value={l.id}
                                                    >
                                                        <Checkbox
                                                            checked={
                                                                lecturers.indexOf(
                                                                    l.id
                                                                ) > -1
                                                            }
                                                        />
                                                        <ListItemText
                                                            primary={
                                                                l.lecturerName
                                                            }
                                                        />
                                                    </MenuItem>
                                                );
                                            })}
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12}>
                                <FormControl
                                    style={{ width: '552px' }}
                                    variant='outlined'
                                    className={classes.formControl}
                                >
                                    <InputLabel id='demo-simple-select-outlined-label'>
                                        Tag
                                    </InputLabel>
                                    <Select
                                        labelId='demo-simple-select-outlined-label'
                                        id='demo-simple-select-outlined'
                                        value={tag}
                                        onChange={onChangeTagHandler}
                                        label='Tag'
                                    >
                                        {!isLoading &&
                                            tagData &&
                                            tagData.tags.map((t) => {
                                                return (
                                                    <MenuItem
                                                        key={t.id}
                                                        value={t.id}
                                                    >
                                                        {t.tagType}
                                                    </MenuItem>
                                                );
                                            })}
                                    </Select>
                                </FormControl>
                            </Grid>

                            {groupToggler == 'Practical' ? (
                                <Grid item xs={12}>
                                    <FormControl
                                        style={{ width: '552px' }}
                                        variant='outlined'
                                        className={classes.formControl}
                                    >
                                        <InputLabel id='demo-simple-select-outlined-label'>
                                            Student Sub Group
                                        </InputLabel>
                                        <Select
                                            labelId='demo-simple-select-outlined-label'
                                            id='demo-simple-select-outlined'
                                            value={subGroup}
                                            onChange={onChangeHandler(
                                                'subGroup'
                                            )}
                                            label='subGroup'
                                        >
                                            {!isLoading &&
                                                studentData &&
                                                studentData.students.map(
                                                    (s) => {
                                                        return (
                                                            <MenuItem
                                                                key={s.id}
                                                                value={s.id}
                                                            >
                                                                {s.academicYearSem +
                                                                    ' (' +
                                                                    s.programme +
                                                                    ') ' +
                                                                    s.groupNumber +
                                                                    '.' +
                                                                    s.subGroupNumber}
                                                            </MenuItem>
                                                        );
                                                    }
                                                )}
                                        </Select>
                                    </FormControl>
                                </Grid>
                            ) : null}

                            {groupToggler == 'Lecture' ? (
                                <Grid item xs={12}>
                                    <FormControl
                                        style={{ width: '552px' }}
                                        variant='outlined'
                                        className={classes.formControl}
                                    >
                                        <InputLabel id='demo-simple-select-outlined-label'>
                                            Student Main Group
                                        </InputLabel>
                                        <Select
                                            labelId='demo-simple-select-outlined-label'
                                            id='demo-simple-select-outlined'
                                            value={studentGroup}
                                            onChange={onChangeHandler(
                                                'studentGroup'
                                            )}
                                            label='studentGroup'
                                        >
                                            {!isLoading &&
                                                groupData &&
                                                groupData.students.map((s) => {
                                                    return (
                                                        <MenuItem
                                                            key={s.id}
                                                            value={s.id}
                                                        >
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
                                </Grid>
                            ) : null}
                            {groupToggler == 'Tutorial' ? (
                                <Grid item xs={12}>
                                    <FormControl
                                        style={{ width: '552px' }}
                                        variant='outlined'
                                        className={classes.formControl}
                                    >
                                        <InputLabel id='demo-simple-select-outlined-label'>
                                            Student Main Group
                                        </InputLabel>
                                        <Select
                                            labelId='demo-simple-select-outlined-label'
                                            id='demo-simple-select-outlined'
                                            value={studentGroup}
                                            onChange={onChangeHandler(
                                                'studentGroup'
                                            )}
                                            label='studentGroup'
                                        >
                                            {!isLoading &&
                                                groupData &&
                                                groupData.students.map((s) => {
                                                    return (
                                                        <MenuItem
                                                            key={s.id}
                                                            value={s.id}
                                                        >
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
                                </Grid>
                            ) : null}

                            <Grid item xs={12}>
                                <FormControl
                                    style={{ width: '552px' }}
                                    variant='outlined'
                                    className={classes.formControl}
                                >
                                    <InputLabel id='demo-simple-select-outlined-label'>
                                        Subject
                                    </InputLabel>
                                    <Select
                                        labelId='demo-simple-select-outlined-label'
                                        id='demo-simple-select-outlined'
                                        value={subject}
                                        onChange={onChangeHandler('subject')}
                                        label='subject'
                                    >
                                        {!isLoading &&
                                            subjectData &&
                                            subjectData.subjects.map((s) => {
                                                return (
                                                    <MenuItem
                                                        key={s.id}
                                                        value={s.id}
                                                    >
                                                        {s.subjectName}
                                                    </MenuItem>
                                                );
                                            })}
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12}>
                                <FormControl
                                    style={{ width: '552px' }}
                                    variant='outlined'
                                    className={classes.formControl}
                                >
                                    <InputLabel id='demo-simple-select-outlined-label'>
                                        Student Count
                                    </InputLabel>
                                    <Select
                                        labelId='demo-simple-select-outlined-label'
                                        id='demo-simple-select-outlined'
                                        value={studentCount}
                                        onChange={onChangeHandler(
                                            'studentCount'
                                        )}
                                        label='student Count'
                                    >
                                        <MenuItem value=''>
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={60}>60</MenuItem>
                                        <MenuItem value={120}>120</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            {/* Time picker====================================
               <Grid item xs={12}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardTimePicker
                    margin="normal"
                    inputVariant="outlined"
                    id="time-picker"
                    label="Time picker"
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                      "aria-label": "change time",
                    }}
                    fullWidth
                  ></KeyboardTimePicker>
                </MuiPickersUtilsProvider>
              </Grid>=========================================== */}

                            <Grid item xs={12}>
                                <FormControl
                                    style={{ width: '552px' }}
                                    variant='outlined'
                                    className={classes.formControl}
                                >
                                    <InputLabel id='demo-simple-select-outlined-label'>
                                        Duration
                                    </InputLabel>
                                    <Select
                                        labelId='demo-simple-select-outlined-label'
                                        id='demo-simple-select-outlined'
                                        value={duration}
                                        onChange={onChangeHandler('duration')}
                                        label='duration'
                                    >
                                        <MenuItem value=''>
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={1}>1</MenuItem>
                                        <MenuItem value={2}>2</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>

                        <div className={classes.buttons}>
                            <Button
                                type='submit'
                                variant='contained'
                                color='primary'
                                className={classes.button}
                            >
                                Submit
                            </Button>
                        </div>
                    </form>
                </Paper>
            </main>
        </React.Fragment>
    );
};
export default AddSession;
