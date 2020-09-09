import React from "react";
import {Button} from "@material-ui/core";
import {Concept} from "./concept";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';


export function Pins (props){

    function conceptClicked(id) {
        props.conceptClicked(id)
    }

    function pinChildren(name, children) {
        props.pinChildren(name, children)
    }

    function seeConnections(i) {
        props.seeConnections(i)
    }

    function exportPin(data) {
        props.exportPin(data)
    }

    function exportChildren(data) {
        props.exportChildren(data)
    }

    if (props.currentScreen === 'main') {

            return (
                <div className={props.className}>

                    <Paper square variant={"outlined"}>

                    <div className={'paneHeader'}>

                    <h1>Pins</h1>

                    <Button variant='contained' color='primary' onClick={() => props.switchScreens('export')}>Export pins</Button>

                    </div>

                    </Paper>

                    <div className={"column-container"}>

                        {props.pins.map((data) => {
                            return (


                                <div key={data.id}>

                                    <Concept


                                        openModal={() => props.openModal(data.id, data.name)}
                                        onClick={() => conceptClicked(data)}
                                        pinChildren={() => pinChildren(data)}
                                        seeConnections={() => seeConnections(data)}
                                        clause={data.text}

                                        key={data.id}
                                        id={data.id}
                                        name={data.name}
                                        type={data.type}
                                        isSelected={
                                            props.pins.find(a => a.id === data.id)
                                        }
                                        comment={data.comments}
                                        currentScreen={props.currentScreen}

                                        isChildOf={data.isChildOf}
                                        concepts={props.concepts}

                                    />
                                </div>
                            )
                        })}

                    </div>

                </div>
            )

        } else {


            return (
                <div
                    className={props.className}
                >
                    <Paper square variant={"outlined"}>






                        <div className={'paneHeader'}>

                            <IconButton aria-controls="simple-menu" aria-haspopup="true"
                                                                  onClick={() => props.switchScreens('main')}
                                                                  fontSize="small"
                                                                  className={'goBack'}>
                                <ArrowBackIcon />
                            </IconButton>

                        <h1 className={'panePaddingLeft'}>Pins</h1>


                            <Button variant='contained' color='primary' onClick={props.exportAll}>Export all</Button>

                        </div>



                    </Paper>


                    <div className={"column-container"}>

                        {props.pins.map((data) => {
                            return (


                                <div key={data.id}>

                                    <Concept
                                        openModal={() => props.openModal(data.id, data.name)}
                                        onClick={() => exportPin(data)}
                                        exportChildren={() => exportChildren(data)}
                                        seeConnections={() => seeConnections(data)}
                                        clause={data.text}

                                        key={data.id}
                                        id={data.id}
                                        name={data.name}
                                        type={data.type}
                                        isSelected={
                                            props.toExport.find(a => a.id === data.id)
                                        }
                                        comment={data.comments}
                                        currentScreen={props.currentScreen}

                                        isChildOf={data.isChildOf}
                                        concepts={props.concepts}

                                    />
                                </div>
                            )
                        })}

                    </div>

                </div>
            )

        }


}