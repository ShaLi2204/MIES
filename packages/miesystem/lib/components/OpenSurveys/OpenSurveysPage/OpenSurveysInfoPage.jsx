import { Components, registerComponent } from 'meteor/vulcan:core';
import React, { PureComponent, Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import { Link } from 'react-router';
//import SurveyLists from '../../modules/Surveys/collection';
import { SurveyLists } from '../../../modules/Surveys/index.js';
import moment from 'moment';
import { Form, FormGroup, Button, Container, Row, Col, ListGroup, ListGroupItem, Table } from 'reactstrap';

class OpenSurveysInfoPage extends Component {

    GoBack() {
        window.history.back();
    }

    render() {

        const {surveyList} = this.props;

        return(
            <div>
                <Form>
                    <FormGroup>
                        <h1>{surveyList.title}</h1>
                        <h3>{surveyList.description}</h3>
                    </FormGroup>
                </Form>
            </div>
        )
    }
}

OpenSurveysInfoPage.displayName = "OpenSurveysInfoPage";

OpenSurveysInfoPage.propTypes = {
    currentUser: PropTypes.object,
    surveyList: PropTypes.object.isRequired,
    terms: PropTypes.object
};

registerComponent({
    name: 'OpenSurveysInfoPage',
    component: OpenSurveysInfoPage
});