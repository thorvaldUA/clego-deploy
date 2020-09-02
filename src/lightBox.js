import React from "react";

import {Button} from "@material-ui/core";

//1123

import {pinData1, pinData2} from "./data";

export class LightBox extends React.Component {

    constructor(props) {
        super(props)
        this.state = {}
    }

    closeModal() {
        this.props.closeModal()
    }

    render() {
        const iClause = this.props.concepts.filter(a => a.id === this.props.clauseId)

        return (
            <div
                className={this.props.showModal ? 'lightBox-visible' : 'lightBox-hidden'}
            >

                <br/>
                <div className={'lightBox-contents'}

                >
                    {iClause.map((data) => {
                        return (

                            <div key={data.id}>
                                <h1>{data.name} <br/><small>{data.document}</small></h1>
                                <div
                                    dangerouslySetInnerHTML={
                                        {__html: data.text}}
                                >
                                </div>
                            </div>
                        );
                    })}

                    <Button
                        color="primary"
                        variant="contained"
                        onClick={(e) => {this.closeModal(e)}}>
                        Close me
                    </Button>
                    <br/>

                </div>

            </div>

        )
    }
}