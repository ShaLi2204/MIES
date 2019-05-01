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
    Label, 
    Spinner
} from 'reactstrap';
import { width } from 'window-size';

class TextBoxDisplay extends Component{

    constructor(props){
        super(props);
        this.state = {
            showBtnGroup: false,
            showEditModal: false,
            isOpen: false,
            InputValue: props.surveyItem.surveyItemQuestion,
            TBRequired: props.surveyItem.required
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

    isRequiredChangeFunc(event){
        this.setState({
            TBRequired: event.target.checked
        })
    }

    EditSaveFunc(id){
        this.props
        .updateSurveyItem({
            selector: { documentId: id },
            data: {
                surveyItemQuestion: this.state.InputValue,
                required: this.state.TBRequired
            }
        });
        this.setState({
            isOpen: false
        })
    }

    DeleteItem(id){
        this.props
        .updateSurveyItem({
            selector: {documentId: id},
            data: {
                isDeleted: true
            }
        });
        swal({
            title: "Survey Item Deleted",
            icon: "success"
        });
    }

    render(){

        const {loading} = this.props;

        if(loading){

            return (
                <div>
                    {console.log("Loading TextBoxDisplay")}
                    <Spinner color="primary" />
                </div>
            )
            
        } else {

            const {surveyItem} = this.props;
            const {i} = this.props;
            const {surveyList} = this.props;

        return(
            <div>
                {console.log(surveyList.status)}
                {surveyList.status==1? 
                <div
                className={this.state.showBtnGroup ? "SurveyItemDisplayHover" : "SurveyItemDisplay"}
                onMouseEnter={this.handleMouseHoverEnter.bind(this)}
                onMouseLeave={this.handleMouseHoverLeave.bind(this)}>
                    <div className="CommentBoxItem"> 
                    <Container>
                        <Row>
                            <Col xs="6">
                            Q{i+1} {surveyItem.required ? "*": null}: {surveyItem.surveyItemQuestion}
                            </Col>
                            <Col xs="6">
                                {this.state.showBtnGroup && 
                                <div style={{textAlign:'right'}}>
                                    <Button size="sm" onClick={this.EditFuncPage.bind(this)}>Edit</Button>{'   '}
                                    <Button size="sm" color="secondary" outline onClick={this.DeleteItem.bind(this, surveyItem._id)}>Delete</Button>
                                </div>}
                            </Col>
                        </Row>
                        <Row>
                            <Input length="20px" disabled placeholder="User input text"/>
                        </Row>
                    </Container>
                    </div>
                </div> : 
                <div className="CommentBoxItem">
                    <Container>
                        <Row>
                            Q{i+1} {surveyItem.required ? "*": null}: {surveyItem.surveyItemQuestion}    
                        </Row>
                        <Row>
                            <Input length="20px" disabled placeholder="User input text"/>
                        </Row>
                    </Container>
                </div>
                }

                <Modal isOpen={this.state.isOpen} toggle={this.toggle.bind(this)}>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                            Q{i+1}
                            <Input value={this.state.InputValue} onChange={this.EditChangeFunc.bind(this)}/>
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                <Input type="checkbox" defaultChecked={this.state.TBRequired} onChange={this.isRequiredChangeFunc.bind(this)} />{'   '}
                                Required
                                </Label>
                            </FormGroup>
                        </Form>
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

const updateOptions = {
    collectionName: 'SurveyItems'
}

const deleteOptions = {
    collectionName: 'SurveyItems'
}

registerComponent({ 
    name: 'TextBoxDisplay', 
    component: TextBoxDisplay, 
    hocs:[[withUpdate, updateOptions],[withDelete, deleteOptions]] });