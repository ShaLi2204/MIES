import React, { Component } from 'react';
import { Components, registerComponent, withUpdate, withDelete } from 'meteor/vulcan:core';
import { 
    Button, 
    Container, 
    Row, 
    Col, 
    Modal, 
    ModalFooter, 
    ModalBody, 
    Input,
    Form,
    FormGroup,
    Label,
    FormText
} from 'reactstrap';
import { width } from 'window-size';

class OSTextBoxDisplay extends Component{

    constructor(props){
        super(props);
        this.state = {
            Answer: ''
        }
    }

    TextBoxChange(e){
        const {surveyItem} = this.props;
        this.setState({
            Answer: e.target.value
        });
        this.props.surveyItemAnswersUpdate(surveyItem._id, surveyItem.surveyItemType, e.target.value);
    }

    render(){

        const {surveyItem} = this.props;
        const {i} = this.props;
        const {loading} = this.props;

        if(loading){

            return <Components.Loading />

        } else {
            
            return(
                <div>
                    <Form>
                        <FormGroup>
                            <Label>
                            Q{i+1}{surveyItem.required ? "*": null} : {surveyItem.surveyItemQuestion}
                            </Label>
                            <Input type="textarea" onChange={this.TextBoxChange.bind(this)} name="text" />
                        </FormGroup>
                    </Form>
                </div>
            )
        }
    }
}

registerComponent({
    name: 'OSTextBoxDisplay',
    component: OSTextBoxDisplay
})
;