//15:24

import React from "react";
import {Concept} from "./concept";
import Paper from '@material-ui/core/Paper';

export function Connections (props){

    let amount = []

    function conceptClicked(id) {
        props.conceptClicked(id)
    }

    function seeConnections(i) {
        props.seeConnections(i)
    }

    function pinChildren(name, children) {
        props.pinChildren(name, children)
    }

    function goBack() {
        props.goBack()
    }

    function conceptAmount(totalAmount){amount.push(totalAmount)}

    let conceptsL1 = props.concepts.filter(a => a.isChildOf.includes(props.conceptGroup));

    let conceptGroupNoDashes = props.conceptGroup.replace(/-/g, " ");

    let conceptGroupCaps = conceptGroupNoDashes.replace(/(^\w|\s\w)/g, m => m.toUpperCase());

    let concepts = props.concepts


    return (
        <div className={props.className}>

            <Paper square variant={"outlined"}>

                <div className={"paneHeader"}>

                    <h1>Connections</h1>

                    <div className={"conceptGroup"}>

                        {props.prevStep ? <a className={'goBack'} onClick={() => goBack()}>Back to {props.prevStep}</a> :
                            null
                        }
                        <h3>{conceptGroupCaps}</h3>

                    </div>
                </div>
            </Paper>




            <div className="connections-container">

                {conceptsL1.map((data) => {

                    let myName = data.name.replace(/\s+/g, '-').toLowerCase();
                    let myIndex = conceptsL1.findIndex(x => x.name === data.name);
                    let conceptsL2 = concepts.filter(a => a.isChildOf.includes(myName));

                    let conceptsL2Names = conceptsL2.map(a => a.name.replace(/\s+/g, '-').toLowerCase())

                    let conceptsL3 = conceptsL2Names.map(name => props.concepts
                        .filter(x => x.isChildOf === name))

                    let Children = conceptsL3.length
                    let GrandChildren = 0

                    for (let i = 0; i < conceptsL3.length; i++) {
                        GrandChildren = GrandChildren + conceptsL3[i].length
                    }

                    let totalAmount = GrandChildren + Children

                    //Find array with array
                    //let result = namesL1.map(name => props.concepts.find(x => x.name == name))

                    return (<div key={data.id}>

                            <div >

                                <Concept

                                    onClick={() => conceptClicked(data)}
                                    openModal={() => props.openModal(data.id, data.name)}
                                    pinChildren={() => pinChildren(data)}
                                    seeConnections={() => seeConnections(data)}
                                    currentScreen={props.currentScreen}

                                    conceptAmount ={conceptAmount(totalAmount)}

                                    key={data.id}
                                    id={data.id}
                                    name={data.name}
                                    type={data.type}
                                    isChildOf={data.isChildOf}
                                    concepts={props.concepts}
                                    clause={data.text}

                                    isSelected={
                                        props.pins.find(a => a.id === data.id)
                                    }

                                />
                            </div>

                            {conceptsL2.length > 0 ?

                                <div className={'wrapL1'}>

                                    <div className={'line'}
                                         style={
                                             {height: amount[myIndex] * 68}
                                         }
                                    ></div>

                                    <div className={'conceptChildren'}>

                                        {conceptsL2.map((data) => {

                                            let myNameLvl2 = data.name.replace(/\s+/g, '-').toLowerCase();
                                            let conceptsL3 = concepts.filter(a => a.isChildOf.includes(myNameLvl2));

                                            return (<div key={data.id} >

                                                    <div className={"wrapChild"}>
                                                        <div className={'arrow' + ' ' + data.type + 'Arrow'}>>>></div>
                                                        <Concept

                                                            onClick={() => conceptClicked(data)}
                                                            openModal={() => props.openModal(data.id, data.name)}
                                                            pinChildren={() => pinChildren(data)}
                                                            seeConnections={() => seeConnections(data)}
                                                            currentScreen={props.currentScreen}

                                                            conceptAmount ={() => conceptAmount(conceptsL2.length)}

                                                            key={data.id}
                                                            id={data.id}
                                                            name={data.name}
                                                            type={data.type}
                                                            isChildOf={data.isChildOf}
                                                            concepts={props.concepts}
                                                            clause={data.text}

                                                            isSelected={
                                                                props.pins.find(a => a.id === data.id)
                                                            }

                                                        />
                                                    </div>



                                                    {conceptsL3.length > 0 ?

                                                        <div className={'wrapL2'}>

                                                            <div className={'lineLvl2'}
                                                                 style={
                                                                     {height: conceptsL3.length * 68}
                                                                 }
                                                            ></div>

                                                            <div className={'conceptChildren'}>

                                                                {conceptsL3.map((data) => {

                                                                    return (<div key={data.id}>

                                                                            <div className={"wrapChild"}>
                                                                                <div className={'arrow' + ' ' + data.type + 'Arrow'}>>>></div>
                                                                                <Concept

                                                                                    onClick={() => conceptClicked(data)}
                                                                                    openModal={() => props.openModal(data.id, data.name)}
                                                                                    pinChildren={() => pinChildren(data)}
                                                                                    seeConnections={() => seeConnections(data)}
                                                                                    currentScreen={props.currentScreen}

                                                                                    key={data.id}
                                                                                    id={data.id}
                                                                                    name={data.name}
                                                                                    type={data.type}
                                                                                    isChildOf={data.isChildOf}
                                                                                    concepts={props.concepts}
                                                                                    clause={data.text}

                                                                                    isSelected={
                                                                                        props.pins.find(a => a.id === data.id)
                                                                                    }


                                                                                />
                                                                            </div>




                                                                        </div>


                                                                    );
                                                                })}

                                                            </div>
                                                        </div>



                                                        : null}


                                                </div>
                                            );
                                        })}



                                    </div>

                                </div>

                                : null
                            }


                        </div>


                    );
                })}


            </div>


        </div>
    );


}