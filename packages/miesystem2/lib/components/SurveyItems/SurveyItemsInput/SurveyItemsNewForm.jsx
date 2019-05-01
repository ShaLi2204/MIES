import { Components, registerComponent, withUpdate, withCreate, withDelete, newMutation, withDocument, withCurrentUser } from 'meteor/vulcan:core';
import React, { Component } from 'react';
//import { SurveyLists } from '../../modules/SurveyLists/index.js';
//import { SurveyItems } from '../../modules/SurveyItems/index.js';
import { Promise } from 'meteor/promise';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import Users from 'meteor/vulcan:users';
import { Link } from 'react-router';
import { 
    Button, 
    Form, 
    FormGroup, 
    Label, 
    Input,
    InputGroup,
    InputGroupAddon,
    ButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Container,
    Row,
    Col
 } from 'reactstrap';

 class SurveyItemsNewForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            containerOpen: false,
            statusCheck: props.surveyList.status==1? true: false
        }
    }

    newquestion(){
        this.setState({
            containerOpen: !this.state.containerOpen
        })
    }

    closeContainer(){
        this.setState({
            containerOpen: false
        })
    }


    render(){

        const {surveyList} = this.props;

        return(
            <div className="SurveyItemsNewFormPage">
                {this.state.containerOpen && <SurveyItemsNewFormContainer closeContainer={this.closeContainer.bind(this)} surveyList={surveyList}/>}
                {this.state.statusCheck && <Button className="NewQuestionBtn" onClick={this.newquestion.bind(this)}>New Question</Button>}
            </div>
        )
    }
}

const createOptions = {
    collectionName: 'SurveyItems',
    fragmentName: 'SurveyItemsList'
}

const deleteOptions = {
    collectionName: 'SurveyItems'
}

const updateOptions = {
    collectionName: 'SurveyItems'
}

registerComponent({
    name: 'SurveyItemsNewForm', 
    component: SurveyItemsNewForm, 
    hocs: [[withCreate,createOptions],
        [withDelete, deleteOptions], 
        [withUpdate, updateOptions]] 
})
;


/*----------------------------------------------------------------- SurveyItemsNewFormContainer Component -----------------------------------------------------------------*/

class SurveyItemsNewFormContainer extends Component{
    constructor(){
        super();
        this.state = {
            dropdownOpen: false,
            dropdownValue: 'Question Type',
            textboxPage: false,
            commentboxPage: false,
            multiplechoicePage: false,
            checkboxPage: false,
            ratingscalePage: false,
            selftrackingPage: false,
            InputValue: '',
            isRequired:''
        }
    }


    /* Toggle function for ButtonDropdown*/
    toggle(){
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        })
    }

    CheckBoxFunc(event){
        this.setState({isRequired: event.target.checked});
    }

    ddtextbox(){
        this.setState({
            dropdownValue: 'Textbox',
            textboxPage: true,
            commentboxPage: false,
            multiplechoicePage: false,
            checkboxPage: false,
            ratingscalePage: false,
            selftrackingPage: false
        })
    }

    ddcommentbox(){
        this.setState({
            dropdownValue: 'Comment Box',
            textboxPage: false,
            commentboxPage: true,
            multiplechoicePage: false,
            checkboxPage: false,
            ratingscalePage: false,
            selftrackingPage: false
        })
    }

    ddmultiplechoice(){
        this.setState({
            dropdownValue: 'Multiple Choice',
            textboxPage: false,
            commentboxPage: false,
            multiplechoicePage: true,
            checkboxPage: false,
            ratingscalePage: false,
            selftrackingPage: false
        })
    }

    ddcheckbox(){
        this.setState({
            dropdownValue: 'Check Box',
            textboxPage: false,
            commentboxPage: false,
            multiplechoicePage: false,
            checkboxPage: true,
            ratingscalePage: false,
            selftrackingPage: false
        })
    }

    ddratingscale(){
        this.setState({
            dropdownValue: 'Rating Scale',
            textboxPage: false,
            commentboxPage: false,
            multiplechoicePage: false,
            checkboxPage: false,
            ratingscalePage: true,
            selftrackingPage: false
        })
    }

    ddselftracking(){
        this.setState({
            dropdownValue: 'Self Tracking',
            textboxPage: false,
            commentboxPage: false,
            multiplechoicePage: false,
            checkboxPage: false,
            ratingscalePage: false,
            selftrackingPage: true
        })
    }

    cancelFunc(){
        this.setState({
            dropdownValue: 'Question Type',
            textboxPage: false,
            commentboxPage: false,
            multiplechoicePage: false,
            checkboxPage: false,
            ratingscalePage: false,
            //InputValue:''
        })
    }

    InputValueFunc(event){
        this.setState({
            InputValue: event.target.value
        })
    }

    clearFunc(){
        this.setState({
            InputValue:'',
            textboxPage: false,
            commentboxPage: false,
            multiplechoicePage: false,
            checkboxPage: false,
            ratingscalePage: false,
            dropdownValue: 'Question Type'
        });
        this.props.closeContainer();
    }

    render(){
        const seedData = this.state.seedData;
        const {surveyList} = this.props;
        //const { SurveyLists } = this.props.SurveyLists;
        return(
            <div className="SurveyItemsNewFormContainerHP">
                <div className="SurveyItemsNewFormContainer">
                    <InputGroup>
                    <Input onChange={this.InputValueFunc.bind(this)} value={this.state.InputValue} placeholder="Please enter your question"/>
                    <InputGroupAddon addonType="append">
                    <ButtonDropdown direction="down" isOpen={this.state.dropdownOpen} toggle={this.toggle.bind(this)}>
                                <DropdownToggle caret>
                                    {this.state.dropdownValue}
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem onClick={this.ddtextbox.bind(this)}>Textbox</DropdownItem>
                                    <DropdownItem onClick={this.ddcommentbox.bind(this)}>Comment Box</DropdownItem>
                                    <DropdownItem onClick={this.ddmultiplechoice.bind(this)}>Multiple Choice</DropdownItem>
                                    <DropdownItem onClick={this.ddcheckbox.bind(this)}>Check Box</DropdownItem>
                                    <DropdownItem onClick={this.ddratingscale.bind(this)}>Rating Scale</DropdownItem>
                                    <DropdownItem onClick={this.ddselftracking.bind(this)}>Self Tracking</DropdownItem>
                                </DropdownMenu>
                            </ButtonDropdown>
                    </InputGroupAddon>
                    </InputGroup>
                    <FormGroup check className="isRequiredBtn">
                    <Label check>
                        <Input type="checkbox" onChange={this.CheckBoxFunc.bind(this)}/> {' '}Required
                    </Label>
                    </FormGroup>
                </div>
                {this.state.textboxPage && <Components.TextBoxInput
                    cancelFunc={this.cancelFunc.bind(this)}
                    surveyListId={surveyList._id}
                    questionValue={this.state.InputValue}
                    clearFunc={this.clearFunc.bind(this)}
                    isRequired={this.state.isRequired}
                />}
                {this.state.commentboxPage && <Components.CommentBoxInput
                    cancelFunc={this.cancelFunc.bind(this)}
                    surveyListId={surveyList._id}
                    questionValue={this.state.InputValue}
                    clearFunc={this.clearFunc.bind(this)}
                    isRequired={this.state.isRequired}
                />}
                {this.state.multiplechoicePage && <Components.MultipleChoiceInput
                    cancelFunc={this.cancelFunc.bind(this)}     
                    surveyListId={surveyList._id}
                    questionValue={this.state.InputValue}
                    clearFunc={this.clearFunc.bind(this)}
                    isRequired={this.state.isRequired}
                />}
                {this.state.checkboxPage && <Components.CheckBoxInput
                    cancelFunc={this.cancelFunc.bind(this)}     
                    surveyListId={surveyList._id}
                    questionValue={this.state.InputValue}
                    clearFunc={this.clearFunc.bind(this)}
                    isRequired={this.state.isRequired}
                />}
                {this.state.ratingscalePage && <Components.RatingScaleInput
                    cancelFunc={this.cancelFunc.bind(this)}     
                    surveyListId={surveyList._id}
                    questionValue={this.state.InputValue}
                    clearFunc={this.clearFunc.bind(this)}
                    isRequired={this.state.isRequired}
                />}
                {this.state.selftrackingPage && <Components.SelfTrackingInput
                    cancelFunc={this.cancelFunc.bind(this)}     
                    surveyListId={surveyList._id}
                    questionValue={this.state.InputValue}
                    clearFunc={this.clearFunc.bind(this)}
                    isRequired={this.state.isRequired}
                />}
            </div>

        )
    }
}
