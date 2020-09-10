import React from "react";
import {Button} from "@material-ui/core";
import {conceptsAOA, conceptsSHA} from "./data";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import IconButton from "@material-ui/core/IconButton";

export function LightBox (props) {

    function closeModal() {
        props.closeModal()
    }

    const iClauseObj = props.concepts.find(a => a.id === props.clauseId)

    if(iClauseObj){
        return (
            <div className={props.showModal ? 'lightBox-visible' : 'lightBox-hidden'}>

                <div className={'lightBox-contents'}>

                    <div className={'lightBox-header'}>
                        <IconButton aria-controls="simple-menu" aria-haspopup="true"
                                    onClick={(e) => {closeModal(e)}}
                                    fontSize="small"
                                    className={'goBack'}
                        >
                            <ArrowBackIcon />
                        </IconButton>

                        <h1 className={'panePaddingLeft'}>{iClauseObj.name} <br/><small>{iClauseObj.document}</small></h1>

                    </div>


                    <div
                        dangerouslySetInnerHTML={
                            {__html: iClauseObj.text}}
                    >
                    </div>

                    <Button
                        color="primary"
                        variant="outlined"
                        onClick={(e) => {closeModal(e)}}

                    >

                        Back to {props.currentScreen}

                    </Button>
                    <br/>

                </div>

            </div>

        )
    }else{return(null)}

}