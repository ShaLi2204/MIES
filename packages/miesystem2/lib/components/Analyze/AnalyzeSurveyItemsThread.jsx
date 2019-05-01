import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import { withList, withCurrentUser, Components, registerComponent, withDocument, Utils } from 'meteor/vulcan:core';
import { 
    Alert,
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

class AnalyzeSurveyItemsThread extends Component {

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
            const {results} = this.props;
            const resultsClone = _.map(results, _.clone);
            const {totalCount} = this.props;
        
            if(totalCount==0) {
    
                return (
                    <div style={{marginTop: '20px'}}>
                        <Alert color="danger">
                            No Answers Yet!
                        </Alert>
                    </div>
                )
    
            } else if (surveyItem.surveyItemType=="TextBox") {
    
                return (
                    <div>
                        <Components.SATextBox surveyItemResponses={resultsClone} surveyItem={surveyItem} loading={loading} surveyList={surveyList}/>
                    </div>
                )
    
            } else if (surveyItem.surveyItemType=="CommentBox") {
    
                return(
                    <div>
                        <Components.SACommentBox surveyItemResponses={resultsClone} surveyItem={surveyItem} loading={loading} surveyList={surveyList} />
                    </div>
                )
            } else if (surveyItem.surveyItemType=="MultipleChoice"){
    
                return(
                    <div>
                        <Components.SAMultipleChoice surveyItemResponses={resultsClone} surveyItem={surveyItem} loading={loading} surveyList={surveyList} />
                    </div>
                )
            } else if (surveyItem.surveyItemType=="CheckBox") {
    
                return (
                    <div>
                        <Components.SACheckBox surveyItemResponses={resultsClone} surveyItem={surveyItem} loading={loading} surveyList={surveyList} />
                    </div>
                )
            } else if (surveyItem.surveyItemType=="RatingScale"){
    
                return (
                    <div>
                        <Components.SARatingScale surveyItemResponses={resultsClone} surveyItem={surveyItem} loading={loading} surveyList={surveyList} />
                    </div>
                )
            } else if (surveyItem.surveyItemType=="SelfTracking") {
    
                return (
                    <div>
                        <Components.SASelfTracking surveyItemResponses={resultsClone} surveyItem={surveyItem} loading={loading} surveyList={surveyList} />
                    </div>
                )
            } else {
                return(
                    <div>
                        Wrong survey item type
                    </div>
                )
            }
        }
    } 
}


const queryOption = {
    collectionName: 'SurveyItemResponses',
    queryName: 'AnalyzeSurveyItemsThreadQuery',
    limit: 0
}


registerComponent({
    name: 'AnalyzeSurveyItemsThread',
    component: AnalyzeSurveyItemsThread,
    hocs: [[withList, queryOption], withCurrentUser]
});