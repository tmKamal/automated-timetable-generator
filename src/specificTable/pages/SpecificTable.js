import React from 'react';
import { useParams } from 'react-router-dom';
import {
    withStyles,
    makeStyles,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Button
} from '@material-ui/core';

import SearchBar from '../../shared/component/searchbar/SearchBar';
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

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('8.30', 'sample data', 'sample data', '-', 'sample data'),
    createData('9.30 ', 'sample data', 'sample data', '-', 'sample data'),
    createData('10.30', '-', 'sample data', 'sample data', '-'),
    createData('11.30', '-', 'sample data', 'sample data', '-'),
    createData('12.30', '-', '-', 'sample data', 'sample data'),
    createData('01.30', '-', '-', 'sample data', 'sample data'),
    createData('02.30', 'sample data', '-', 'sample data', 'sample data'),
    createData('03.30', 'sample data', '-', 'sample data', 'sample data'),
    createData('04.30', 'sample data', '-', 'sample data', 'sample data')
];

const useStyles = makeStyles({
    table: {
        minWidth: 700
    }
});

const SpecificTable = () => {
    const { id } = useParams();
    const classes = useStyles();
    const [value, setValue] = React.useState();

    React.useEffect(() => {
        if (id == 'hall') {
            setValue(hallData);
        } else if (id == 'student-group') {
            setValue(studentData);
        } else {
            setValue(lectureData);
        }
    }, [id]);

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
                {id == 'full' ? 'Timetable' : `Timetable for specific ${id}`}
            </Typography>

            {id === 'full' ? (
                ''
            ) : (
                <Typography
                    style={{ marginBottom: '30px', marginLeft: '30%' }}
                    component='h1'
                    variant='h4'
                    align='center'
                >
                    <SearchBar opt={value} options={value}></SearchBar>
                </Typography>
            )}

            <Table className={classes.table} aria-label='customized table'>
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Time table</StyledTableCell>
                        <StyledTableCell align='left'>Monday</StyledTableCell>
                        <StyledTableCell align='left'>Tuesday</StyledTableCell>
                        <StyledTableCell align='left'>
                            Wednesday
                        </StyledTableCell>
                        <StyledTableCell align='left'>Thursday</StyledTableCell>
                        <StyledTableCell align='left'>Friday</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <StyledTableRow key={row.name}>
                            <StyledTableCell>{row.name}</StyledTableCell>
                            <StyledTableCell align='left'>
                                {row.calories}
                            </StyledTableCell>
                            <StyledTableCell align='left'>
                                {row.fat}
                            </StyledTableCell>
                            <StyledTableCell align='left'>
                                {row.carbs}
                            </StyledTableCell>
                            <StyledTableCell align='left'>
                                {row.protein}
                            </StyledTableCell>
                            <StyledTableCell align='left'>
                                {row.protein}
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>

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
export default SpecificTable;
