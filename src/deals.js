import React from "react";
import {Button} from "@material-ui/core";
import DescriptionIcon from "@material-ui/icons/Description";

export class Deals extends React.Component {

    switchDeals() {
        this.props.switchDeals()
    }

    render() {
        return (

            <>


                <div className={this.props.className}>
                    <h1>Deals</h1>
                    <br/>

                    <Button

                        onClick={() => this.props.switchDeals()}>
                        <DescriptionIcon/>
                        Switch deals


                    </Button>

                </div>

            </>
        )
    }

}