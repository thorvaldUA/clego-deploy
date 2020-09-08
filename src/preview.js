import React from "react";

import {conceptsAOA, conceptsSHA} from "./data";
import {Draggable, Droppable} from "react-beautiful-dnd";
import {Concept} from "./concept";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

export class Preview extends React.Component {

    seeConnections(i) {
        this.props.seeConnections(i)
    }

    exportPin(data) {
        this.props.exportPin(data)
    }

    exportChildren(data) {
        this.props.exportChildren(data)
    }

    clearPreview() {
        this.props.clearPreview()
    }

    render() {
        let children = this.props.itemOrder
        let clausesIds = this.props.itemOrder.map(a => a.id)


        let clausesToExport = clausesIds.map(name =>
            conceptsAOA.find(x => x.id === name))

        // --- Find indexes of exported pins in conceptsAOA --- //

        // let clausesIds = this.props.itemOrder.map(a => a.id)
        // let clauses = clausesIds.map(name => conceptsAOA.findIndex(x => x.id === name))

        return (<>

                <Droppable droppableId="droppable-1" type="PERSON">
                    {(provided, snapshot) => (

                        <div
                            className={this.props.className}
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >

                            <Paper>

                                <div className={'paneHeader'}>


                                    <h1>Preview</h1>
                                    <Button onClick={() => this.clearPreview()}>Clear preview</Button>

                            </div>

                            </Paper>
                            <div className="preview-container">

                                <a href="#clausesPreview"
                                   id={'pinsPreview'}
                                   className={'a-preview'}>
                                    Pins
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

                                                            openModal={() => this.props.openModal(data.id, data.name)}
                                                            onClick={() => this.exportPin(data)}
                                                            exportChildren={() => this.exportChildren(data)}
                                                            seeConnections={() => this.seeConnections(data)}
                                                            clause={data.text}

                                                            key={data.id}
                                                            id={data.id}
                                                            name={data.name}
                                                            type={data.type}


                                                            isSelected={
                                                                this.props.itemOrder.find(a => a.id === data.id)
                                                            }
                                                            currentScreen={this.props.currentScreen}

                                                            isChildOf={data.isChildOf}
                                                            concepts={this.props.concepts}

                                                        />
                                                    </div>

                                                </div>
                                            )}
                                        </Draggable>


                                    );
                                })}
                                {provided.placeholder}


                            </div>

                            <div className="preview-container">

                                <a href="#pinsPreview"
                                   id={'clausesPreview'}
                                   className={'a-preview'}>
                                    Clauses
                                </a>

                                {clausesToExport.map(data => {
                                        return (
                                            <>
                                            <h3>{data.name}</h3><br/>
                                                <small>{data.document}</small><br/>
                                            <div dangerouslySetInnerHTML={
                                                {
                                                    __html: data.text
                                                }
                                            }
                                                 key={data.id}
                                            ></div>

                                            </>
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

}