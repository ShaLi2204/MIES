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

class CheckBoxDisplay extends Component{

    constructor(props){
        super(props);
        this.state = {
            showBtnGroup: false,
            isOpen: false,
            MCQuestion: props.surveyItem.surveyItemQuestion,
            MCOptions: JSON.parse(props.surveyItem.surveyItemOptions || ''),//props.surveyItem.surveyItemOptions.split("|"),
            MCRequired: props.surveyItem.required,
            MCNewOptions: [],
        };
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

    EditPage(){
        this.setState({
            isOpen: true
        })
    }

    CloseModal(){
        this.setState({
            isOpen: false
        })
    }

    toggle(){
        this.setState(prevState => ({
            isOpen: !prevState.isOpen
        }))
    }

    /* Get the new value of surveyitem.surveyItemQuestion */
    EditChangeFunc(event){
        this.setState({
            MCQuestion: event.target.value
        })
    }

    /* Get the new value of surveyItem.required */
    isRequiredChangeFunc(event){
        this.setState({
            MCRequired: event.target.checked
        })
    }

    MCAddClick(){
        this.setState(prevState => ({
            MCNewOptions: [...prevState.MCNewOptions, ''],
        }))
    }

    MCAddOptions(){
        const n = this.state.MCOptions.length;
        return this.state.MCNewOptions.map((el, i) => 
            <div key={i}>
                <InputGroup>
                    <Input value={el||''} onChange={this.MCNewOptionsUpdate.bind(this, i)} />
                    <InputGroupAddon addonType="append">
                        <Button onClick={this.MCDeleteNewOptions.bind(this, i)}>Delete</Button>
                    </InputGroupAddon>
                </InputGroup>
                <br/>
            </div>
        )
    }

    MCDeleteOptions(i){
        let MCOptions = [...this.state.MCOptions];
        MCOptions.splice(i, 1);
        this.setState({ MCOptions });
    }

    MCDeleteNewOptions(i){
        let MCNewOptions = [...this.state.MCNewOptions];
        MCNewOptions.splice(i, 1);
        this.setState({ MCNewOptions });
    }

    MCOptionsUpdate(i, event){
        let MCOptions = [...this.state.MCOptions];
        MCOptions[i] = event.target.value;
        this.setState({ MCOptions });
    }

    MCNewOptionsUpdate(i, event){
        let MCNewOptions = [...this.state.MCNewOptions];
        MCNewOptions[i] = event.target.value;
        this.setState({ MCNewOptions });
    }

    MCChangeSave(id, qt, ir){
        Ops = [...this.state.MCOptions, ...this.state.MCNewOptions];
        this.props
        .updateSurveyItem({
            selector: { documentId: id },
            data:{
                surveyItemQuestion: qt,
                required: ir,
                surveyItemOptions: JSON.stringify(Ops),
            }
        });
        this.setState({
            isOpen: false
        });
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

        if(loading) {
			
            return <Components.Loading/>
			
        } else {

            const {surveyItem} = this.props;
            const {surveyList} = this.props;
            const {i} = this.props;

			
            return(
                <div>
                    {surveyList.status==1 ? 
                    <div
                    className={this.state.showBtnGroup ? "SurveyItemDisplayHover" : "SurveyItemDisplay"}
                    onMouseEnter={this.handleMouseHoverEnter.bind(this)}
                    onMouseLeave={this.handleMouseHoverLeave.bind(this)}                
                    >
                        <div className="CommentBoxItem">
                        <Form>
                            <FormGroup>
                                <Container>
                                    <Row>
                                        <Col xs="6">
                                            Q{i+1}{surveyItem.required ? "*": null} : {surveyItem.surveyItemQuestion}
                                        </Col>
                                        <Col xs="6">
                                            {this.state.showBtnGroup &&
                                            <div style={{textAlign: 'right'}}>
                                                <Button size="sm" onClick={this.EditPage.bind(this)}>Edit</Button>{'   '}
                                                <Button size="sm" color="secondary" onClick={this.DeleteItem.bind(this, surveyItem._id)} outline>Delete</Button>
                                            </div>
                                            }
                                        </Col>
                                    </Row>
                                </Container>
                                {JSON.parse(surveyItem.surveyItemOptions || '').map((el, i) => 
                                    <FormGroup key={i} check>
                                        <Label check>
                                        <Input type="checkbox" disabled /> {'   '}
                                        {el}
                                        </Label>
                                    </FormGroup>
                                )}
                            </FormGroup>
                        </Form>
                        </div>
                    </div> : 
                    <div className="CommentBoxItem">
                        <Form>
                            <FormGroup>
                                <Container>
                                    <Row>
                                        Q{i+1}{surveyItem.required ? "*": null} : {surveyItem.surveyItemQuestion} 
                                    </Row>
                                </Container>
                                {JSON.parse(surveyItem.surveyItemOptions || '').map((el, i) => 
                                    <FormGroup key={i} check>
                                        <Label check>
                                        <Input type="checkbox" disabled /> {'   '}
                                        {el}
                                        </Label>
                                    </FormGroup>
                                )}
                            </FormGroup>
                        </Form>
                    </div>
                    }



                {/*-------------------------------------------------- Editting Modal ---------------------------------------------------------- */}
                <Modal isOpen={this.state.isOpen} toggle={this.toggle.bind(this)}>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            Q{i+1}
                            <Input value={this.state.MCQuestion} onChange={this.EditChangeFunc.bind(this)} />
                        </FormGroup>
                        <FormGroup check>
                            <Label check>
                            <Input type="checkbox" defaultChecked={this.state.MCRequired} onChange={this.isRequiredChangeFunc.bind(this)} />{'   '}
                            Required
                            </Label>
                        </FormGroup>
                        <br/>
                        {this.state.MCOptions.map((el, i) => 
                            <FormGroup key={i}>
                                <InputGroup>
                                    <Input value={el||''} onChange={this.MCOptionsUpdate.bind(this, i)} />
                                    <InputGroupAddon addonType="append">
                                        <Button onClick={this.MCDeleteOptions.bind(this, i)}>Delete</Button>
                                    </InputGroupAddon>
                                </InputGroup>
                            </FormGroup>
                        )}
                        { this.MCAddOptions() }
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" size="sm" onClick={this.MCAddClick.bind(this)}>Add</Button>
                    <Button color="primary" size="sm" onClick={this.MCChangeSave.bind(this, surveyItem._id, this.state.MCQuestion, this.state.MCRequired)}>Save</Button>
                    <Button color="secondary" size="sm" outline onClick={this.CloseModal.bind(this)}>Cancel</Button>
                </ModalFooter>
                </Modal>
                </div>
            )
        }
    }
}

const UpdateOptions = {
    collectionName: 'SurveyItems'
}

registerComponent({
    name: 'CheckBoxDisplay',
    component: CheckBoxDisplay,
    hocs: [[withUpdate, UpdateOptions]]
});