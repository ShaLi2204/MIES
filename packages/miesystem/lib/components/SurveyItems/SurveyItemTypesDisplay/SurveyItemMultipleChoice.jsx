import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withList, withCurrentUser, Components, registerComponent, Utils, withCreate, withUpdate, withDelete } from 'meteor/vulcan:core';
import { Button, Container, Row, Col, Modal, ModalFooter, ModalBody, Input, Form, FormGroup, Label,} from 'reactstrap';

/* ---------------------------------------------- SurveyItemOptionsThread Component -----------------------------------------------*/

const SurveyItemOptionsThread = (props) => {

    const {results, currentUser, terms, loading } = props;
    const resultsClone = _.map(results, _.clone);

    if (loading){
        return <Components.Loading />
    } else{

    return(
        <div>
            <Components.SurveyItemOptionsList currentUser={currentUser} surveyItemOptions={resultsClone}/>
        </div>
    )}

}
SurveyItemOptionsThread.displayName = "SurveyItemOptionsThread";

SurveyItemOptionsThread.propTypes = {
    currentUser: PropTypes.object
}

const options = {
    collectionName: 'SurveyItemOptions',
    queryName: 'surveyItemOptionsListQuery',
    limit: 0
}

registerComponent({name:'SurveyItemOptionsThread', component:SurveyItemOptionsThread, hocs:[[withList, options], withCurrentUser]})


/* ---------------------------------------------- SurveyItemOptionsList Component -----------------------------------------------*/

const SurveyItemOptionsList = ({surveyItemOptions, currentUser}) => {
    return(
        <div>
            {surveyItemOptions.map((surveyItemOption,i) => <Components.SurveyItemOptionsNode i={i} currentUser={currentUser} surveyItemOption={surveyItemOption} key={surveyItemOption._id}/>)}
        </div>
    )
}
SurveyItemOptionsList.displayName = "SurveyItemOptionsList";

registerComponent({name:'SurveyItemOptionsList', component: SurveyItemOptionsList});


/* ---------------------------------------------- SurveyItemOptionsNode Component -----------------------------------------------*/

class SurveyItemOptionsNode extends Component {

    constructor(props){
        super(props);
        this.state = {
            showBtnGroup: false,
            optionValue: props.surveyItemOption.options,
            showEditModal: false
        }
    }

    handleMouseHoverEnter(){
        this.setState({
            showBtnGroup: true
        })
    }

    handleMouseHoverLeave(){
        this.setState({
            showBtnGroup: false
        })
    }

    EditBtnFunc(){
        this.setState({
            showEditModal: true
        })
    }

    EditChangeFunc(event){
        this.setState({
            optionValue: event.target.value
        })
    }

    DeleteBtnFunc(id){
        this.props
        .deleteSurveyItemOption({
            selector: {documentId: id}
        })
    }

    EditSaveFunc(id){
        this.props
        .updateSurveyItemOption({
            selector: {documentId: id},
            data: {options: this.state.optionValue}
        });
        this.setState({
            showEditModal: false
        })
    }

    cancelFunc(){
        this.setState({
            showEditModal: false
        })
    }

    toggleEdit(){
        this.setState(prevState => ({
            showBtnGroup: !prevState.showBtnGroup
        }))        
    }

    render(){

        const {surveyItemOption} = this.props;
        const {loading} = this.props;

        if (loading){
            return <Components.Loading/>
        } else {
        return(
            <div>
            <Container>
            <div
                className={this.state.showBtnGroup ? "SurveyItemOptionDisplayHover" : "SurveyItemOptionDisplay"}
                onMouseEnter={this.handleMouseHoverEnter.bind(this)}
                onMouseLeave={this.handleMouseHoverLeave.bind(this)}>
                <div className="SurveyItemOptionCss">
                    <Row>
                        <Col xs="6">
                            <FormGroup check>
                                <Label check>
                                    <Input type="radio" name="radio1" disabled/>{'  '}
                                    {surveyItemOption.options}
                                </Label>
                            </FormGroup>
                        </Col>
                        <Col xs="6">
                            {this.state.showBtnGroup &&
                            <div>
                                <Button size="sm" onClick={this.EditBtnFunc.bind(this)}>Edit</Button>{'   '}
                                <Button size="sm" color="secondary" outline onClick={this.DeleteBtnFunc.bind(this, surveyItemOption._id)}>Delete</Button>
                            </div>
                            }
                        </Col>
                    </Row>
                </div>
            </div>
            </Container>
            <Modal isOpen={this.state.showEditModal} toggle={this.toggleEdit.bind(this)}>
                <ModalBody>
                    <Input value={this.state.optionValue} onChange={this.EditChangeFunc.bind(this)}/>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" size="sm" onClick={this.EditSaveFunc.bind(this, surveyItemOption._id)}>Save</Button>
                    <Button color="secondary" size="sm" outline onClick={this.cancelFunc.bind(this)}>Cancel</Button>                    
                </ModalFooter>
            </Modal>
            </div>
        )}
    }
}

SurveyItemOptionsNode.propTypes = {
    surveyItemOption: PropTypes.object.isRequired,
    currentUser: PropTypes.object
};

const updateSurveyItemOptionUpdate = {
    collectionName: 'SurveyItemOptions'
}

const deleteSurveyItemOptionDelete = {
    collectionName: 'SurveyItemOptions'
}

registerComponent({name:'SurveyItemOptionsNode', component: SurveyItemOptionsNode, hocs:[[withUpdate,updateSurveyItemOptionUpdate],[withDelete,deleteSurveyItemOptionDelete]]});



/* ---------------------------------------------- SurveyItemMultipleChoice Component -----------------------------------------------*/

class SurveyItemMultipleChoice extends Component{

    constructor(props){
        super(props);
        this.state = {
            showBtnGroup: false,
            isOpen: false,
            shownewAnswer: false,
            newAnswer:'',
            questionUpdate: props.surveyItem.label,
            showEditModal: false
        }
    }

    handleMouseHoverEnter(){
        this.setState({
            showBtnGroup: true
        })
    }

    handleMouseHoverLeave(){
        this.setState({
            showBtnGroup: false
        })
    }

    handleAddAnswer(event){
        this.setState({
            newAnswer: event.target.value
        })
    }

    MultipleChoiceAddAnswer(){
        this.setState({
            shownewAnswer: true
        })
    }

    newAnswerSave(t, m){
        this.props
        .createSurveyItemOption({
            data: {
                surveyItemId: t,
                options: m
            }
        });
        this.setState({shownewAnswer: false})
    }

    newAnswerCancel(){
        this.setState({
            shownewAnswer: false
        })
    }

    newAnswertoggle(){
        this.setState(prevState => ({
            shownewAnswer: !prevState.shownewAnswer
        }))
    }

    EditBtnFunc(){
        this.setState({
            showEditModal: true
        })
    }

    EditChangeFunc(event){
        this.setState({
            questionUpdate: event.target.value
        })
    }

    EditSaveFunc(id){
        this.props
        .updateSurveyItem({
            selector:{ documentId: id},
            data: {label: this.state.questionUpdate}
        });
        this.setState({
            showEditModal: false
        });
    }

    edittoggle(){
        this.setState(prevState => ({
            showEditModal: !prevState.showEditModal
        }))        
    }

    DeleteBtnFunc(id){
        this.props
        .deleteSurveyItem({
            selector: {documentId:id}
        })
    }

    cancelFunc(){
        this.setState({
            showEditModal: false
        })
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
            <Container>
                <div
                    className={this.state.showBtnGroup ? "SurveyItemDisplayHover" : "SurveyItemDisplay"}
                    onMouseEnter={this.handleMouseHoverEnter.bind(this)}
                    onMouseLeave={this.handleMouseHoverLeave.bind(this)}>
                    {/*<div className="CommentBoxItem"> */}
                    <Row>
                        <Col xs="6">
                        Q{i+1}: {surveyItem.label}
                        </Col>
                        <Col xs="6">
                            {this.state.showBtnGroup && 
                            <div style={{textAlign:'right'}}>
                                <Button size="sm" onClick={this.MultipleChoiceAddAnswer.bind(this)}>New Answer</Button>{'   '}
                                <Button size="sm" onClick={this.EditBtnFunc.bind(this)}>Edit</Button>{'   '}
                                <Button size="sm" color="secondary" outline onClick={this.DeleteBtnFunc.bind(this, surveyItem._id)}>Delete</Button>
                            </div>}
                        </Col>
                    </Row>
                    {/*</div>*/}
                </div>
                <Row>
                    <Components.SurveyItemOptionsThread terms = {{surveyItemId:surveyItem._id, view:'surveyItemSurveyItemOptions'}}/>
                </Row>
            </Container>

            {/*--------------------Modal for new answer-------------------- */}
            <Modal isOpen={this.state.shownewAnswer} toggle={this.newAnswertoggle.bind(this)}>
                <ModalBody>
                    <Input onChange={this.handleAddAnswer.bind(this)}/>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={this.newAnswerSave.bind(this, surveyItem._id, this.state.newAnswer)}>Save</Button>{' '}
                    <Button onClick={this.newAnswerCancel.bind(this)}>Cancel</Button>
                </ModalFooter>
            </Modal>

            {/*--------------------Modal for edit answer-------------------- */}
            <Modal isOpen={this.state.showEditModal} toggle={this.edittoggle.bind(this)}>
                <ModalBody>
                    Q{i+1}
                    <Input value={this.state.questionUpdate} onChange={this.EditChangeFunc.bind(this)}/>            
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" size="sm" onClick={this.EditSaveFunc.bind(this, surveyItem._id)}>Save</Button>
                    <Button color="secondary" size="sm" outline onClick={this.cancelFunc.bind(this)}>Cancel</Button>                   
                </ModalFooter>
            </Modal>
            </div>
        )}
    }
}

const newAnswerCreateOption = {
    collectionName: 'SurveyItemOptions'
}

const updateQuestionOption = {
    collectionName: 'SurveyItems'
}

registerComponent({ name: 'SurveyItemMultipleChoice', component: SurveyItemMultipleChoice, hocs:[[withCreate,newAnswerCreateOption],[withUpdate,updateQuestionOption]] });