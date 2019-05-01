import { Components, registerComponent, withDocument, withCurrentUser, getActions, withMutation } from 'meteor/vulcan:core';
import { SurveyLists } from '../../modules/Surveys/index.js';
//import SurveyLists from '../../modules/Surveys/collection';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FormattedMessage } from 'meteor/vulcan:i18n';

import { Button, Container, Dropdown, DropdownItem, DropdownToggle, DropdownMenu, Row, Col, ListGroup, ListGroupItem, Table } from 'reactstrap';


class SurveysNewPage extends Component{

    render(){

        if (this.props.loading) {

            return <div><Components.Loading/></div>

        } else if (!this.props.document) {

            return <div><FormattedMessage id="app.404"/></div>

        } else {

            const surveyList = this.props.document;

            return(
                <div>

                    <Components.SurveysInfoPage surveyList={surveyList} currentUser={this.props.currentUser}/>

                    {/*<Components.SurveyItemsNewForm />*/}

                    <div className="PageA4">

                        <Components.SurveysQuestionsThread 
                            terms={{surveyListId:surveyList._id, view:'surveyListSurveyItems'}}
                            //surveyListId={surveyList._id}
                        />

                        <Components.SurveyItemsNewForm surveyList={surveyList}/>

                    </div>
                
                </div>
            )
        }
    }
}

SurveysNewPage.displayName = "SurveysNewPage";

const queryOptions = {
    collection: SurveyLists,
    queryName: 'surveyListsSingleQuery',
}

SurveysNewPage.propTypes = {
    documentId: PropTypes.string,
    document: PropTypes.object,
}

registerComponent(

    'SurveysNewPage',
    // React component
    SurveysNewPage,
    // HOC to give access to the current user
    withCurrentUser,
    // HOC to load the data of the document, based on queryOptions & a documentId props
    [withDocument, queryOptions]

);