import React from "react";
import {Button} from "@material-ui/core";
import DescriptionIcon from "@material-ui/icons/Description";
import {Concept} from "./concept";

export class Pins extends React.Component {

    constructor(props) {
        super(props)
        this.conceptClicked = this.conceptClicked.bind(this)
    }

    conceptClicked(id) {
        this.props.conceptClicked(id)
    }

    pinChildren(name, children) {
        this.props.pinChildren(name, children)
    }

    switchScreens() {
        this.props.switchScreens()
    }

    seeConnections(i) {
        this.props.seeConnections(i)
    }

    exportPin(data) {
        this.props.exportPin(data)
    }

    exportChildren(data) {
        this.props.exportChildren(data)
    }

    render() {

        if (this.props.currentScreen === 'main') {

            return (
                <div
                    className={this.props.className}


                >
                    <h1>Pins</h1><br/>

                    <Button
                        onClick={() => this.props.switchScreens('export')}>
                        <DescriptionIcon/>
                        To export
                    </Button>


                    {/*<button onClick={()=>this.props.switchScreens('export')}>To export</button>*/}

                    <div className={"column-container"}>


                        {this.props.pins.map((data) => {
                            return (


                                <div key={data.id}>

                                    <Concept


                                        openModal={() => this.props.openModal(data.id, data.name)}
                                        onClick={() => this.conceptClicked(data)}
                                        pinChildren={() => this.pinChildren(data)}
                                        seeConnections={() => this.seeConnections(data)}
                                        clause={data.text}

                                        key={data.id}
                                        id={data.id}
                                        name={data.name}
                                        type={data.type}
                                        isSelected={
                                            this.props.pins.find(a => a.id === data.id)
                                        }
                                        comment={data.comments}
                                        currentScreen={this.props.currentScreen}

                                        isChildOf={data.isChildOf}
                                        concepts={this.props.concepts}
                                        hasParent={false}

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
                    className={this.props.className}


                >

                    <h1>Pins</h1><br/>


                    <button onClick={() => this.props.switchScreens('main')}>Back to connections</button>
                    <div className={"column-container"}>

                        {this.props.pins.map((data) => {
                            return (


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
                                            this.props.toExport.find(a => a.id === data.id)
                                        }
                                        comment={data.comments}
                                        currentScreen={this.props.currentScreen}

                                        isChildOf={data.isChildOf}
                                        concepts={this.props.concepts}
                                        hasParent={false}

                                    />
                                </div>
                            )
                        })}

                    </div>

                </div>
            )

        }
    }

}