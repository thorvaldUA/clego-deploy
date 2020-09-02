import React from "react";
import {Concept} from "./concept";

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    root: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'

    },
    label: {
        textTransform: 'capitalize',
    },
});

export function Highlights (props){

    const classes = useStyles();




    function seeConnections(i) {
        props.seeConnections(i)
    }

    function conceptClicked(id) {
        props.conceptClicked(id)
    }

    function pinChildren(name, children) {
        props.pinChildren(name, children)
    }

    function renderHighlights(typeA, typeB) {


        let filteredA = props.concepts.filter(concept => concept.type === typeA)
        let filteredB = props.concepts.filter(concept => concept.type === typeB)

        let filtered = filteredA.concat(filteredB)

        return (
            <div className="column-container">
                {filtered.map((data) => {
                    return (
                        <div key={data.id}>

                            <Concept

                                onClick={() => conceptClicked(data)}
                                openModal={() => props.openModal(data.id, data.name)}

                                pinChildren={() => pinChildren(data)}
                                seeConnections={() => seeConnections(data)}
                                currentScreen={props.currentScreen}
                                clause={data.text}


                                isChildOf={data.isChildOf}
                                concepts={props.concepts}


                                key={data.id}
                                id={data.id}
                                name={data.name}
                                type={data.type}

                                isSelected={
                                    props.pins.find(a => a.id === data.id)
                                }

                                comment={data.comments}
                                hasParent={false}

                            />
                        </div>
                    )
                })}
            </div>

        )

    }

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const tabStyle = {
        textTransform: "capitalize"
    }

    const appBarStyle = {
        flexGrow: 1
    }



    return  (
            <div className={props.className}>

                <h1 style={{border: "0"}}>Highlights</h1>

                <AppBar position="static" color="default">

                    <Tabs
                        value={value}
                        onChange={handleChange}
                        aria-label="simple tabs example"

                        indicatorColor="primary"
                        textColor="primary"
                        style={appBarStyle}
                    >

                        <Tab style={tabStyle} label="Both" {...a11yProps(0)} />
                        <Tab style={tabStyle} label="Only missing" {...a11yProps(1)} />
                        <Tab style={tabStyle} label="Only conflict" {...a11yProps(2)} />
                    </Tabs>
                </AppBar>
                <TabPanel value={value} index={0}>
                    {renderHighlights("missing","conflict")}
                </TabPanel>
                <TabPanel value={value} index={1}>
                    {renderHighlights("missing", null)}
                </TabPanel>
                <TabPanel value={value} index={2}>
                    {renderHighlights("conflict", null)}
                </TabPanel>

            </div>

)




}

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    const style = {
        padding: '1px 0px',
        height: "100%"
    }

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box style={style} p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}
