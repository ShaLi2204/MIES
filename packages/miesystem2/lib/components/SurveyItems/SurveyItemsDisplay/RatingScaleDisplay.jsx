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
    Table
} from 'reactstrap';
import swal from 'sweetalert';

class RatingScaleDisplay extends Component{

    constructor(props){
        super(props);
        this.state = {
            showBtnGroup: false,
            isOpen: false,
            RSQuestion: props.surveyItem.surveyItemQuestion,
            RSRequired: props.surveyItem.required,
            RSRows: JSON.parse(props.surveyItem.surveyItemOptions || '')["Row"],//props.surveyItem.surveyItemOptions.split("/RC/")[0].split("|R|"),
            RSCols: JSON.parse(props.surveyItem.surveyItemOptions || '')["Col"],//props.surveyItem.surveyItemOptions.split("/RC/")[1].split("|C|"),
            RSNewRows: [],
            RSNewCols: [],
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

    EditChangeFunc(event){
        this.setState({
            RSQuestion: event.target.value
        })
    }

    isRequiredChangeFunc(event){
        this.setState({
            RSRequired: event.target.checked
        })
    }

    RSRowsUpdate(i, event){
        let RSRows = [...this.state.RSRows];
        RSRows[i] = event.target.value;
        this.setState({ RSRows });
    }

    RSColsUpdate(i, event){
        let RSCols = [...this.state.RSCols];
        RSCols[i] = event.target.value;
        this.setState({ RSCols });
    }

    RSDeleteRows(i){
        let RSRows = [...this.state.RSRows];
        RSRows.splice(i, 1);
        this.setState({ RSRows });
    }

    RSDeleteCols(i){
        let RSCols = [...this.state.RSCols];
        RSCols.splice(i, 1);
        this.setState({ RSCols });
    }

    RSAddRowClick(){
        this.setState(prevState => ({
            RSNewRows: [...prevState.RSNewRows, '']
        }))
    }

    RSAddColClick(){
        this.setState(prevState => ({
            RSNewCols: [...prevState.RSNewCols, '']
        }))
    }

    RSNewRowsUpdate(i, event){
        let RSNewRows = [...this.state.RSNewRows];
        RSNewRows[i] = event.target.value;
        this.setState({ RSNewRows });
    }

    RSNewColsUpdate(i, event){
        let RSNewCols = [...this.state.RSNewCols];
        RSNewCols[i] = event.target.value;
        this.setState({ RSNewCols });
    }

    RSDeleteNewRows(i){
        let RSNewRows = [...this.state.RSNewRows];
        RSNewRows.splice(i, 1);
        this.setState({ RSNewRows });
    }

    RSDeleteNewCols(i){
        let RSNewCols = [...this.state.RSNewCols];
        RSNewCols.splice(i, 1);
        this.setState({ RSNewCols });
    }

    RSCreateNewRows(){
        return this.state.RSNewRows.map((el, i) => 
            <div key={i}>
                <InputGroup>
                    <Input value={el||''} onChange={this.RSNewRowsUpdate.bind(this, i)} />
                    <InputGroupAddon addonType="append">
                        <Button onClick={this.RSDeleteNewRows.bind(this, i)}>Delete</Button>
                    </InputGroupAddon>
                </InputGroup>
                <br/>
            </div>
        )
    }

    RSCreateNewCols(){
        return this.state.RSNewCols.map((el, i) =>
            <div key={i}>
                <InputGroup>
                    <Input value={el||''} onChange={this.RSNewColsUpdate.bind(this, i)} />
                    <InputGroupAddon addonType="append">
                        <Button onClick={this.RSDeleteNewCols.bind(this, i)}>Delete</Button>
                    </InputGroupAddon>
                </InputGroup>
                <br/>
            </div>
        )
    }

    RSChangeSave(id, qt, ir){
        const OpsRows = [...this.state.RSRows, ...this.state.RSNewRows];
        const OpsRowsString = [...this.state.RSRows, ...this.state.RSNewRows].join("|R|");
        const OpsCols = [...this.state.RSCols, ...this.state.RSNewCols];
        const OpsColsString = [...this.state.RSCols, ...this.state.RSNewCols].join("|C|");
        //const ops = OpsRowsString + "/RC/" + OpsColsString;
		const ops = JSON.stringify({"Row": OpsRows, "Col": OpsCols});
        if(!qt) {
            swal({
                title: "Please input a question!",
                icon: "warning"
            })
        } else if (OpsRows.includes("")) {
            swal({
                title: "Please input all the rows!",
                icon: "warning"
            })
        } else if (OpsCols.includes("")){
            swal({
                title: "Please input all the cols!",
                icon: "warning"
            })
        } else {
            this.props
            .updateSurveyItem({
                selector: {documentId: id},
                data: {
                    surveyItemQuestion: qt,
                    required: ir,
                    surveyItemOptions: ops,
                }
            });
            this.setState({
                isOpen: false
            })
        }
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
            const {i} = this.props;
            const {surveyList} = this.props;
            const numOptions = JSON.parse(surveyItem.surveyItemOptions || '').length;


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
                                    <Table bordered style={{textAlign: 'center'}}>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                {JSON.parse(surveyItem.surveyItemOptions || '')["Col"].map((el, i) => 
                                                    <th key={i}>{el}</th>
                                                )}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {JSON.parse(surveyItem.surveyItemOptions || '')["Row"].map((el, i) => 
                                                <tr key={i}>
                                                    <th key={i}>{el}</th>
                                                    {[...Array(JSON.parse(surveyItem.surveyItemOptions || '')["Col"].length)].map((el, i) =>
                                                        <td key={i}>
                                                        <Input type="radio" disabled />
                                                        </td>
                                                    )}
                                                </tr>
                                            )}
                                        </tbody>
                                    </Table>
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
                                    <Table bordered style={{textAlign: 'center'}}>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                {JSON.parse(surveyItem.surveyItemOptions || '')["Col"].map((el, i) => 
                                                    <th key={i}>{el}</th>
                                                )}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {JSON.parse(surveyItem.surveyItemOptions || '')["Row"].map((el, i) => 
                                                <tr key={i}>
                                                    <th key={i}>{el}</th>
                                                    {[...Array(JSON.parse(surveyItem.surveyItemOptions || '')["Col"].length)].map((el, i) =>
                                                        <td key={i}>
                                                        <Input type="radio" disabled />
                                                        </td>
                                                    )}
                                                </tr>
                                            )}
                                        </tbody>
                                    </Table>
                                </FormGroup>
                            </Form>
                        </div>
                    }



                    {/*-------------------------------------------------- Editting Modal ---------------------------------------------------------- */}
                    <Modal isOpen={this.state.isOpen} toggle={this.toggle.bind(this)}>
                    <ModalBody>
                        <Form>
                            {/*------------------------ Update SurveyItemQuestion ------------------------*/}
                            <FormGroup>
                                Q{i+1}
                                <Input value={this.state.RSQuestion} onChange={this.EditChangeFunc.bind(this)} />
                            </FormGroup>

                            {/*------------------------ Update required ------------------------*/}
                            <FormGroup check>
                            <Label check>
                                <Input type="checkbox" defaultChecked={this.state.RSRequired} onChange={this.isRequiredChangeFunc.bind(this)} />{'   '}
                                Required
                            </Label>
                            </FormGroup>

                            <br/>

                            {/*------------------------ Update SurveyItem Rows ------------------------*/}
                            <FormGroup>
                                <Label>Rows</Label>
                            </FormGroup>
                            {this.state.RSRows.map((el, i) => 
                                <FormGroup key={i}>
                                    <InputGroup>
                                        <Input value={el||''} onChange={this.RSRowsUpdate.bind(this, i)} />
                                        <InputGroupAddon addonType="append">
                                            <Button onClick={this.RSDeleteRows.bind(this, i)}>Delete</Button>
                                        </InputGroupAddon>
                                    </InputGroup>
                                </FormGroup>
                            )}
                            { this.RSCreateNewRows() }

        
                            {/*------------------------ Update SurveyItem Cols ------------------------*/}
                            <FormGroup>
                                <Label>Cols</Label>
                            </FormGroup>
                            {this.state.RSCols.map((el,i) =>
                                <FormGroup key={i}>
                                    <InputGroup>
                                        <Input value={el||''} onChange={this.RSColsUpdate.bind(this, i)} />
                                        <InputGroupAddon addonType="append">
                                            <Button onClick={this.RSDeleteCols.bind(this, i)}>Delete</Button>
                                        </InputGroupAddon>
                                    </InputGroup>
                                </FormGroup>
                            )}
                            { this.RSCreateNewCols() }


                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" size="sm" onClick={this.RSAddRowClick.bind(this)}>Add Row</Button>
                        <Button color="primary" size="sm" onClick={this.RSAddColClick.bind(this)}>Add Col</Button>
                        <Button color="primary" size="sm" onClick={this.RSChangeSave.bind(this, surveyItem._id, this.state.RSQuestion, this.state.RSRequired)}>Save</Button>
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
    name: 'RatingScaleDisplay',
    component: RatingScaleDisplay,
    hocs: [[withUpdate, UpdateOptions]]
})
;