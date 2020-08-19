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
    createData('8.30', 'DMS(Lecture)', 6.0, 24, 4.0),
    createData('9.30 ', 237, 9.0, 37, 4.3),
    createData('10.30', 262, 16.0, 24, 6.0),
    createData('11.30', 305, 3.7, 67, 4.3),
    createData('12.30', 356, 16.0, 49, 3.9),
    createData('01.30', 356, 16.0, 49, 3.9),
    createData('02.30', 356, 16.0, 49, 3.9),
    createData('03.30', 356, 16.0, 49, 3.9),
    createData('04.30', 356, 16.0, 49, 3.9)
];

const useStyles = makeStyles({
    table: {
        minWidth: 700
    }
});

const SpecificTable = () => {
    const { id } = useParams();
    const classes = useStyles();
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
            >
                Print Time table1
            </Button>
        </TableContainer>
    );
};
export default SpecificTable;
