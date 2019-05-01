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

class OSSurveyItemTextBox extends Component{

    constructor(props){
        super(props);
        this.state = {

        }
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
                            <Label>Q{i+1}: {surveyItem.label}</Label>
                            <Input type="textarea" name="text" />
                        </FormGroup>
                    </Form>
                </div>
            )
        }
    }
}

registerComponent({
    name: 'OSSurveyItemTextBox',
    component: OSSurveyItemTextBox
})
;