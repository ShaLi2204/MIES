import {Components, registerComponent, withDocument, withCurrentUser, getActions, withMutation } from 'meteor/vulcan:core';
import { SurveyLists } from '../../modules/Surveys/index.js';
//import SurveyLists from '../../modules/Surveys/collection.js';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FormattedMessage } from 'meteor/vulcan:i18n';

class SurveysPage extends Component{

    render() {

        if(this.props.loading) {

            return <div><Components.Loading/></div>

        } else if (!this.props.document) {

            return <div><FormattedMessage id="app.404"/></div>

        } else {

            const surveyList = this.props.document;

            return(
                <div>

                    <Components.SurveysInfoPage surveyList={surveyList} currentUser={this.props.currentUser}/>

                    <Components.SurveysQuestionsThread 
                        terms = {{surveyListId: surveyList._id, view:'surveyListSurveyItems'}}
                        surveyList={surveyList}
                        //surveyListId={surveyList._id} 
                    />

                </div>

            )

        }
    }
};

SurveysPage.displayName = "SurveysPage";

SurveysPage.propTypes = {
    documentId: PropTypes.string,
    document: PropTypes.object
}

const queryOptions = {
    collection: SurveyLists,
    queryName: 'surveyListsSingleQueryDisplay'
}

registerComponent(
    'SurveysPage',
    SurveysPage,
    withCurrentUser,
    [withDocument, queryOptions]
);