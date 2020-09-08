import React from "react";
import {Concept} from "./concept";

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import { withStyles } from '@material-ui/core/styles';
import Paper from "@material-ui/core/Paper";

export function Highlights (props){

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

    const appBarStyle = {
        background: 'ffffff'
    }


    const StyledTab = withStyles({
        root: {

            minWidth: "120px",
            maxWidth: "180px",

        },
        wrapper: {
            textTransform: "capitalize",

            fontSize: '14px',

            fontWeight: '700'
        },
    })(Tab);



    return  (
            <div className={props.className}>

                <Paper>

                <div className={"paneHeader"}>

                <h1>Highlights</h1>

                </div>



                <AppBar position="static"
                    color='inherit'
                        elevation={0}>

                    <Tabs
                        value={value}
                        onChange={handleChange}
                        aria-label="simple tabs example"

                        indicatorColor="primary"
                        textColor="primary"
                        // classes={{ flexContainer: 'pattern' }}
                    >

                        <StyledTab
                             label="Both"
                             {...a11yProps(0)} />

                        <StyledTab label="Only missing" {...a11yProps(1)} />

                        <StyledTab label="Only conflict" {...a11yProps(2)} />
                    </Tabs>
                </AppBar>

                </Paper>
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
