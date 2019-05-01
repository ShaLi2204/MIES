import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withList, withCurrentUser, Components, registerComponent, Utils, withCreate, withUpdate, withDelete, withDocument } from 'meteor/vulcan:core';
import { Button, Container, Row, Col, Modal, ModalHeader, ModalFooter, ModalBody, Input, InputGroup, InputGroupAddon, Form, FormGroup, Label, Table} from 'reactstrap';

/* ---------------------------------------------- OpenSurveys OSMatrixSurveyItemOptionsList Component -----------------------------------------------*/

class OSMatrixSurveyItemOptionsList extends Component{

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
                                    <Input type="radio" />
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

OSMatrixSurveyItemOptionsList.displayName = "OSMatrixSurveyItemOptionsList";

const matrixSurveyItemOptionsQuery = {
    collectionName: 'MatrixSurveyItemOptions',
    queryName: 'MatrixSurveyItemOptionsQuery',
    limit: 0
}

registerComponent({
    name: 'OSMatrixSurveyItemOptionsList',
    component: OSMatrixSurveyItemOptionsList,
    hocs: [[withList, matrixSurveyItemOptionsQuery], withCurrentUser]
});


/* ---------------------------------------------- OpenSurveys OSMatrixSurveyItemTitle Component -----------------------------------------------*/

const OSMatrixSurveyItemTitle = (props) => {

    const { loading, results, currentUser, terms } = props;
    const resultsClone = _.map(results, _.clone);

    if(loading) {

        return <Components.Loading />

    } else {

        return(
            <div>
                {resultsClone[0].title}
            </div>
        )
    }
}
OSMatrixSurveyItemTitle.displayName = "OSMatrixSurveyItemTitle";

OSMatrixSurveyItemTitle.propTypes = {
    currentUser: PropTypes.object
};

const optionsOSTitle = {
    collectionName: 'MatrixSurveyItems',
    queryName: 'OSMatrixSurveyItemsQuery',
    limit: 0
};

registerComponent({
    name: 'OSMatrixSurveyItemTitle',
    component: OSMatrixSurveyItemTitle,
    hocs: [[withList, optionsOSTitle], withCurrentUser]
});


/* ---------------------------------------------- OpenSurveys SurveyItemRatingScale Component -----------------------------------------------*/

class OSSurveyItemsRatingScale extends Component{

    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){

        const {group} = this.props;
        const {grouped} = this.props;

        const numRows = grouped[group].length;

        return(
            <div>
                {console.log(group)}
                <Form>
                    <FormGroup>
                        <legend>
                            <Components.OSMatrixSurveyItemTitle terms={{_id: group, view:'surveyItemmatrixSurveyItem'}}  /> 
                        </legend>
                            <Components.OSMatrixSurveyItemOptionsList terms={{matrixSurveyItemId:group, view: 'surveyItemMatrixSurveyItemOptions'}} grouped={grouped} group={group} numRows={numRows} />
                    </FormGroup>
                </Form>
            </div>
        )
    }
}

OSSurveyItemsRatingScale.displayName = "OSSurveyItemsRatingScale";

registerComponent({
    name: 'OSSurveyItemsRatingScale',
    component: OSSurveyItemsRatingScale
});