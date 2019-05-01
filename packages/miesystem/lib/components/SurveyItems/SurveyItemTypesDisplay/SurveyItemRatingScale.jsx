import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withList, withCurrentUser, Components, registerComponent, Utils, withCreate, withUpdate, withDelete, withDocument } from 'meteor/vulcan:core';
import { Button, Container, Row, Col, Modal, ModalHeader, ModalFooter, ModalBody, Input, InputGroup, InputGroupAddon, Form, FormGroup, Label, Table} from 'reactstrap';

/* ---------------------------------------------- MatrixSurveyItemOptionsList Component -----------------------------------------------*/

class MatrixSurveyItemOptionsList extends Component{

    FuncDeleteSurveyItemOptions(){
        resultsCloneMatrix.map((matrixSurveyItem,i) =>
        this.props
        .deleteMatrixSurveyItem({
            selector: {documentId: matrixSurveyItem._id}
        })
        )
    }

    render(){

        const {results, loading, currentUser, terms, numRows, grouped, group} = this.props;

        const resultsCloneMatrix = _.map(results, _.clone);

        const numCols = resultsCloneMatrix.length;

        if (loading) {
            return <Components.Loading />
        } else {

        return(
            <div>
            <Table bordered style={{textAlign: 'center'}}>
                <thead>
                    <tr>
                        <th>
                            #
                        </th>
                        {resultsCloneMatrix.map((matrixSurveyItemOption,i) =>
                            <th key={i}>
                                {matrixSurveyItemOption.options}
                            </th>
                        )}
                    </tr>
                </thead>
                <tbody>
                        {grouped[group].map((item,i) => 
                        <tr key={i}>
                            <th scope="row" key={i}>
                                {item.label}
                            </th>
                            {[...Array(numCols)].map((c,i) =>
                                <td style={{textAlign: 'center'}} key={i}>
                                <Input type="radio" disabled />
                                </td>
                            )}
                        </tr>
                        )}
                </tbody>
            </Table>
            </div>
        )
    }
    }

}

const matrixSurveyItemOptionsQuery = {
    collectionName: 'MatrixSurveyItemOptions',
    queryName: 'MatrixSurveyItemOptionsQuery',
    limit: 0
}

const matrixSurveyItenOptionsDelete  = {
    collectionName: 'MatrixSurveyItemOptions'
}

registerComponent({ name: 'MatrixSurveyItemOptionsList', component: MatrixSurveyItemOptionsList, hocs:[[withList, matrixSurveyItemOptionsQuery], withCurrentUser, [withDelete,matrixSurveyItenOptionsDelete]]});

/* ---------------------------------------------- MatrixSurveyItemTitle Component -----------------------------------------------*/

const MatrixSurveyItemTitle = (props) => {

    const {loading, results, currentUser, terms, renderConsole } = props;

    if (loading) {

        return <Components.Loading/>

    } else {

        const resultsClone = _.map(results, _.clone);

        return(

            <div>

                {resultsClone[0].title}
                <br/>

            </div>

        )
    }
}

MatrixSurveyItemTitle.propTypes = {
    currentUser: PropTypes.object
}


const options1 = {
    collectionName: 'MatrixSurveyItems',
    queryName: 'MatrixSurveyItemsQuery',
    limit: 0
}

registerComponent({ name: 'MatrixSurveyItemTitle', component: MatrixSurveyItemTitle, hocs: [[withList, options1], withCurrentUser]});


/* ---------------------------------------------- Edit MatrixSurveyItems Title Component -----------------------------------------------*/

class EditMatrixSurveyItemTitle extends Component{

    constructor(props){
        super(props);
        this.state = {
            MatrixSurveyItemTitleValue: _.map(props.results, _.clone)[0].title,
            id: _.map(props.results, _.clone)[0]._id
        }
    }

    changeMatrixSurveyItemTitle(event){
        this.setState({
            MatrixSurveyItemTitleValue: event.target.value
        });
        //this.props.saveMatrixSurveyItemTitleValue(event.target.value);
        this.props
        .updateMatrixSurveyItem({
            selector: { documentId: this.state.id },
            data: {title: event.target.value}
        })
    }

    render(){

        const {loading, results, currentUser, terms, renderConsole } = this.props;

        const resultsCloneEditTitle = _.map(results, _.clone);

        return(
            <div>
            <Input value={this.state.MatrixSurveyItemTitleValue} onChange={this.changeMatrixSurveyItemTitle.bind(this)} />
            </div>
        )
    }
}


EditMatrixSurveyItemTitle.propTypes = {
    currentUser: PropTypes.object
}


const options2 = {
    collectionName: 'MatrixSurveyItems',
    queryName: 'MatrixSurveyItemsQuery',
    limit: 0
}

const updateMatrixSurveyItemOption = {
    collectionName: 'MatrixSurveyItems'
}

registerComponent({ name: 'EditMatrixSurveyItemTitle', component: EditMatrixSurveyItemTitle, hocs: [[withList, options2], [withUpdate, updateMatrixSurveyItemOption], withCurrentUser]});



/* ---------------------------------------------- Edit MatrixSurveyItemOptions Component -----------------------------------------------*/

class EditSurveyItemOptions extends Component {

    constructor(props){
        super(props);
        this.state = {
            valuesCol: []
        }
    }

    EditMatrixSurveyItemOptions(id, event) {
        this.props
        .updateMatrixSurveyItemOption({
            selector: {documentId: id},
            data: {options: event.target.value}
        })
    }

    EditAddCol(){
        this.setState(prevState => ({valuesCol: [...prevState.valuesCol,'']}))        
    }

    createEditCol() {
        return this.state.valuesCol.map((el,i) => 
        <div key={i}>
            <InputGroup>
                <Input value={el||''} onChange={this.handleEditColCreate.bind(this,i)} />
                <InputGroupAddon addonType="append">
                    <Button onClick={this.DeleteEditCol.bind(this, i)}>Delete</Button>
                </InputGroupAddon>
            </InputGroup>
            <br/>
        </div>
        )
    }

    DeleteEditCol(i) {
        let valuesCol = [...this.state.valuesCol];
        valuesCol.splice(i,1);
        this.setState({ valuesCol });
        this.props.getCreateColValue(valuesCol);
    }

    handleEditColCreate(i, event){
        let valuesCol = [...this.state.valuesCol];
        valuesCol[i] = event.target.value;
        this.setState({ valuesCol });
        this.props.getCreateColValue(valuesCol);
    }

    DeleteCol(i){
        this.props
        .DeleteMatrixSurveyItemOption({
            selector: {documentId: i}
        })
    }

    render(){

        const {results, loading, currentUser, terms} = this.props;

        const resultsCloneMatrixOptions = _.map(results, _.clone);

        if (loading) {

            return <Components.Loading />

        } else {
            return(
                <div>
                    <Form>
                        <Container>
                            <Row>
                                <Col xs="6">Cols</Col>
                                <Col xs="6">
                                <Button size="sm" color="primary" onClick={this.EditAddCol.bind(this)}>New Col</Button>
                                </Col>
                            </Row>
                        </Container>
                        {resultsCloneMatrixOptions.map((item, i) => 
                        <div>
                            <FormGroup>
                                <InputGroup>
                                <Input key={i} value={item.options} onChange={this.EditMatrixSurveyItemOptions.bind(this, item._id)} />
                                <InputGroupAddon addonType="append">
                                <Button onClick={this.DeleteCol.bind(this,item._id)} disabled>Delete</Button> 
                                </InputGroupAddon>
                                </InputGroup>
                            </FormGroup>
                        </div>
                        )}
                        {this.createEditCol()}
                    </Form>
                </div>
            )
        }
    }
}

const matrixSurveyItemOptionsQuery2 = {
    collectionName: 'MatrixSurveyItemOptions',
    queryName: 'MatrixSurveyItemOptionsQuery',
    limit: 0
}

const updateMatrixSurveyItemOptionOption = {
    collectionName: 'MatrixSurveyItemOptions'
}

const DeleteMatrixSurveyItemOptionOption = {
    collectionName: 'MatrixSurveyItemOptions'
}

registerComponent({ name: 'EditSurveyItemOptions', component: EditSurveyItemOptions, hocs:[[withList, matrixSurveyItemOptionsQuery2], withCurrentUser, [withUpdate, updateMatrixSurveyItemOptionOption],[withDelete, DeleteMatrixSurveyItemOptionOption]]});


/* ---------------------------------------------- Edit SurveyItem Labels Component -----------------------------------------------*/

class EditSurveyItems extends Component{

    constructor(props){
        super(props);
        this.state = {
            valuesRow: [],
            surveyListId: props.grouped[props.group][0].surveyListId
        }
    }

    EditSurveyItemLabel(id, event){
        this.props
        .updateSurveyItem({
            selector: {documentId: id},
            data: {label: event.target.value}
        })
    }

    EditAddRow(){
        this.setState(prevState => ({valuesRow: [...prevState.valuesRow,'']}))
    }

    createEditRow(){
        return this.state.valuesRow.map((el,i) =>
            <div key={i}>
                <InputGroup>
                    <Input value={el||''} onChange={this.handleEditRowCreate.bind(this,i)} />
                    <InputGroupAddon addonType="append">
                        <Button onClick={this.DeleteEditRow.bind(this,i)}>Delete</Button>
                    </InputGroupAddon>
                </InputGroup>
                <br/>
            </div>
        )
    }

    DeleteEditRow(i){
        let valuesRow = [...this.state.valuesRow];
        valuesRow.splice(i,1);
        this.setState({ valuesRow });
        this.props.getCreateRowValue(valuesRow);
    }

    handleEditRowCreate(i, event){
        let valuesRow = [...this.state.valuesRow];
        valuesRow[i] = event.target.value;
        this.setState({ valuesRow });
        this.props.getCreateRowValue(valuesRow);
    }

    DeleteRow(i){
        this.props
        deleteSurveyItem({
            selector: {documentId:i}
        })
    }

    render(){

        const {results, loading, currentUser, terms, nowRows, grouped, group } = this.props;

        const resultsCloneSurveyItems = _.map(results, _.clone);

        return(

            <div>
                <Form>
                    <Container>
                        <Row>
                            <Col xs="6">
                                <Label>Rows</Label>
                            </Col>
                            <Col xs="6">
                                <Button size="sm" color="primary" onClick={this.EditAddRow.bind(this)}>New Row</Button>
                            </Col>
                    </Row>
                    </Container>
                {grouped[group].map((item, i) => 
                <div>
                    <FormGroup>
                        <InputGroup>
                        <Input key={i} value={item.label} onChange={this.EditSurveyItemLabel.bind(this,item._id)} />
                        <InputGroupAddon addonType="append">
                        <Button onClick={this.DeleteRow.bind(this, item._id)} disabled>Delete</Button>
                        </InputGroupAddon>
                        </InputGroup>
                    </FormGroup>
                </div>
                )}
                {this.createEditRow()}
                </Form>
            </div>
        )

    }
}

const updateSurveyItemOption = {
    collectionName: 'SurveyItems'
}

const deleteSurveyItemOption = {
    collectionName: 'SurveyItems'
}

registerComponent({ name:'EditSurveyItems', component: EditSurveyItems, hocs: [[withUpdate,updateSurveyItemOption],[withDelete, deleteSurveyItemOption]] });


/* ---------------------------------------------- SurveyItemRatingScale Component -----------------------------------------------*/


class SurveyItemRatingScale extends Component {

    constructor(props){
        super(props);
        this.child = React.createRef();
        this.childSaveMatrixTitle = React.createRef();
        this.state = {
            MatrixTitleShowBtn: false,
            isOpenEdit: false,
            isOpenDelete: false,
            MatrixSurveyItemTitleValue: '',
            createRowValue: [],
            createColValue: [],
            surveyListId: props.grouped[props.group][0].surveyListId,
            isRequired: props.grouped[props.group][0].required
        }
    }

    renderConsole(t){
        console.log(t)
    }

    handleMouseHoverEnter(){
        this.setState({
            MatrixTitleShowBtn: true
        })
    }

    handleMouseHoverLeave(){
        this.setState({
            MatrixTitleShowBtn: false
        })
    }

    EditBtnFunc(){
        this.setState({
            isOpenEdit: true
        })
    }

    DeleteBtnFunc(){
        this.setState({
            isOpenDelete: true
        })
    }

    toggleEdit(){
        this.setState(prevState => ({
            isOpenEdit: !prevState.isOpenEdit
        }))
    }

    toggleDelete(){
        this.setState(prevState => ({
            isOpenDelete: !prevState.isOpenDelete
        }))
    }

    DeleteMatrix(){
        const {grouped} = this.props;
        const {group} = this.props;
        // Delete MatrixSurveyItem
        this.props
        .deleteMatrixSurveyItem({
            selector:{ documentId: group }
        });
        // Delete corresponding surveyItems
        grouped[group].map((item,i) => 
            this.props
            .deleteSurveyItem({
                selector: { documentId:item._id }
            })
        );
        // Delete corresponding matrixSurveyItemOptions
        this.child.current.FuncDeleteSurveyItemOptions();
    }

    CancelDelete(){
        this.setState({
            isOpenDelete: false
        })
    }

    SaveEdit(matrixId, surveyListId, ir, group) {
        this.state.createRowValue.map((t,i) =>
        this.props
        .createSurveyItem({
            data: {
                label: t,
                matrixSurveyItemId: matrixId,
                surveyListId: surveyListId,
                surveyItemType:'RatingScale',
                required: ir
            }
        })
        );
        this.state.createColValue.map((t,i) =>
        this.props
        .createMatrixSurveyItemOption({
            data: {
                options: t,
                matrixSurveyItemId: group
            }
        })
        );
        this.setState({
            isOpenEdit: false
        });
    }

    CancelEdit(){
        this.setState({
            isOpenEdit: false
        })
    }

    saveMatrixSurveyItemTitleValue(t){
        this.setState({
            MatrixSurveyItemTitleValue: t
        })
    }

    getCreateRowValue(t){
        this.setState({
            createRowValue: t
        })
    }

    getCreateColValue(t){
        this.setState({
            createColValue: t
        })
    }

    render(){

        const {group} = this.props;
        const {grouped} = this.props;
        //const {surveyListId} = this.props;

        const numRows = grouped[group].length;

        return(

            <div
            className={this.state.MatrixTitleShowBtn ? "SurveyItemDisplayHover" : "SurveyItemDisplay"}
            onMouseEnter={this.handleMouseHoverEnter.bind(this)}
            onMouseLeave={this.handleMouseHoverLeave.bind(this)}
            >
                <Container>
                    <Row>
                        <Col xs="6">
                        <Components.MatrixSurveyItemTitle terms={{_id: group, view:'surveyItemmatrixSurveyItem'}} renderConsole={this.renderConsole.bind(this)} />
                        </Col>
                        <Col xs="6">
                            {this.state.MatrixTitleShowBtn && 
                                <div style={{textAlign:'right'}}>
                                    <Button size="sm" onClick={this.EditBtnFunc.bind(this)}>Edit</Button>{'   '}
                                    <Button size="sm" onClick={this.DeleteBtnFunc.bind(this)}>Delete</Button>
                                </div>
                            }
                        </Col>
                    </Row>
                </Container>
                <Components.MatrixSurveyItemOptionsList terms={{matrixSurveyItemId:group, view: 'surveyItemMatrixSurveyItemOptions'}} grouped={grouped} group={group} numRows={numRows} renderConsole={this.renderConsole.bind(this)} /*ref={this.child}*/ /> 
                <br/>

                {/* ----------------------------------------- Edit Modal ---------------------------------------------------*/}
                <Modal isOpen={this.state.isOpenEdit} toggle={this.toggleEdit.bind(this)}>
                    <ModalBody>
                        <Form>
                        {/*-------------------- Component for editing matrix survey item title ------------------------*/}
                        <Components.EditMatrixSurveyItemTitle terms={{_id: group, view:'surveyItemmatrixSurveyItem'}} renderConsole={this.renderConsole.bind(this)} saveMatrixSurveyItemTitleValue={this.saveMatrixSurveyItemTitleValue.bind(this)} />
                        <br/>
                        {/*-------------------- Component for editing survey item labels ------------------------*/}
                        <Components.EditSurveyItems terms={{matrixSurveyItemId:group, view: 'surveyItemMatrixSurveyItemOptions'}} grouped={grouped} group={group} numRows={numRows} getCreateRowValue={this.getCreateRowValue.bind(this)} /> 
                        <br/>
                        {/*-------------------- Component for editing matrix survey item options ------------------------*/}
                        <Components.EditSurveyItemOptions terms={{matrixSurveyItemId: group, view: 'surveyItemMatrixSurveyItemOptions'}} getCreateColValue={this.getCreateColValue.bind(this)} />
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.SaveEdit.bind(this, group, this.state.surveyListId, this.state.isRequired, group)}>Save</Button>
                        <Button outline onClick={this.CancelEdit.bind(this)}>Cancel</Button>
                    </ModalFooter>
                </Modal>

                {/* ----------------------------------------- Delete Modal ---------------------------------------------------*/}
                <Modal isOpen={this.state.isOpenDelete} toggle={this.toggleDelete.bind(this)}>
                <ModalHeader>Delete Matrix</ModalHeader>
                <ModalBody>Are  you sure you want to delete this matrix?</ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.DeleteMatrix.bind(this)}>Yes</Button>
                    <Button outline onClick={this.CancelDelete.bind(this)} disabled >Cancel</Button>
                </ModalFooter>
                </Modal>
            </div>
        )
    }
}

SurveyItemRatingScale.displayName = "SurveyItemRatingScale";

const MatrixSurveyItemsDelete = {
    collectionName: 'MatrixSurveyItems'
}

const SurveyItemsDelete = {
    collectionName: 'SurveyItems'
}

const SurveyItemsCreate = {
    collectionName: 'SurveyItems'
}

const MatrixSurveyItemOptionsOption = {
    collectionName: 'MatrixSurveyItemOptions'
}

registerComponent({ name: 'SurveyItemRatingScale', component: SurveyItemRatingScale, hocs: [[withDelete,MatrixSurveyItemsDelete],[withDelete,SurveyItemsDelete], [withCreate,SurveyItemsCreate], [withCreate, MatrixSurveyItemOptionsOption]] /*, hocs: [[withDocument, queryOptions]]*/});