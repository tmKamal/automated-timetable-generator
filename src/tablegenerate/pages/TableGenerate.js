import React from 'react';
import Button from '@material-ui/core/Button';
import {useHistory} from 'react-router-dom';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles, Paper, Typography } from '@material-ui/core';

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
        padding: '0 30px'
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
    const history = useHistory()
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
                    <Button onClick={()=> history.push('/specific-table/full')} className={classes.generateButton}>
                        View Timetable
                    </Button>
                    <Button className={classes.generateButton}
                    onClick={()=> history.push('/specific-table/lecturer')}>
                        lecturer's timetable
                    </Button>
                    <Button className={classes.generateButton}
                    onClick={()=> history.push('/specific-table/student-group')}>
                        Student group's timetable
                    </Button>

                    <Button className={classes.generateButton}
                    onClick={()=> history.push('/specific-table/hall')}>
                        lecture hall's timetable
                    </Button>
                    <Button className={classes.generateButton}
                    >
                        Print timetable
                    </Button>
                </ButtonGroup>
            </Paper>
        </div>
    );
};
export default TableGenerate;
