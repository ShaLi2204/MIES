import React, { Component } from 'react';
import { Components, registerComponent, withUpdate, withCreate, withMulti, withSingle,withDelete, newMutation, withDocument, withCurrentUser } from 'meteor/vulcan:core';
import { 
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    InputGroup,
    InputGroupText,
    InputGroupAddon,
    FormText
} from 'reactstrap';
import swal from 'sweetalert';

class SelfTrackingInput extends Component{

    constructor(props){
        super(props);
        this.state = {
            value: '',
            values: [],
            options: ['','']

        }
    }

    getSurveyItemOptionsI(event){
        let options = [...this.state.options];
        options[0] = event.target.value;
        this.setState({ options })
    }

    getSurveyItemOptionsII(event){
        let options = [...this.state.options];
        options[1] = event.target.value;
        this.setState({ options })
    }

    AddItem(){
        this.setState(prevState => ({ values: [...prevState.values, ''], options: [...prevState.options,'']}));
    }

    DeleteItem(i){
        let values = [...this.state.values];
        values.splice(i,1);
        this.setState({ values });
        let options = [...this.state.options];
        options.splice((i+2),1);
        this.setState({ options });
    }

    getSurveyItemOptions(i,event){
        let values = [...this.state.values];
        values[i] = event.target.value;
        this.setState({ values });
        let options = [...this.state.options];
        options[i+2] = event.target.value;
        this.setState({ options });
    }

    createInputItems() {
        return this.state.values.map((el, i) => 
            <div key={i}>
                <InputGroup>
                    <Input value={el||''} onChange={this.getSurveyItemOptions.bind(this, i)} placeholder="Please input a behavior name"/>
                    <InputGroupAddon key={i} addonType="append">
                        <Button onClick={this.DeleteItem.bind(this, i)}>Delete</Button>
                    </InputGroupAddon>
                </InputGroup>
                <br/>
            </div>
        )
    }

    MultipleChoiceSave(id, qv, ir, ops){
        if(!qv){
            swal({
                title: "Please input a question!",
                icon: "warning"
            })
        } else {
            this.props
            .createSurveyItem({
                data: {
                    surveyListId: id,
                    surveyItemQuestion: qv, 
                    surveyItemType: 'SelfTracking',
                    required: ir, 
                    surveyItemOptions: ops
                }
            })
            .then(console.log)
            ;
            this.props.clearFunc();
        }
    }
    
    render(){

        const questionValue = this.props.questionValue;
        const surveyListId = this.props.surveyListId;
        const isRequired = this.props.isRequired;

        return(
            <div className="MultipleChoiceInputPage">
                <Form>
                    <FormGroup>
                        <Input onChange={this.getSurveyItemOptionsI.bind(this)} placeholder="Please input a behavior name"/>
                    </FormGroup>
                    <FormGroup>
                        <Input onChange={this.getSurveyItemOptionsII.bind(this)} placeholder="Please input a behavior name"/>
                    </FormGroup>
                    { this.createInputItems() }
                </Form>
                <div className="CommentBoxInputBtns">
                    <Button color="primary" onClick={this.AddItem.bind(this)}>Add</Button>{'   '}
                    <Button outline onClick={this.props.cancelFunc.bind(this)}>Cancel</Button>{'   '}
                    <Button color="primary" onClick={this.MultipleChoiceSave.bind(this, surveyListId, questionValue, isRequired, JSON.stringify(this.state.options))}>Save</Button>
                    <br/><br/>
                </div>
            </div>
        )
    }
}

const OptionCreateSurveyItem = {
    collectionName: 'SurveyItems'
}

registerComponent({
    name: 'SelfTrackingInput',
    component: SelfTrackingInput,
    hocs: [[withCreate, OptionCreateSurveyItem]]
})
;