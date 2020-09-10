import React from "react";

import {conceptsAOA, conceptsSHA} from "./data";
import {Draggable, Droppable} from "react-beautiful-dnd";
import {Concept} from "./concept";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

import ClearIcon from '@material-ui/icons/Clear';



export function Preview (props) {

    function seeConnections(i) {
        props.seeConnections(i)
    }

    function exportPin(data) {
        props.exportPin(data)
    }

    function exportChildren(data) {
        props.exportChildren(data)
    }

    function clearPreview() {
        props.clearPreview()
    }


        let children = props.itemOrder
        let clausesIds = props.itemOrder.map(a => a.id)

        let clausesToExport = clausesIds.map(name => props.concepts.find(x => x.id === name))

        // --- Find indexes of exported pins in conceptsAOA --- //

        // let clausesIds = props.itemOrder.map(a => a.id)
        // let clauses = clausesIds.map(name => conceptsAOA.findIndex(x => x.id === name))


        return (<>

                <Droppable droppableId="droppable-1" type="PERSON">
                    {(provided, snapshot) => (

                        <div
                            className={props.className}
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >

                            <Paper square variant={"outlined"}>

                                <div className={'paneHeader'}>


                                    <h1>Preview</h1>
                                    <Button variant='outlined' color='primary' onClick={() => clearPreview()}
                                    startIcon={<ClearIcon/>}

                                            disabled=
                                                {children.length > 0 ?
                                                    false:
                                                    true
                                                }

                                    >Clear preview</Button>

                            </div>

                            </Paper>
                            <div className="preview-container">

                                <a href="#clausesPreview"
                                   id={'pinsPreview'}
                                   className={'a-preview'}>
                                    <h2>Pins</h2>
                                </a>

                                {children.map((data, index) => {
                                    return (

                                        <Draggable draggableId={data.id} index={index} key={data.id}>
                                            {(provided, snapshot) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                >

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
                                                                props.itemOrder.find(a => a.id === data.id)
                                                            }
                                                            currentScreen={props.currentScreen}

                                                            isChildOf={data.isChildOf}
                                                            concepts={props.concepts}

                                                        />
                                                    </div>

                                                </div>
                                            )}
                                        </Draggable>


                                    );
                                })}
                                {provided.placeholder}


                            </div>

                            <div className="preview-container clauses">

                                <a href="#pinsPreview" id={'clausesPreview'}>
                                    <h2>Clauses</h2>
                                </a>





                                {clausesToExport.map(data => {
                                        return (
                                            <div className={'clausesBlock'}
                                                 href={"#" + data.id}

                                                     >

                                            <h3>{data.name}</h3>
                                            <div className={'doc'}>{data.document}</div>

                                            <div dangerouslySetInnerHTML={
                                                {
                                                    __html: data.text
                                                }
                                            }
                                                 key={data.id}
                                            ></div>

                                            </div>
                                        )
                                    }
                                )}


                            </div>


                        </div>

                    )}
                </Droppable>
            </>
        );




}