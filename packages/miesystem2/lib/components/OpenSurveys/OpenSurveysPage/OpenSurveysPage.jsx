import { Components, registerComponent, withDocument, withCurrentUser, getActions, withCreate } from 'meteor/vulcan:core';
import { SurveyLists } from '../../../modules/SurveyLists/index.js';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import { Button, Container, Row, Col } from 'reactstrap';
import swal from 'sweetalert';

class OpenSurveysPage extends Component {

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

            const surveyList = this.props.document;

            return(

                <div className="PageA4">

                <br/><br/>
                    <div style={{marginLeft: '20px', marginRight: '20px'}}>

                    <Components.OpenSurveysInfoPage surveyList={surveyList} />

                    <Components.OpenSurveysQuestionThread
                        terms={{surveyListId: surveyList._id, view: 'surveyListSurveyItems'}}
                        surveyList={surveyList}
                    />

                    </div>
                </div>

            )
        }
    }
}

OpenSurveysPage.displayName = "OpenSurveysPage";

const queryOptions = {
    collection: SurveyLists,
    queryName: 'opensurveysSingleQuery'
}

OpenSurveysPage.propTypes = {
    documentId: PropTypes.string,
    document: PropTypes.object,
}

registerComponent({
    name: 'OpenSurveysPage',
    component: OpenSurveysPage,
    hocs: [[withDocument, queryOptions]]
});