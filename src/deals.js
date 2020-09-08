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
        aoa: true,
        sha: false
    });

    useEffect(() => {
        switchDocs(state.aoa, state.sha)
    }
        , [state]);


    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked }
        );
    };



    function switchDocs(doc1, doc2) {
        props.switchDocs(doc1, doc2)
    }




        return (

            <>

                <div className={props.className}>

                    <Paper>

                    <div className={'paneHeader'}>
                    <h1>Deals</h1>
                    </div>

                    </Paper>

                    <br/>

                    <FormControl component="fieldset">


                    <FormGroup>
                        <FormControlLabel
                            control={<Switch checked={state.aoa} onChange={handleChange} name="aoa" />}
                            label="Articles of association"
                        />
                        <br/>
                        <FormControlLabel
                            control={<Switch checked={state.sha} onChange={handleChange} name="sha" />}
                            label="Shareholders agreeement"
                        />
                    </FormGroup>
                    <FormHelperText>Be careful</FormHelperText>
                </FormControl>


                    {/*<Button*/}

                    {/*    onClick={() => props.switchDeals()}>*/}
                    {/*    <DescriptionIcon/>*/}
                    {/*    Switch deals*/}


                    {/*</Button>*/}

                </div>

            </>
        )


}