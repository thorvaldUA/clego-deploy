import React from "react";


import BookmarkIcon from '@material-ui/icons/Bookmark';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';

import IconButton from '@material-ui/core/IconButton';
import ChatIcon from '@material-ui/icons/Chat';

import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import FormatIndentIncreaseIcon from '@material-ui/icons/FormatIndentIncrease';
import ReportIcon from '@material-ui/icons/Report';



import {Button, Menu, MenuItem} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import {Comment} from "@material-ui/icons";

export function Concept (props) {
        let pinSingle, childrenAction, pinChildren, status, pinIcon;

        let myName = props.name.replace(/\s+/g, '-').toLowerCase();
        let childrenObj = props.concepts.filter(a => a.isChildOf.includes(myName));
        let childrenNames = childrenObj.map(a => a.name)
        let childrenNamesJoined = childrenNames.join(', ')

    const pinIconStyle = {
            color: "black"
    }

        if (props.currentScreen === 'connections' && props.isSelected) {
            childrenAction = props.pinChildren
            pinSingle = "Unpin me"
            pinChildren = "Unpin children"
            pinIcon = <BookmarkIcon style={pinIconStyle}/>

        } else if (props.currentScreen === 'connections' && !props.isSelected) {
            childrenAction = props.pinChildren
            pinSingle = "Pin me"
            pinChildren = "Pin children"
            pinIcon = <BookmarkBorderIcon style={pinIconStyle}/>
        } else if (props.currentScreen === 'export' && props.isSelected) {
            childrenAction = props.exportChildren
            pinSingle = "Remove from export"
            pinChildren = "Remove children"
            pinIcon = <RemoveIcon style={pinIconStyle}/>

        } else if (props.currentScreen === 'export' && !props.isSelected) {
            childrenAction = props.exportChildren
            pinSingle = "Export me"
            pinChildren = "Export children"
            pinIcon = <AddIcon style={pinIconStyle}/>

        }

        if(props.isSelected){

        }

    //    Pin menu with material //

    function pinMenu(key) {
        if (key === "pinSingle") {

            props.onClick()
            handleClose()

        } else {
            childrenAction()
            handleClose()

        }
    }

    //Popover hint with material

        const [anchorEl, setAnchorEl] = React.useState(null);

        const handleClick = (event) => {
            setAnchorEl(event.currentTarget);
        };

        const handleClose = () => {
            setAnchorEl(null);

        };

        //hover action bar

    const [isMouseInside, setIsMouseInside] = React.useState(null);

    const mouseEnter = () => {
        setIsMouseInside(true);
    }

    const mouseLeave = () => {
        setIsMouseInside(null)
    }

    let conceptPinned

    if(props.isSelected)
        conceptPinned =

            <div className={props.name.length > 25 ?
                'conceptActionsLong' : "conceptActionsShort"
            }>

            <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} fontSize="small">{pinIcon}</IconButton></div>

    let pinAction

    if (props.currentScreen === 'connections' && childrenNames.length > 0) {
        pinAction = handleClick
    } else if (props.currentScreen === 'connections' && childrenNames.length === 0){
        pinAction = props.onClick
    } else if (props.currentScreen === 'export' && childrenNames.length > 0){
        pinAction = handleClick
    } else if (props.currentScreen === 'export' && childrenNames.length === 0){
        pinAction = props.onClick
    }

    let seeClauseAction
        if (props.text !== "FALSE"){
            seeClauseAction = <IconButton onClick={() => props.openModal(props.id)} fontSize="small">
                <FormatListBulletedIcon />
            </IconButton>
        }else{
            seeClauseAction = null
        }

    let commentIcon
    commentIcon = <IconButton onClick={() => props.openModal(props.id)} fontSize="small">
        <ChatIcon />
    </IconButton>

    let typeIcon
    if (props.type === "conflict") {
        typeIcon = <ReportIcon
            style={{ color: 'white' }}
        />
    }else{
        typeIcon = <FormatIndentIncreaseIcon
            style={{ color: 'white' }}
        />
    }




    return (<>
            <div className={'conceptWrap'}
                 onMouseEnter={mouseEnter}
                 onMouseLeave={mouseLeave}
                 onLoad={props.conceptAmount}>

                {props.type === 'basic' ? null :

                    <div className=
                             {props.type === 'conflict'?
                                 "conceptIconWrap" + " " + "wrapRed" :
                                 "conceptIconWrap"
                             }


                         >
                        {typeIcon}
                    </div>
                }


            <div
                className=
                    {props.type === 'basic'?
                    'concept' + " " + props.type :
                    'concept' + " " + props.type + " " + "conceptPaddingLeft"
                    }


            >
                    <h3
                        className={childrenNamesJoined.length > 0 ? "" : "tooltip"}
                        onClick={childrenNames.length > 0 ?
                            () => props.seeConnections() : null
                        }
                    >

                        {props.name}

                        {childrenObj.length > 0 ?
                            <div className={'childrenBadge'}>
                                ({childrenObj.length})
                            </div> : null

                        }

                    </h3><br/>

            </div>

                {isMouseInside ?

                    <div className={props.name.length > 27 ?
                        'conceptActionsLong' : "conceptActionsShort"
                    }>

                        <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={pinAction} fontSize="small">
                            {pinIcon}
                        </IconButton>

                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={()=>
                                pinMenu("pinSingle")
                            } >Only this</MenuItem>

                            <MenuItem onClick={()=>
                                pinMenu("pinChildren")
                            }>{"With " + childrenNames.length + " connections"}</MenuItem>

                        </Menu>

                        {seeClauseAction}
                        {/*{commentIcon}*/}






                    </div>
                    : conceptPinned}

                </div>


    </>

        );



}