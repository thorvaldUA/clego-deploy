import React from "react";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import TextField from "@material-ui/core/TextField";
import {Button, Checkbox} from "@material-ui/core";

export class ExportOptions extends React.Component {

    render() {
        return (
            <div className={this.props.className}>
                <h1>Export Options</h1>

                <RadioGroup defaultValue="pdf">
                    <Radio value="pdf">Send as PDF</Radio>
                    <TextField label="Email"/>

                    <Radio value="invite">Send an invite</Radio>
                    <TextField label="Email"/>
                    <Checkbox>Save to desktop</Checkbox>

                    <Button type='submit' isDisabled='yes'>Submit</Button>


                </RadioGroup>

                <form>

                    <input type="radio" id="pdf" name="exportOptions" value="pdf" defaultChecked/>
                    <label htmlFor="pdf">Send as PDF</label><br/>

                    <input type="text" id="email" name="exportOptions"/><br/>

                    <input type="radio" id="invite" name="exportOptions" value="invite"/>
                    <label htmlFor="invite">Send invite</label><br/>
                    <input type="checkbox" id="desktop" name="exportOptions" value="desktop"/>
                    <label htmlFor="other">Save copy to desktop</label><br/>
                    <input type="submit" value="Submit"/>
                </form>
            </div>
        )
    }

}