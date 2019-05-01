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

class OSCommentBoxDisplay extends Component{

    constructor(props){
        super(props);
        this.state = {
            Answer:''
        }
    }

    CommentBoxChange(e){
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
                            <Input type="textarea" onChange={this.CommentBoxChange.bind(this)} name="text" />
                        </FormGroup>
                    </Form>
                </div>
            )
        }
    }

}

registerComponent({
    name: 'OSCommentBoxDisplay',
    component: OSCommentBoxDisplay
});

