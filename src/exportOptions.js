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

export function ExportOptions(props){

    const [value, setValue] = React.useState('pdf');

    const handleChange = (event) => {
        setValue(event.target.value);
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
                        <TextField color="primary" className={'textFieldExport'} label="Clego user"/>
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
                    <Button variant='contained' style={{background:"blue",color:"white"}}>Send the doc</Button>
                </FormControl>

                </div>







            </div>
        )


}