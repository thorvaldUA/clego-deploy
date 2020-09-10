import React, {useEffect} from "react";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import TextField from "@material-ui/core/TextField";
import {Button, Checkbox, Switch} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import {createMuiTheme} from "@material-ui/core/styles";


import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        alignItems: 'center',
    },
    wrapper: {
        margin: theme.spacing(1),
        position: 'relative',
    },
    buttonSuccess: {
        backgroundColor: green[500],
        '&:hover': {
            backgroundColor: green[700],
        },
    },

    buttonProgress: {
        color: green[500],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12

    },
}));

export function ExportOptions(props){

    const [value, setValue] = React.useState('pdf');

    const handleChange = (event) => {
        setValue(event.target.value);
    };


    const classes = useStyles();
    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const timer = React.useRef();

    const buttonClassname = clsx({
        [classes.buttonSuccess]: success,
    });

    React.useEffect(() => {
        return () => {
            clearTimeout(timer.current);
        };
    }, []);

    const handleButtonClick = () => {
        if (!loading) {
            setSuccess(false);
            setLoading(true);
            timer.current = setTimeout(() => {
                setSuccess(true);
                setLoading(false);
            }, 2000);
        }
    };

    return (
            <div className={props.className}>

                <Paper square variant={"outlined"}>
                    <div className={'paneHeader'}>
                <h1>Export Options</h1>

                    </div>
                </Paper>

                <div className={'exportOptionsContainer'}>

                <FormControl component="fieldset">

                    <RadioGroup aria-label="sendAs" name="sendAs1" value={value} onChange={handleChange}>
                        <FormControlLabel value="pdf" control={<Radio color="primary" />} label="Send as PDF" />
                        <TextField color="primary" className={'textFieldExport'} label="Email"/>
                        <br/>
                        <FormControlLabel value="invite" control={<Radio color="primary" />} label="Send an invite" />
                        <TextField color="primary" className={'textFieldExport'} label="Clego user" disabled/>
                        <br/>

                    </RadioGroup>
                    <FormControlLabel
                        control={
                            <Checkbox
                                // checked={state.checkedB}
                                // onChange={handleChange}
                                name="checkedB"
                                color="primary"
                            />
                        }
                        label="Save copy to desktop"
                    />

                    <div className={classes.wrapper}>
                    <Button variant='contained' color='primary'
                            disabled={loading}
                            onClick={handleButtonClick}
                            className={buttonClassname}

                    >Send the doc</Button>

                    {loading && <CircularProgress size={24} className={classes.buttonProgress} />}

                    </div>


                </FormControl>

                </div>







            </div>
        )


}