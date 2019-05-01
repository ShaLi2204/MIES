import React, { Component } from 'react';
import { Components, registerComponent, withUpdate, withDelete } from 'meteor/vulcan:core';
import { Button, Container, Row, Col, Modal, ModalFooter, ModalBody, Input } from 'reactstrap';
import { width } from 'window-size';

class SurveyItemTextBox extends Component{

    constructor(props){
        super(props);
        this.state = {
            showBtnGroup: false,
            showEditModal: false,
            isOpen: false,
            InputValue: props.surveyItem.label
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

    EditFuncPage(){
        this.setState({
            isOpen: true
        })
    }

    toggle(){
        this.setState(prevState => ({
            isOpen: !prevState.isOpen
        }))
    }

    cancelFunc(){
        this.setState({
            isOpen: false
        })
    }

    DeleteBtnFunc(id){
        this.props
        .deleteSurveyItem({
            selector: {documentId:id}
        })
    }

    EditChangeFunc(event){
        this.setState({
            InputValue: event.target.value
        })
    }

    EditSaveFunc(id){
        this.props
        .updateSurveyItem({
            selector: { documentId: id },
            data: {label: this.state.InputValue}
        });
        this.setState({
            isOpen: false
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
            <div
            className={this.state.showBtnGroup ? "SurveyItemDisplayHover" : "SurveyItemDisplay"}
            onMouseEnter={this.handleMouseHoverEnter.bind(this)}
            onMouseLeave={this.handleMouseHoverLeave.bind(this)}>
            <div className="CommentBoxItem"> 
            <Container>
                <Row>
                    <Col xs="6">
                    Q{i+1}: {surveyItem.label}
                    </Col>
                    <Col xs="6">
                        {this.state.showBtnGroup && 
                        <div style={{textAlign:'right'}}>
                            <Button size="sm" onClick={this.EditFuncPage.bind(this)}>Edit</Button>{'   '}
                            <Button size="sm" color="secondary" outline onClick={this.DeleteBtnFunc.bind(this, surveyItem._id)}>Delete</Button>
                        </div>}
                    </Col>
                </Row>
                <Row>
                    <Input length="20px" disabled placeholder="User input text"/>
                </Row>
            </Container>
            <Modal isOpen={this.state.isOpen} toggle={this.toggle.bind(this)}>
                <ModalBody>
                    Q{i+1}
                    <Input value={this.state.InputValue} onChange={this.EditChangeFunc.bind(this)}/>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" size="sm" onClick={this.EditSaveFunc.bind(this, surveyItem._id)}>Save</Button>
                    <Button color="secondary" size="sm" outline onClick={this.cancelFunc.bind(this)}>Cancel</Button>
                </ModalFooter>
            </Modal>
            </div>
            </div>
        )}
    }
}

const updateOptions = {
    collectionName: 'SurveyItems'
}

const deleteOptions = {
    collectionName: 'SurveyItems'
}

registerComponent({ name: 'SurveyItemTextBox', component: SurveyItemTextBox, hocs:[[withUpdate, updateOptions],[withDelete, deleteOptions]] });