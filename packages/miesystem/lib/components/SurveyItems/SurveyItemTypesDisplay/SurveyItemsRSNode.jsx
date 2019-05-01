import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withList, withCurrentUser, Components, registerComponent, Utils, withCreate, withUpdate, withDelete, withDocument } from 'meteor/vulcan:core';
import { Button, Container, Row, Col, Modal, ModalFooter, ModalBody, Input, Form, FormGroup, Label, Table} from 'reactstrap';

/* ---------------------------------------------- SurveyItemOptionsThreadRS Component -----------------------------------------------*/

const SurveyItemOptionsThreadRS = (props) => {

    const{ results, currentUser, terms, grouped, numRows } = props;
    const resultsClone = _.map(results, _.clone);

    return(
        <div>
            <Components.SurveyItemOptionsListRS currentUser={currentUser} surveyItemOptions={resultsClone} grouped={grouped} numRows={numRows} />
        </div>
    )
}

SurveyItemOptionsThreadRS.displayName = "SurveyItemOptionsThreadRS";

SurveyItemOptionsThreadRS.propTypes = {
    currentUser: PropTypes.object
}

const optionsRS = {
    collectionName: 'SurveyItemOptions',
    queryName: 'SurveyItemOptionsThreadRSQuery',
    limit: 0
}

registerComponent({ name:'SurveyItemOptionsThreadRS', component: SurveyItemOptionsThreadRS, hocs:[[withList, optionsRS], withCurrentUser]});


/* ---------------------------------------------- SurveyItemOptionsListRS Component -----------------------------------------------*/

const SurveyItemOptionsListRS = ({surveyItemOptions, grouped, currentUser, numRows}) => {
    return(
        <div>
            <Table>
                <thead>
                    <tr>
                        {surveyItemOptions.map((surveyItemOption, i) => 
                            <th><Components.SurveyItemOptionsNodeRS i={i} currentUser={currentUser} surveyItemOption={surveyItemOption} key={surveyItemOption._id} numRows={numRows} /></th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    
                </tbody>
            </Table>

        </div>
    )
}

SurveyItemOptionsListRS.displayName = "SurveyItemOptionsListRS";

registerComponent({ name:'SurveyItemOptionsListRS', component: SurveyItemOptionsListRS});


/* ---------------------------------------------- SurveyItemOptionsNodeRS Component -----------------------------------------------*/

class SurveyItemOptionsNodeRS extends Component{

    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){

        const {surveyItemOption} = this.props;
        const {grouped} = this.props;

        return(
            <div>
                {surveyItemOption.options}
            </div>
        )
    }
}

SurveyItemOptionsNodeRS.propTypes = {
    surveyItemOption: PropTypes.object.isRequired,
    currentUser: PropTypes.object
}

SurveyItemOptionsNodeRS.displayName = "SurveyItemOptionsNodeRS";

registerComponent({ name:'SurveyItemOptionsNodeRS', component: SurveyItemOptionsNodeRS});



/* ---------------------------------------------- SurveyItemMRatingScale Component -----------------------------------------------*/

const MatrixSurveyItemTitle = (props) => {

    const {loading, results, currentUser, terms } = props;

    if (loading) {
        return <Components.Loading/>
    } else {
        const resultsClone = _.map(results, _.clone);
        return(
            <div>
                {resultsClone}
            </div>
        )
    }
}

MatrixSurveyItemTitle.propTypes = {
    currentUser: PropTypes.object
}


const options = {
    collectionName: 'MatrixSurveyItems',
    queryName: 'MatrixSurveyItemsQuery',
    limit: 0
}

registerComponent({ name: 'MatrixSurveyItemTitle', component: MatrixSurveyItemTitle, hocs: [[withList, options], withCurrentUser]});

/* ---------------------------------------------- SurveyItemMRatingScale Component -----------------------------------------------*/


class SurveyItemsRSNode extends Component {

    renderConsole(t){
        console.log(t)
    }

    render(){

        const {group} = this.props;
        const {grouped} = this.props;

        const numRows = grouped[group].length;

        return(

            <div>

                {/*<Components.MatrixSurveyItemTitle terms={{_id: group, view:'surveyItemmatrixSurveyItem'}} />*/}
                <div className="RSContainer">
                <div className="RSSurveyItems">
                <Table>
                    <thead>
                        <tr>
                            <th>#</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">
                                {grouped[group].map((item,i) => 
                                    <div>
                                        {item.label}
                                    </div>
                                )}
                            </th>
                        </tr>
                    </tbody>
                </Table>
                </div>
                <div className="RSSurveyItemOptions">
                {/*<Components.SurveyItemOptionsThreadRS terms={{surveyItemId:grouped[group][0]._id, view: 'surveyItemSurveyItemOptions'}} grouped={grouped} numRows={numRows} />*/}
                </div>
                </div>
            </div>

        )
    }
}

const queryOptions = {
    collection: 'SurveyItems',
    queryName: 'surveyItemQuery'
}

SurveyItemsRSNode.displayName = "SurveyItemsRSNode";

registerComponent({ name: 'SurveyItemsRSNode', component: SurveyItemsRSNode, hocs: [[withDocument, queryOptions]]});