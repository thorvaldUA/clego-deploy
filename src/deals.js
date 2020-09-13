import React, {useEffect} from "react";
import {Button} from "@material-ui/core";
import {Switch} from "@material-ui/core";
import DescriptionIcon from "@material-ui/icons/Description";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Paper from "@material-ui/core/Paper";



export function Deals(props){

    const [state, setState] = React.useState({
        doc: "aoa"
        // aoa: true,
        // sha: false,
        // merge: false,
        // sha2: false

    });

    useEffect(() => {
        switchDocs(state.doc)
    }
        , [state]);


    const handleChange = (event) => {
        // setState({ ...state, [event.target.name]: event.target.checked })
        setState({doc:event.target.name})
        ;
    };



    function switchDocs(step) {
        props.switchDocs(step)
    }

        return (

            <>

                <div className={props.className}>

                    <Paper square variant={"outlined"}>

                    <div className={'paneHeader'}>
                    <h1>Deals</h1>

                    </div>

                    </Paper>

                    <div className={'deals-container'}>


                    <FormControl component="fieldset">


                    <FormGroup>
                        <FormControlLabel
                            control={<Switch checked={state.doc === 'aoa'} onChange={handleChange} name="aoa"
                                             color="primary"/>}
                            label="Articles of association"


                        />
                        <br/>
                        <FormControlLabel
                            control={<Switch checked={state.doc === 'sha'} onChange={handleChange} name="sha"
                                             color="primary"/>}
                            label="ShA 1"
                            color="secondary"

                        />
                        <br/>
                        <FormControlLabel
                            control={<Switch checked={state.doc === 'merge'} onChange={handleChange} name="merge"
                                             color="primary"/>}
                            label="Merged AOA + ShA 1"
                            color="secondary"

                        />
                        <br/>
                        <FormControlLabel
                            control={<Switch checked={state.doc === 'sha2'} onChange={handleChange} name="sha2"
                                             color="primary"/>}
                            label="ShA 2"
                            color="secondary"

                        />
                    </FormGroup>

                </FormControl>

                    </div>



                </div>

            </>
        )


}