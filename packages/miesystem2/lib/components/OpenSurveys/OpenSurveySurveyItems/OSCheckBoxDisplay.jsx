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

class OSCheckBoxDisplay extends Component{

    constructor(props){
        super(props);
        this.state = {
            AnswerYN:
                [...Array(JSON.parse(props.surveyItem.surveyItemOptions || '').length)].map((el, i) => false),
            Answer:
                [...Array(JSON.parse(props.surveyItem.surveyItemOptions || '').length)].map((el, i) => '')
        }
    }

    CheckBoxFunc(el, i, event){
        const {surveyItem} = this.props;
        var AnswerYN = this.state.AnswerYN;
        var Answer = this.state.Answer;
        AnswerYN[i] = event.target.checked;
        if (AnswerYN[i]===true) {
            Answer[i] = el
        } else {
            Answer[i] = ''
        };
        this.setState({ AnswerYN });
        this.setState({ Answer })
        console.log(Answer);
        this.props.surveyItemAnswersUpdate(surveyItem._id, surveyItem.surveyItemType, Answer);
    }

    render(){

        const {surveyItem} = this.props;
        const {i} = this.props;
        const {loading} = this.props;

        if(loading) {

            return <Components.Loading />

        } else {

            return(
                <div>
                    <Form>
                        <FormGroup>
                            <Label>
                                Q{i+1}{surveyItem.required ? "*": null} : {surveyItem.surveyItemQuestion}
                            </Label>
                        </FormGroup>
                        <FormGroup>
                            {JSON.parse(surveyItem.surveyItemOptions || '').map((el, i) =>
                                <FormGroup key={i} check>
                                    <Label check>
                                        <Input type="checkbox" onChange={this.CheckBoxFunc.bind(this, el, i)} />{'   '} {el}
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
    name: 'OSCheckBoxDisplay',
    component: OSCheckBoxDisplay
});

