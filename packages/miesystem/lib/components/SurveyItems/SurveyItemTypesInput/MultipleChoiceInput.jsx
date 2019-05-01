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
import { SurveyItems } from '../../../modules/SurveyItem/index.js';
import { Promise } from 'meteor/promise';
import { object } from 'prop-types';
import swal from 'sweetalert';


class MultipleChoiceInput extends Component{

    constructor(props){
        super(props);
        this.state={
            value: '',
            values: [],
            results: [],
            idResult:'',
            options:['',''],
            //isRequired:''
        }
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
    /*    let options = this.state.options;
        options[i+2] = '';
        this.setState({ options }); */
    }

    getSurveyItemOptionsI(event){
        /*const options = this.state.options;
        options[0] = event.target.value;
        this.setState({options}); */
        let options = [...this.state.options];
        options[0] = event.target.value;
        this.setState({ options })
    }

    getSurveyItemOptionsII(event){
        /*const options = this.state.options;
        options[1] = event.target.value;
        this.setState({options}); */
        let options = [...this.state.options];
        options[1] = event.target.value;
        this.setState({ options });
    }

    getSurveyItemOptions(i,event){
        /*const options = this.state.options;
        options[i+2] = event.target.value;
        this.setState({options});*/
        let values = [...this.state.values];
        values[i] = event.target.value;
        this.setState({ values });
        let options = [...this.state.options];
        options[i+2] = event.target.value;
        this.setState({ options });
    }

    /* Save the multiple choice question */
    MultipleChoiceSave(id, qv, ir){
        if (!qv) {
            swal({
                title: "Please input a question!",
                icon: "warning"
            })
        } else if(this.state.options.includes("")){
            swal({
                title: "Please input all the options",
                icon: "warning"
            })
        } else {
        /* Save the question label in the survey item collection */
        this.props
        .createSurveyItem({
            data: {
                surveyListId: id,
                label: qv,
                surveyItemType: 'MultipleChoice',
                required: ir
            }
        })
        .then(result => {
            console.log(result.data.createSurveyItem.data._id);
            //this.setState({idResult:result.data.createSurveyItem.data._id});
            this.MultipleChoiceOptionsSave(result.data.createSurveyItem.data._id);
        })
        .catch(console.error);
        this.props.clearFunc();
        //this.props.closeContainer();
    }
    }

    MultipleChoiceOptionsSave(t){
        this.state.options.map((item,i) => {
            this.OptionsSave(t, item)
        })
    }

    OptionsSave(t,m){
        this.props
        .createSurveyItemOption({
            data: {
                surveyItemId: t,
                options: m
            }
        })
    }

    /* Save the multiple choice options */


    createInputItems(){
        return this.state.values.map((el,i) => 
            <div key={i}>
                <InputGroup>
                    <Input value={el||''} onChange={this.getSurveyItemOptions.bind(this,i)}/>
                    <InputGroupAddon key={i} addonType="append">
                       {/* <Button onClick={this.AddItem.bind(this)}>Add</Button> */}
                        <Button onClick={this.DeleteItem.bind(this,i)}>Delete</Button>
                    </InputGroupAddon>
                </InputGroup>
                <br/>
            </div>
    )}

    render(){

        const questionValue = this.props.questionValue;

        return(
            <div className="MultipleChoiceInputPage">
                <Form>
                    {/*<FormGroup>
                        <Label check>
                    
                            <Input type="checkbox" onChange={this.CheckBoxFunc.bind(this)}/> {' '}
                            Required
                        
                        </Label>
                    </FormGroup>*/}
                    <FormGroup>
                        <InputGroup>
                            <Input onChange={this.getSurveyItemOptionsI.bind(this)} />
                            <InputGroupAddon addonType="append">
                            {/*   <Button onClick={this.AddItem.bind(this)}>Add</Button> */}
                            </InputGroupAddon>
                        </InputGroup>
                        <br/>
                        <InputGroup>
                            <Input onChange={this.getSurveyItemOptionsII.bind(this)}/>
                            <InputGroupAddon addonType="append">
                                {/*<Button onClick={this.AddItem.bind(this)}>Add</Button>*/}
                            </InputGroupAddon>
                        </InputGroup>
                        <br/>
                        { this.createInputItems() }
                    </FormGroup>
                </Form>
                <div className="CommentBoxInputBtns">
                    <Button color="primary" onClick={this.AddItem.bind(this)}>Add</Button>{'  '}
                    <Button outline onClick={this.props.cancelFunc.bind(this)}>Cancel</Button>{'  '}
                    <Button color="primary" onClick={this.MultipleChoiceSave.bind(this, this.props.surveyListId, questionValue, this.props.isRequired)}>Save</Button>
                    <br/><br/>
                </div>
            </div>
        )
    }
}

const OptionCreateSurveyItem = {
    collectionName: 'SurveyItems'
}

const OptionCreateSurveyItemOption = {
    collectionName: 'SurveyItemOptions'
}

registerComponent({ name: 'MultipleChoiceInput', component: MultipleChoiceInput, hocs:[[withCreate,OptionCreateSurveyItem],[withCreate, OptionCreateSurveyItemOption]]});