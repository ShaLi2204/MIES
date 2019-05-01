import { Components, registerComponent, withList, withDocument } from 'meteor/vulcan:core';
import React, { PureComponent, Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import { Link } from 'react-router';
import { SurveyLists } from '../../../modules/SurveyLists/index.js';
import moment from 'moment';
import { 
    Form, 
    FormGroup, 
    Button, 
    Container, 
    Row, 
    Col, 
    ListGroup, 
    ListGroupItem, 
    Table 
} from 'reactstrap';

class PSSurveyInfo extends Component{

    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){

        const {surveyResponse} = this.props;
        const {results} = this.props;
        const {loading} = this.props;

        return(
            <div /*style={{ maxWidth: '500px', margin: '20px auto'}} */>

                {loading ? (
                    <Components.Loading />
                ) : (
                <div>
                    
                    {results.map(surveyList => {
                        return(
                            <div key={surveyList._id}>
                                <h1>{surveyList.title}</h1>
                                <h3>{surveyList.description}</h3>
                            </div>
                        )
                    })}
                </div>
                )}
            </div>

        )

    }
}

const queryOptions = {
    collectionName: 'SurveyLists',
    limit: 5
}

registerComponent({
    name: 'PSSurveyInfo',
    component: PSSurveyInfo,
    hocs: [[withList, queryOptions]]
})
;

class ParticipatedSurveysInfoPage extends Component {

    GoBack() {
        window.history.back();
    }

    render() {

        const {surveyResponse} = this.props;
        const terms = {view: 'surveyResponseSurveyList', _id: surveyResponse.surveyListId}

        return(
            <div>
                <Form>
                    <FormGroup>
                        <Components.PSSurveyInfo terms={terms} surveyResponse={surveyResponse}/>
                        <h4>{surveyResponse.createdAt}</h4>
                    </FormGroup>
                </Form>
            </div>
        )
    }
}

ParticipatedSurveysInfoPage.displayName = "ParticipatedSurveysInfoPage";

ParticipatedSurveysInfoPage.propTypes = {
    currentUser: PropTypes.object,
    surveyResponse: PropTypes.object.isRequired,
    terms: PropTypes.object
};

const queryOptions2 = {
    collectionName: 'SurveyResponses'
}

registerComponent({
    name: 'ParticipatedSurveysInfoPage',
    component: ParticipatedSurveysInfoPage,
    hocs: [[withDocument, queryOptions2]]
});