import { Components, registerComponent, withDocument, withCurrentUser, getActions, withCreate } from 'meteor/vulcan:core';
import { SurveyLists } from '../../../modules/SurveyLists/index.js';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import { Button, Container, Row, Col } from 'reactstrap';
import swal from 'sweetalert';

class ParticipatedSurveysPage extends Component {

    constructor(props){
        super(props);
        this.state = {

        }
    }

    GoBack() {
        window.history.back();
    }

    render(){

        if (this.props.loading) {

            return <div><Components.Loading /></div>

        } else if (!this.props.document) {

            return <div><FormattedMessage id="app.404" /></div>

        } else {

            const surveyResponse = this.props.document;

            return(

                <div className="PageA4">

                <br/><br/>
                    <div style={{marginLeft: '20px', marginRight: '20px'}}>

                    <Components.ParticipatedSurveysInfoPage surveyResponse={surveyResponse} />
                    
                    <Components.PSSurveyResponseSurveyList
                        terms={{_id: surveyResponse.surveyListId, view: 'SurveyResponse2SurveyList'}}
                        surveyResponse={surveyResponse}
                    />
                    
                    </div>
                </div>

            )
        }
    }
}

ParticipatedSurveysPage.displayName = "ParticipatedSurveysPage";

const queryOptions = {
    collectionName: 'SurveyResponses',
    queryName: 'ParticipatedSurveysPageQuery'
}

ParticipatedSurveysPage.propTypes = {
    documentId: PropTypes.string,
    document: PropTypes.object,
}

registerComponent({
    name: 'ParticipatedSurveysPage',
    component: ParticipatedSurveysPage,
    hocs: [[withDocument, queryOptions]]
});