import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import { withList, withCurrentUser, Components, registerComponent, withDocument, Utils } from 'meteor/vulcan:core';
import { 
    Button, 
    ListGroup, 
    ListGroupItem, 
    Container, 
    Row, 
    Col, 
    Modal, 
    ModalHeader, 
    ModalFooter,
    ModalBody,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle
} from 'reactstrap';

class AnalyzeSurveyItemsList extends Component {

    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){

        const {loading} = this.props;

        if(loading) {

            return <Components.Loading />

        } else {

            const {surveyItem} = this.props;
            const {surveyList} = this.props;

            return(
                <div style={{marginTop: '30px'}}>
                    {console.log("SurveyItemInfohere")}
                    {console.log(surveyItem._id)}
                    <Components.AnalyzeSurveyItemsThread 
                        terms={{surveyItemId: surveyItem._id, view: 'surveyItem2AllSurveyItemResponses'}}
                        surveyItem={surveyItem}
                        surveyList={surveyList}
                        loading={loading}
                    />
                </div>
            )

        }


    }
}

const queryOption = {
    collectionName: 'SurveyItems',
    queryName: 'AnalyzeSurveyItemsListQuery',
    limit: 0
}


registerComponent({
    name: 'AnalyzeSurveyItemsList',
    component: AnalyzeSurveyItemsList,
    hocs: [[withDocument, queryOption], withCurrentUser]
});