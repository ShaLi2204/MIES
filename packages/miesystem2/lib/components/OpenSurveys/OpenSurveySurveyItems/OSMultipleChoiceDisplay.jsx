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
    InputGroup,
    InputGroupAddon,
    Form,
    FormGroup,
    Label
} from 'reactstrap';
import swal from 'sweetalert';

class OSMultipleChoiceDisplay extends Component{

    constructor(props){
        super(props);
        this.state = {
            Answer: ''
        }
    }

    MCChangeFunc(el){
        const {surveyItem} = this.props;
        this.setState({
            Answer: el
        });
        this.props.surveyItemAnswersUpdate(surveyItem._id, surveyItem.surveyItemType, el);
    }

    render(){

        const {surveyItem} = this.props;
        const {i} = this.props;
        const {loading} = this.props;

        if (loading) {

            return <Components.Loading />

        } else {

            return(
                <div>
                    <Form>
                        <FormGroup tag="fieldset">
                            <Label>
                                Q{i+1}{surveyItem.required ? "*": null} : {surveyItem.surveyItemQuestion}
                            </Label>
                            {JSON.parse(surveyItem.surveyItemOptions).map((el, i) =>
                                <FormGroup key={i} check>
                                    <Label check>
                                        <Input type="radio" name="radio1" onChange={this.MCChangeFunc.bind(this, el)} />{'   '} {el}
                                    </Label>
                                </FormGroup>
                            )}
                        </FormGroup>
                    </Form>
                </div>
            )
        }
    }

}

registerComponent({
    name: 'OSMultipleChoiceDisplay',
    component: OSMultipleChoiceDisplay
});

