import React from "react";
import "./main.css";

import {conceptsAOA, conceptsSHA} from "./data";
import {DragDropContext} from 'react-beautiful-dnd';
import {Preview} from "./preview";
import {ExportOptions} from "./exportOptions";
import {LightBox} from "./lightBox";
import {Deals} from "./deals";
import {Connections} from "./connections";
import {Highlights} from "./highlights";
import {Pins} from "./pins";

export class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            currentScreen: 'main',
            history:['most-common'],

            concepts: conceptsAOA,
            pins: [],
            toExport: [],

            conceptGroup: 'most-common',

            showModal: false,
            clauseId: '',
            clauseName: '',

            itemOrder: [],
            parent:[]
        }

        this.conceptClicked = this.conceptClicked.bind(this)
        this.pinChildren = this.pinChildren.bind(this)
        this.seeConnections = this.seeConnections.bind(this)
        this.goBack = this.goBack.bind(this)

        this.closeModal = this.closeModal.bind(this)
        this.openModal = this.openModal.bind(this)

        this.switchScreens = this.switchScreens.bind(this)
        this.switchDocs = this.switchDocs.bind(this)

        this.onDragEnd = this.onDragEnd.bind(this);

        this.exportPin = this.exportPin.bind(this)
        this.exportChildren = this.exportChildren.bind(this)

        this.clearPreview = this.clearPreview.bind(this)

        this.exportAll = this.exportAll.bind(this)
    }

    openModal(id, name) {
        this.setState({
            clauseId: id,
            clauseName: name,
            showModal: true
        })

    }

    closeModal() {
        this.setState({showModal: false})
    }

    pinChildren(i) {
        const pins = this.state.pins.slice();
        const pinIndex = this.state.pins.findIndex(a => a.id === i.id)
        const parentIndex = this.state.parent.findIndex(a => a.id === i.id)

        let myName = i.name.replace(/\s+/g, '-').toLowerCase();
        let childrenObj = this.state.concepts.filter(a => a.isChildOf.includes(myName));
        let joined = pins.concat(i, childrenObj)

        let joinedIds = joined.map(a => a.id);
        let childrenIncluded = this.state.concepts.filter(f => joinedIds.includes(f.id));


        let parent = this.state.parent.slice();

        if (pinIndex === -1) {
            pins.push(i)
            parent.push(i)

        } else {
            pins.splice(pinIndex, 1)
            parent.splice(parentIndex, 1)
        }

        this.setState(prevState => ({
            pins: joined,
            parent: parent
        }))
    }



    seeConnections(i){
        let myName = i.name.replace(/\s+/g, '-').toLowerCase();

        let newHistory = this.state.history.slice()
        newHistory.push(myName)

        this.setState(prevState=>({
            conceptGroup:myName,
            history: newHistory
        }))

    }

    goBack(){
        let newHistory = this.state.history.slice()
        let prevStep = this.state.history[this.state.history.length - 2]

        if(newHistory.length > 1) {
            newHistory.pop()

        this.setState(prevState=>({
            conceptGroup: prevStep,
            history: newHistory
        }))

        } else {}

    }

    conceptClicked(i){
        const pins = this.state.pins.slice()
        const pinIndex = this.state.pins.findIndex(a => a.id === i.id)

        pinIndex === -1 ?
            pins.push(i)
            : pins.splice(pinIndex, 1)

        this.setState({
            pins: pins
        });

    }

    exportPin(i){

        let toExport = this.state.toExport.slice()
        let toExportIndex = this.state.toExport.findIndex(a => a.id === i.id)

        toExportIndex === -1 ?
            toExport.push(i)
            : toExport.splice(toExportIndex, 1)

        this.setState({
            toExport: toExport,
            itemOrder: toExport
            })


        }

    exportChildren(i){

        let toExport = this.state.toExport.slice();
        let pinIndex = this.state.toExport.findIndex(a => a.id === i.id)

        let myName = i.name.replace(/\s+/g, '-').toLowerCase();
        let childrenObj = this.state.concepts.filter(a=>a.isChildOf.includes(myName));
        let joined = toExport.concat(i, childrenObj)

        if(pinIndex === -1) {
            toExport.push(i)

            this.setState(prevState=>({
                toExport:joined,
                itemOrder:joined

            }))

        } else {
            toExport.splice(pinIndex, 1)
        }
  }

  exportAll(){

      let toExport = this.state.toExport.slice()

      toExport = this.state.pins

      this.setState({
          toExport: toExport,
          itemOrder: toExport
      })

  }

    switchScreens(){

        this.state.currentScreen ==='main' ?
        this.setState({
            currentScreen:'export'
        }) : this.setState({currentScreen:'main'})
    }

    switchDocs(doc1, doc2) {

        let newConcepts = this.state.concepts

        let AOA = conceptsAOA
        let SHA = conceptsSHA

        if (doc1 && doc2) {
            newConcepts = AOA.concat(SHA)

        }
        else if (doc1 && !doc2) {
            newConcepts = AOA

        }
        else if (!doc1 && doc2) {
            newConcepts = SHA
        }
        else{
            newConcepts = []
        }

        this.setState({
            concepts: newConcepts
        })
    }


    clearPreview(){
        this.setState(prevState=>({toExport:[], itemOrder: []}))

    }

    /*Drag&Drop*/

    onBeforeCapture = () => {
        /*...*/
    };

    onBeforeDragStart = () => {
        /*...*/
    };

    onDragStart = () => {
        /*...*/
    };
    onDragUpdate = () => {
        /*...*/
    };

    reorder (list, startIndex, endIndex){
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };

    onDragEnd(result) {

        if (!result.destination) {
            return;
        }

        let items = this.state.itemOrder

        let order = this.reorder(items, result.source.index,
            result.destination.index)

        this.setState({
            itemOrder: order
        });


    }

    /*Drag&DropEnd*/



    render() {

        let prevStep
        if (this.state.history.length > 1) {
            prevStep = this.state.history[this.state.history.length - 2]
            .replace(/-/g, " ").replace(/(^\w|\s\w)/g, m => m.toUpperCase())
        }
        else
        {prevStep = false}

        if (this.state.currentScreen === 'main')
            return(



                <DragDropContext
                    onBeforeCapture={this.onBeforeCapture}
                    onBeforeDragStart={this.onBeforeDragStart}
                    onDragStart={this.onDragStart}
                    onDragUpdate={this.onDragUpdate}
                    onDragEnd={this.onDragEnd}
                >



                <div className={'App'}>


                <LightBox
                    showModal={this.state.showModal}
                    closeModal={this.closeModal}
                    clauseId={this.state.clauseId}
                    clauseName={this.state.clauseName}
                    concepts={this.state.concepts}
                    clauses={this.state.clauses}
                />
                <Deals className={'pane deals'}

                       switchDocs={this.switchDocs}

                />


                <Connections
                    className={'pane connections'}

                    conceptClicked={this.conceptClicked}
                    addComment={this.addComment}
                    concepts={this.state.concepts}

                    conceptGroup={this.state.conceptGroup}
                    pinChildren={this.pinChildren}
                    seeConnections={this.seeConnections}

                    goBack={this.goBack}
                    prevStep={prevStep}

                    comment={this.state.comment}

                    pins={this.state.pins}

                    openModal={this.openModal}
                    itemOrder={this.state.itemOrder}

                    currentScreen={this.state.currentScreen}
                />


                <Highlights className={'pane highlights'}
                            concepts={this.state.concepts}
                            conceptGroup={this.state.conceptGroup}

                            pins={this.state.pins}
                            openModal={this.openModal}
                            conceptClicked={this.conceptClicked}
                            pinChildren={this.pinChildren}

                            seeConnections={this.seeConnections}
                            currentScreen={this.state.currentScreen}

                />


                <Pins className={'pane pins'}
                      conceptClicked={this.conceptClicked}

                      pinChildren={this.pinChildren}

                      pins={this.state.pins}

                      openModal={this.openModal}
                      switchScreens={this.switchScreens}
                      seeConnections={this.seeConnections}

                      currentScreen={this.state.currentScreen}
                      concepts={this.state.concepts}

                />





            </div>



                </DragDropContext>



                    );
            return(





                <div className={'App'}>

                <DragDropContext
                    onBeforeCapture={this.onBeforeCapture}
                    onBeforeDragStart={this.onBeforeDragStart}
                    onDragStart={this.onDragStart}
                    onDragUpdate={this.onDragUpdate}
                    onDragEnd={this.onDragEnd}
                >




            <LightBox
                showModal={this.state.showModal}
                closeModal={this.closeModal}
                clauseId={this.state.clauseId}
                clauseName={this.state.clauseName}
                concepts={this.state.concepts}
                clauses={this.state.clauses}
            />

            <Pins className={'pane pins'}
                  conceptClicked={this.conceptClicked}
                  concepts={this.state.concepts}

                  pins={this.state.pins}
                  pinChildren={this.pinChildren}

                  openModal={this.openModal}
                  switchScreens={this.switchScreens}

                  exportPin={this.exportPin}
                  exportChildren={this.exportChildren}

                  currentScreen={this.state.currentScreen}
                  toExport={this.state.toExport}
                  seeConnections={this.seeConnections}

                  exportAll={this.exportAll}



            />
            <Preview
                className={'pane preview'}

                conceptClicked={this.conceptClicked}
                addComment={this.addComment}

                conceptGroup={this.state.conceptGroup}
                pinChildren={this.pinChildren}
                seeConnections={this.seeConnections}

                goBack={this.goBack}

                comment={this.state.comment}

                pins={this.state.pins}

                openModal={this.openModal}
                itemOrder={this.state.itemOrder}
                currentScreen={this.state.currentScreen}

                exportPin={this.exportPin}
                exportChildren={this.exportChildren}

                toExport={this.state.toExport}
                clearPreview={this.clearPreview}
                concepts={this.state.concepts}
            />
            <ExportOptions className={'pane exportOptions'}/>



            </DragDropContext>

            </div>




                    )
    }
}

