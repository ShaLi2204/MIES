import { Components, registerComponent, withDocument, withCurrentUser, getActions } from 'meteor/vulcan:core';
import { SurveyLists } from '../../../modules/Surveys/index.js';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import { Button, Container, Row, Col } from 'reactstrap';

class OpenSurveysPage extends Component {

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

                    <Components.OpenSurveysInfoPage surveyList={surveyList} />

                    <Components.OpenSurveysQuestionThread
                        terms={{surveyListId: surveyList._id, view: 'surveyListSurveyItems'}}
                    />

                    <Container>
                        <Row>
                            <Col xs="6">
                            <Button size="sm" color="primary">Save</Button>
                            </Col>
                            <Col xs="6">
                            <Button size="sm" color="primary" onClick={this.GoBack.bind(this)}>Back</Button>
                            </Col>
                        </Row>
                    </Container>


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